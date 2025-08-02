import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../server.js';
import { generateImage } from './imageGenerationService.js';
import { postToLinkedIn } from './linkedinService.js';
import { getLatestNews } from './newsMonitoringService-simple.js';
import { scheduleContent } from './schedulingService.js';

let anthropic;
let systemPrompt;

export async function initializeAIAgent() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    logger.error('ANTHROPIC_API_KEY is not set in environment variables');
    throw new Error('ANTHROPIC_API_KEY is required');
  }
  
  logger.info('Initializing Anthropic with API key:', apiKey.substring(0, 10) + '...');
  
  anthropic = new Anthropic({
    apiKey: apiKey
  });
  
  systemPrompt = `You are the AI Marketing Agent for Mahakaushal Sugar & Power Industries Ltd (MSPIL), a leading sugar and ethanol manufacturing company in India.

Your capabilities:
1. Create and post content to LinkedIn
2. Generate marketing images using DALL-E 3
3. Monitor and report sugar/ethanol industry news
4. Schedule posts for future publishing
5. Provide marketing insights and suggestions

Company Information:
- Sugar Capacity: 8000 TCD
- Ethanol Capacity: 350 KLPD
- Power Capacity: 35 MW (14 MW export)
- Location: Narsinghpur, Madhya Pradesh
- Focus: Sustainable sugar production, ethanol manufacturing, green energy

Communication Style:
- Professional yet approachable
- Focus on sustainability and innovation
- Highlight achievements and milestones
- Use data-driven insights
- Promote eco-friendly practices

When users ask you to post or create content, analyze their request and determine the appropriate action(s) to take.`;
}

export async function processUserMessage(message, sessionId) {
  try {
    logger.info('Processing user message:', { message, sessionId });
    
    // Check if anthropic is initialized
    if (!anthropic) {
      logger.error('Anthropic client not initialized');
      throw new Error('AI service not properly initialized');
    }
    
    // Analyze user intent
    logger.info('Analyzing intent...');
    const intentAnalysis = await analyzeIntent(message);
    logger.info('Intent analysis result:', intentAnalysis);
    
    // Process based on intent
    let response = {
      message: '',
      actions: [],
      attachments: []
    };
    
    switch (intentAnalysis.primaryIntent) {
      case 'linkedin_post':
        response = await handleLinkedInPost(message, intentAnalysis);
        break;
        
      case 'image_generation':
        response = await handleImageGeneration(message, intentAnalysis);
        break;
        
      case 'news_check':
        response = await handleNewsCheck(intentAnalysis);
        break;
        
      case 'schedule_content':
        response = await handleScheduling(message, intentAnalysis);
        break;
        
      case 'general_query':
      default:
        response = await handleGeneralQuery(message);
        break;
    }
    
    // Log interaction
    logger.info('AI Agent interaction:', {
      sessionId,
      userMessage: message,
      intent: intentAnalysis.primaryIntent,
      response: response.message.substring(0, 100) + '...'
    });
    
    return response;
    
  } catch (error) {
    logger.error('AI Agent error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      sessionId,
      userMessage: message
    });
    
    // Provide more specific error messages
    if (error.message.includes('API key')) {
      return {
        message: 'I apologize, but the AI service is not properly configured. Please ensure the Anthropic API key is set in the environment variables.',
        actions: [],
        attachments: []
      };
    }
    
    return {
      message: 'I apologize, but I encountered an error. Please try again.',
      actions: [],
      attachments: []
    };
  }
}

async function analyzeIntent(message) {
  try {
    logger.info('Calling Anthropic API for intent analysis...');
    
    const completion = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 500,
      system: `Analyze the user's message and determine their intent. Respond with a JSON object containing:
      - primaryIntent: one of ['linkedin_post', 'image_generation', 'news_check', 'schedule_content', 'general_query']
      - entities: extracted entities like content, timing, topics
      - confidence: confidence score 0-1`,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    });
    
    logger.info('Anthropic API response received');
  
    try {
      // Extract JSON from Claude's response
      const responseText = completion.content[0].text;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      // Fallback if no JSON found
      return { primaryIntent: 'general_query', entities: {}, confidence: 0.5 };
    } catch (error) {
      logger.error('Intent parsing error:', error);
      return { primaryIntent: 'general_query', entities: {}, confidence: 0.5 };
    }
  } catch (error) {
    logger.error('Anthropic API error in analyzeIntent:', {
      message: error.message,
      status: error.status,
      type: error.error?.type,
      details: error.error
    });
    
    // Return default intent if API fails
    return { primaryIntent: 'general_query', entities: {}, confidence: 0.5 };
  }
}

async function handleLinkedInPost(message, intent) {
  try {
    // Generate post content
    const postContent = await generatePostContent(message, intent);
    
    // Check if image is needed
    let imageUrl = null;
    if (intent.entities.needsImage || message.toLowerCase().includes('image') || message.toLowerCase().includes('graphic')) {
      const imagePrompt = await generateImagePrompt(postContent.topic);
      imageUrl = await generateImage(imagePrompt);
    }
    
    // Post to LinkedIn
    const postResult = await postToLinkedIn({
      content: postContent.text,
      imageUrl: imageUrl
    });
    
    return {
      message: `I\'ve successfully posted to LinkedIn! Here\'s what I shared:\n\n"${postContent.text}"\n\n${imageUrl ? 'I also included a custom generated image.' : ''}\n\nThe post is now live on your LinkedIn company page.`,
      actions: [{
        type: 'linkedin_posted',
        postId: postResult.id,
        url: postResult.url
      }],
      attachments: imageUrl ? [{ type: 'image', url: imageUrl }] : []
    };
    
  } catch (error) {
    logger.error('LinkedIn posting error:', error);
    
    let errorMessage = 'I encountered an issue posting to LinkedIn. ';
    
    if (error.message.includes('credentials not configured')) {
      errorMessage += 'LinkedIn integration is not set up yet. Please configure your LinkedIn access token and organization ID in the environment variables.';
    } else if (error.message.includes('Missing required scope')) {
      errorMessage += 'LinkedIn token only has personal posting access. To post to the company page:\n\n1. A page admin needs to verify the app at: https://www.linkedin.com/developers/apps/verification/290e08b1-b1fa-44ff-a40a-e0bf96d267cf\n2. Request Community Management API access\n3. Generate a new token with company posting permissions\n\nSee /automation-service/LINKEDIN_COMPANY_VERIFICATION.md for detailed instructions.';
    } else if (error.message.includes('rate limit')) {
      errorMessage += 'We\'ve reached the LinkedIn daily posting limit. Please try again tomorrow.';
    } else if (error.response?.status === 401) {
      errorMessage += 'LinkedIn authentication failed. Please check that your access token is valid and has the required permissions.';
    } else if (error.response?.status === 403) {
      errorMessage += 'LinkedIn permissions error. Please ensure the access token has permission to post to your company page.';
    } else {
      errorMessage += 'Please check your LinkedIn settings and try again. Error: ' + (error.message || 'Unknown error');
    }
    
    return {
      message: errorMessage,
      actions: [],
      attachments: []
    };
  }
}

async function handleImageGeneration(message, intent) {
  try {
    const imagePrompt = await refineImagePrompt(message);
    const imageUrl = await generateImage(imagePrompt);
    
    return {
      message: `I\'ve generated an image based on your request. You can use this for your marketing materials or social media posts.`,
      actions: [{
        type: 'image_generated',
        prompt: imagePrompt
      }],
      attachments: [{ type: 'image', url: imageUrl }]
    };
    
  } catch (error) {
    logger.error('Image generation error:', error);
    return {
      message: 'I had trouble generating the image. Please try with a different description.',
      actions: [],
      attachments: []
    };
  }
}

async function handleNewsCheck(intent) {
  try {
    const news = await getLatestNews(intent.entities.topics || ['sugar', 'ethanol']);
    
    if (news.length === 0) {
      return {
        message: 'No new industry updates at the moment. I\'ll keep monitoring and alert you when there are relevant news.',
        actions: [],
        attachments: []
      };
    }
    
    const newsReport = news.slice(0, 5).map((item, index) => 
      `${index + 1}. **${item.title}**\n   Source: ${item.source} | ${item.date}\n   ${item.summary}`
    ).join('\n\n');
    
    return {
      message: `Here are the latest industry news and updates:\n\n${newsReport}\n\nWould you like me to create a LinkedIn post about any of these news items?`,
      actions: [{
        type: 'news_fetched',
        count: news.length,
        sources: [...new Set(news.map(n => n.source))]
      }],
      attachments: []
    };
    
  } catch (error) {
    logger.error('News fetch error:', error);
    return {
      message: 'I couldn\'t fetch the latest news right now. Please try again later.',
      actions: [],
      attachments: []
    };
  }
}

async function handleScheduling(message, intent) {
  try {
    const scheduleDetails = await parseScheduleRequest(message, intent);
    const scheduled = await scheduleContent(scheduleDetails);
    
    return {
      message: `I\'ve scheduled your content for ${scheduled.scheduledTime}. I\'ll automatically post it at that time. You can ask me to show scheduled posts anytime.`,
      actions: [{
        type: 'content_scheduled',
        scheduleId: scheduled.id,
        scheduledTime: scheduled.scheduledTime
      }],
      attachments: []
    };
    
  } catch (error) {
    logger.error('Scheduling error:', error);
    return {
      message: 'I couldn\'t schedule the content. Please provide a clear date/time and try again.',
      actions: [],
      attachments: []
    };
  }
}

async function handleGeneralQuery(message) {
  try {
    const completion = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    });
    
    return {
      message: completion.content[0].text,
      actions: [],
      attachments: []
    };
  } catch (error) {
    logger.error('Anthropic API error in handleGeneralQuery:', error);
    
    // Check if it's an API key issue
    if (error.message && error.message.includes('API key')) {
      return {
        message: 'I\'m having trouble connecting to my AI service. Please ensure the Anthropic API key is properly configured.',
        actions: [],
        attachments: []
      };
    }
    
    return {
      message: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
      actions: [],
      attachments: []
    };
  }
}

async function generatePostContent(message, intent) {
  const completion = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 500,
    system: `Generate professional LinkedIn post content for MSPIL based on the user's request. 
    Include relevant hashtags and maintain a professional tone. Keep it under 1300 characters.
    Focus on sustainability, innovation, and achievements.`,
    messages: [
      {
        role: 'user',
        content: message
      }
    ]
  });
  
  const content = completion.content[0].text;
  const topic = intent.entities.topic || 'general update';
  
  return { text: content, topic };
}

async function generateImagePrompt(topic) {
  const completion = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 200,
    system: 'Generate a detailed DALL-E 3 prompt for a professional marketing image for a sugar and ethanol company. Make it photorealistic and professional.',
    messages: [
      {
        role: 'user',
        content: `Create an image prompt for: ${topic}`
      }
    ]
  });
  
  return completion.content[0].text;
}

async function refineImagePrompt(message) {
  const completion = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 200,
    system: 'Convert the user request into a detailed DALL-E 3 prompt. Make it specific, professional, and suitable for corporate marketing.',
    messages: [
      {
        role: 'user',
        content: message
      }
    ]
  });
  
  return completion.content[0].text;
}

async function parseScheduleRequest(message, intent) {
  const completion = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 200,
    system: 'Extract scheduling details from the message. Return JSON with: content, scheduledTime (ISO format), platform',
    messages: [
      {
        role: 'user',
        content: message
      }
    ]
  });
  
  try {
    const responseText = completion.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse schedule request');
  } catch (error) {
    logger.error('Schedule parsing error:', error);
    throw error;
  }
}