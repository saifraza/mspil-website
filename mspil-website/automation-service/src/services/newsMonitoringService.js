import cron from 'node-cron';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { logger } from '../server.js';
import { saveNewsItem, getLatestNewsFromDB } from '../utils/database.js';

let browser;
let monitoringJob;

const NEWS_SOURCES = [
  {
    name: 'ChiniMandi',
    url: 'https://www.chinimandi.com/',
    selectors: {
      articles: '.news-item, .article-card, .post-item',
      title: 'h2, h3, .title',
      link: 'a',
      date: '.date, .time, .post-date',
      summary: '.excerpt, .summary, p'
    },
    categories: ['sugar', 'ethanol', 'molasses']
  },
  {
    name: 'Indian Sugar Mills Association',
    url: 'https://www.indiansugar.com/NewsDetails.aspx',
    selectors: {
      articles: '.news-list-item',
      title: '.news-title',
      link: 'a',
      date: '.news-date',
      summary: '.news-summary'
    },
    categories: ['sugar', 'industry']
  }
];

export async function startNewsMonitoring() {
  // Initialize browser
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // Run immediately on start
  await checkAllNewsSources();
  
  // Schedule regular checks
  const interval = process.env.NEWS_CHECK_INTERVAL || '0 0 */6 * * *';
  monitoringJob = cron.schedule(interval, async () => {
    logger.info('Running scheduled news check');
    await checkAllNewsSources();
  });
  
  logger.info('News monitoring service started');
}

export async function stopNewsMonitoring() {
  if (monitoringJob) {
    monitoringJob.stop();
  }
  if (browser) {
    await browser.close();
  }
  logger.info('News monitoring service stopped');
}

async function checkAllNewsSources() {
  const allNews = [];
  
  for (const source of NEWS_SOURCES) {
    try {
      const news = await scrapeNewsSource(source);
      allNews.push(...news);
      logger.info(`Scraped ${news.length} articles from ${source.name}`);
    } catch (error) {
      logger.error(`Error scraping ${source.name}:`, error);
    }
  }
  
  // Save new articles to database
  const saved = await saveNewArticles(allNews);
  logger.info(`Saved ${saved} new articles to database`);
  
  return allNews;
}

async function scrapeNewsSource(source) {
  const page = await browser.newPage();
  const articles = [];
  
  try {
    await page.goto(source.url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for content to load
    await page.waitForSelector(source.selectors.articles, { timeout: 10000 });
    
    // Get page content
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // Extract articles
    $(source.selectors.articles).each((index, element) => {
      if (index >= 10) return; // Limit to 10 articles per source
      
      const $article = $(element);
      const title = $article.find(source.selectors.title).text().trim();
      const link = $article.find(source.selectors.link).attr('href');
      const date = $article.find(source.selectors.date).text().trim();
      const summary = $article.find(source.selectors.summary).text().trim();
      
      if (title && link) {
        // Check if article is relevant to our keywords
        const relevantKeywords = ['sugar', 'ethanol', 'molasses', 'distillery', 'cane', 'alcohol'];
        const isRelevant = relevantKeywords.some(keyword => 
          title.toLowerCase().includes(keyword) || 
          summary.toLowerCase().includes(keyword)
        );
        
        if (isRelevant) {
          articles.push({
            title,
            url: link.startsWith('http') ? link : new URL(link, source.url).href,
            date: parseDate(date),
            summary: summary.substring(0, 500),
            source: source.name,
            categories: extractCategories(title + ' ' + summary, source.categories)
          });
        }
      }
    });
    
  } catch (error) {
    logger.error(`Error scraping ${source.name}:`, error);
  } finally {
    await page.close();
  }
  
  return articles;
}

async function scrapeChiniMandi() {
  const page = await browser.newPage();
  const articles = [];
  
  try {
    await page.goto('https://www.chinimandi.com/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // ChiniMandi specific scraping logic
    await page.evaluate(() => {
      // Scroll to load more content
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    await page.waitForTimeout(2000);
    
    const newsItems = await page.evaluate(() => {
      const items = [];
      
      // Try multiple possible selectors for ChiniMandi
      const selectors = [
        '.news-container .news-item',
        '.latest-news article',
        '.news-list li',
        '[class*="news"] article'
      ];
      
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          elements.forEach(el => {
            const title = el.querySelector('h2, h3, .title, a')?.textContent?.trim();
            const link = el.querySelector('a')?.href;
            const date = el.querySelector('.date, time, .post-date')?.textContent?.trim();
            const summary = el.querySelector('p, .excerpt, .summary')?.textContent?.trim();
            
            if (title && link) {
              items.push({ title, link, date, summary });
            }
          });
          break;
        }
      }
      
      return items;
    });
    
    // Process extracted items
    newsItems.forEach(item => {
      const relevantKeywords = ['sugar', 'ethanol', 'molasses', 'distillery'];
      const isRelevant = relevantKeywords.some(keyword => 
        item.title.toLowerCase().includes(keyword) || 
        (item.summary && item.summary.toLowerCase().includes(keyword))
      );
      
      if (isRelevant) {
        articles.push({
          title: item.title,
          url: item.link,
          date: parseDate(item.date || 'Today'),
          summary: item.summary?.substring(0, 500) || 'Click to read more...',
          source: 'ChiniMandi',
          categories: extractCategories(item.title + ' ' + (item.summary || ''), ['sugar', 'ethanol', 'market'])
        });
      }
    });
    
  } catch (error) {
    logger.error('Error scraping ChiniMandi:', error);
  } finally {
    await page.close();
  }
  
  return articles;
}

function parseDate(dateStr) {
  if (!dateStr) return new Date();
  
  // Handle relative dates
  if (dateStr.toLowerCase().includes('today')) {
    return new Date();
  } else if (dateStr.toLowerCase().includes('yesterday')) {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }
  
  // Try to parse the date
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

function extractCategories(text, availableCategories) {
  const categories = [];
  const lowerText = text.toLowerCase();
  
  availableCategories.forEach(cat => {
    if (lowerText.includes(cat)) {
      categories.push(cat);
    }
  });
  
  return categories.length > 0 ? categories : ['general'];
}

async function saveNewArticles(articles) {
  let savedCount = 0;
  
  for (const article of articles) {
    try {
      const exists = await checkArticleExists(article.url);
      if (!exists) {
        await saveNewsItem(article);
        savedCount++;
      }
    } catch (error) {
      logger.error('Error saving article:', error);
    }
  }
  
  return savedCount;
}

async function checkArticleExists(url) {
  // TODO: Implement database check
  return false;
}

export async function getLatestNews(topics = [], limit = 10) {
  try {
    // First check database for recent news
    const dbNews = await getLatestNewsFromDB(topics, limit);
    
    if (dbNews.length < limit) {
      // If not enough news in DB, trigger a fresh scrape
      logger.info('Insufficient news in database, triggering fresh scrape');
      const freshNews = await checkAllNewsSources();
      
      // Filter by topics if provided
      if (topics.length > 0) {
        return freshNews.filter(article => 
          topics.some(topic => 
            article.categories.includes(topic) ||
            article.title.toLowerCase().includes(topic) ||
            article.summary.toLowerCase().includes(topic)
          )
        ).slice(0, limit);
      }
      
      return freshNews.slice(0, limit);
    }
    
    return dbNews;
  } catch (error) {
    logger.error('Error getting latest news:', error);
    return [];
  }
}