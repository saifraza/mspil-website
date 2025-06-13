// AI placement suggestions for the CMS
const suggestions = {
  // Image Categories
  'media-images': {
    name: 'Media Gallery',
    description: 'General media and gallery images',
    path: '/images/media/',
    icon: '🖼️',
    keywords: ['media', 'midea', 'gallery', 'photos', 'pictures']
  },
  'news-images': {
    name: 'News & Media',
    description: 'Press releases and news images',
    path: '/images/news/',
    icon: '📰',
    keywords: ['news', 'press', 'announcement', 'media release']
  },
  'timeline-images': {
    name: 'Company Timeline',
    description: 'Historical company milestone images',
    path: '/images/about-us/',
    icon: '📅',
    keywords: ['timeline', 'history', 'journey', '2005', '2010', '2016', '2018', '2020', '2023', '2024', 'inception', 'expansion', 'milestone', 'achievement']
  },
  'office-images': {
    name: 'Office Gallery',
    description: 'Office and building photos',
    path: '/images/office/',
    icon: '🏢',
    keywords: ['office', 'building', 'headquarters', 'facility', 'campus']
  },
  'infrastructure-images': {
    name: 'Infrastructure Gallery',
    description: 'Factory, plant and equipment images',
    path: '/images/infrastructure/',
    icon: '🏭',
    keywords: ['factory', 'plant', 'infrastructure', 'equipment', 'manufacturing', 'mill', 'ethanol', 'power']
  },
  'leadership-images': {
    name: 'Leadership Team',
    description: 'Photos of company leaders and management',
    path: '/images/leadership/',
    icon: '👥',
    keywords: ['leadership', 'management', 'director', 'ceo', 'team', 'executive', 'chairman', 'founder', 'saif', 'nawab', 'raza', 'md', 'managing', 'sahil', 'supply chain']
  },
  'saif-raza-image': {
    name: 'Saif Raza (Managing Director)',
    description: 'Photo of Mr. Saif Raza, Managing Director',
    path: '/images/leadership/',
    icon: '🧑‍💼',
    keywords: ['saif', 'saif raza', 'md', 'managing director', 'saif_raza']
  },
  'nawab-raza-image': {
    name: 'Nawab Raza (Chairman)',
    description: 'Photo of Mr. Nawab Raza, Founder & Chairman',
    path: '/images/leadership/',
    icon: '👨‍💼',
    keywords: ['nawab', 'nawab raza', 'chairman', 'founder', 'nawab_raza']
  },
  'sahil-raza-image': {
    name: 'Sahil Raza (Director Supply Chain)',
    description: 'Photo of Mr. Sahil Raza, Director Supply Chain',
    path: '/images/leadership/',
    icon: '👔',
    keywords: ['sahil', 'sahil raza', 'director', 'supply chain', 'sahil_raza']
  },
  'asad-raza-image': {
    name: 'Asad Raza (Director Operations)',
    description: 'Photo of Mr. Asad Raza, Director Operations',
    path: '/images/leadership/',
    icon: '⚙️',
    keywords: ['asad', 'asad raza', 'director', 'operations', 'manufacturing', 'asad_raza']
  },
  'ahmed-raza-image': {
    name: 'Ahmed Raza (Director Finance)',
    description: 'Photo of Mr. Ahmed Raza, Director Finance & Strategy',
    path: '/images/leadership/',
    icon: '💰',
    keywords: ['ahmed', 'ahmed raza', 'director', 'finance', 'strategy', 'ahmed_raza']
  },
  'fatima-raza-image': {
    name: 'Fatima Raza (Director HR)',
    description: 'Photo of Ms. Fatima Raza, Director Human Resources',
    path: '/images/leadership/',
    icon: '👩‍💼',
    keywords: ['fatima', 'fatima raza', 'director', 'hr', 'human resources', 'fatima_raza']
  },
  'career-images': {
    name: 'Career Photos',
    description: 'Career, workplace and employee images',
    path: '/images/careers/',
    icon: '💼',
    keywords: ['career', 'workplace', 'employee', 'training', 'work', 'culture', 'collaboration', 'testimonial', 'team', 'office']
  },
  'csr-education-images': {
    name: 'CSR Education',
    description: 'CSR education program images',
    path: '/images/csr/education/',
    icon: '📚',
    keywords: ['csr', 'education', 'school', 'training', 'learning', 'student']
  },
  'csr-healthcare-images': {
    name: 'CSR Healthcare',
    description: 'CSR healthcare program images',
    path: '/images/csr/healthcare/',
    icon: '🏥',
    keywords: ['csr', 'healthcare', 'health', 'medical', 'clinic', 'hospital']
  },
  'csr-rural-images': {
    name: 'CSR Rural Development',
    description: 'CSR rural development images',
    path: '/images/csr/rural-development/',
    icon: '🌾',
    keywords: ['csr', 'rural', 'development', 'village', 'farmers', 'agriculture']
  },

  // Business Section Images
  'sugar-images': {
    name: 'Sugar Business Images',
    description: 'Sugar mill and production facility images',
    path: '/images/infrastructure/',
    icon: '🍯',
    keywords: ['sugar', 'mill', 'production', 'facility', 'manufacturing', 'sugarcane']
  },
  'ethanol-images': {
    name: 'Ethanol Business Images', 
    description: 'Ethanol distillery and production images',
    path: '/images/infrastructure/',
    icon: '🥃',
    keywords: ['ethanol', 'distillery', 'alcohol', 'biofuel', 'production']
  },
  'power-images': {
    name: 'Power Business Images',
    description: 'Power plant and generation facility images', 
    path: '/images/infrastructure/',
    icon: '⚡',
    keywords: ['power', 'generator', 'electricity', 'bagasse', 'cogeneration', 'plant']
  },
  'feed-images': {
    name: 'Feed Business Images',
    description: 'Animal feed (DDGS) production images',
    path: '/images/infrastructure/', 
    icon: '🌾',
    keywords: ['feed', 'ddgs', 'animal', 'livestock', 'grain', 'nutrition']
  },

  // Document Categories
  'sugar-data': {
    name: 'Sugar Business Data',
    description: 'Sugar production data and analytics',
    path: '/documents/sugar-data/',
    icon: '🍯',
    keywords: ['sugar', 'production', 'analytics', 'excel', 'data']
  },
  'ethanol-data': {
    name: 'Ethanol Business Data',
    description: 'Ethanol production data and analytics',
    path: '/documents/ethanol-data/',
    icon: '🧪',
    keywords: ['ethanol', 'alcohol', 'distillery', 'production data']
  },
  'power-data': {
    name: 'Power Generation Data',
    description: 'Power generation data and analytics',
    path: '/documents/power-data/',
    icon: '⚡',
    keywords: ['power', 'electricity', 'generation', 'energy data']
  },
  'feed-data': {
    name: 'Feed Business Data',
    description: 'Animal feed production data',
    path: '/documents/feed-data/',
    icon: '🐄',
    keywords: ['feed', 'animal', 'livestock', 'cattle feed']
  },
  'annual-reports': {
    name: 'Annual Reports',
    description: 'Yearly financial and business reports',
    path: '/documents/investor-relations/annual-reports/',
    icon: '📊',
    keywords: ['annual', 'report', 'yearly', 'financial']
  },
  'quarterly-results': {
    name: 'Quarterly Results',
    description: 'Quarterly financial statements',
    path: '/documents/investor-relations/quarterly-results/',
    icon: '📈',
    keywords: ['quarterly', 'q1', 'q2', 'q3', 'q4', 'results']
  },
  'presentations': {
    name: 'Presentations',
    description: 'Company presentations and slides',
    path: '/documents/investor-relations/presentations/',
    icon: '📑',
    keywords: ['presentation', 'slides', 'investor', 'pitch']
  },
  'policies': {
    name: 'Company Policies',
    description: 'Corporate policies and guidelines',
    path: '/documents/investor-relations/policies/',
    icon: '📋',
    keywords: ['policy', 'governance', 'guidelines', 'code']
  },
  'csr-reports': {
    name: 'CSR Reports',
    description: 'Corporate social responsibility reports',
    path: '/documents/csr/',
    icon: '🌱',
    keywords: ['csr', 'sustainability', 'social responsibility']
  },
  'general-documents': {
    name: 'General Documents',
    description: 'Miscellaneous files and documents',
    path: '/documents/general/',
    icon: '📄',
    keywords: []
  }
};

function generateSuggestions(filename, comment) {
  const text = (filename + ' ' + comment).toLowerCase();
  const matches = [];
  
  for (const [key, config] of Object.entries(suggestions)) {
    let score = 0;
    const matchedKeywords = [];
    
    // Check keywords
    config.keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += 10;
        matchedKeywords.push(keyword);
      }
    });
    
    // File type bonus
    if (key === 'sugar-data' && (filename.includes('.xlsx') || filename.includes('.xls'))) {
      score += 20;
    }
    
    if (score > 0) {
      matches.push({
        id: key,
        title: config.name,
        description: config.description,
        path: config.path,
        icon: config.icon,
        confidence: Math.min(score * 8, 95),
        rank: matches.length + 1,
        recommended: score >= 20,
        reasoning: `Keywords found: ${matchedKeywords.join(', ')}`
      });
    }
  }
  
  // Sort by confidence
  matches.sort((a, b) => b.confidence - a.confidence);
  
  // If no matches, suggest general
  if (matches.length === 0) {
    matches.push({
      id: 'general-documents',
      title: suggestions['general-documents'].name,
      description: suggestions['general-documents'].description,
      path: suggestions['general-documents'].path,
      icon: suggestions['general-documents'].icon,
      confidence: 50,
      rank: 1,
      recommended: false,
      reasoning: 'Default fallback location'
    });
  }
  
  return matches.slice(0, 3);
}

module.exports = { generateSuggestions };