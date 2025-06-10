
/**
 * Get public URL for a local file
 * @param {string} path - The file path or filename
 * @param {string} _bucket - Unused parameter (kept for compatibility)
 * @returns {string} - The public URL for the file
 */
export const getSupabaseImageUrl = (path, _bucket = 'website-images') => {
  if (!path) return 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=MSPIL';
  
  // Return local file path
  return `/images/${path}`;
};

/**
 * Get image URL from CMS by searching the media_files table
 * This allows you to find images by folder and filename patterns
 * @param {string} folder - The upload folder (e.g., 'leadership', 'infrastructure')
 * @param {string} searchTerm - Search term for filename (optional)
 * @returns {Promise<string>} - The public URL for the file
 */
export const getCMSImageUrl = async (folder, _searchTerm = '') => {
  return 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=MSPIL';
  /*
  try {
    let query = supabase
      .from('media_files')
      .select('file_path, bucket_name')
      .eq('upload_folder', folder)
      .eq('file_type', 'image')
      .eq('is_public', true);
    
    if (searchTerm) {
      query = query.or(`filename.ilike.%${searchTerm}%,original_filename.ilike.%${searchTerm}%`);
    }
    
    const { data, error } = await query.limit(1).single();
    
    if (error || !data) {
      return 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=MSPIL';
    }
    
    return getSupabaseImageUrl(data.file_path, data.bucket_name);
  } catch (error) {
    console.warn('Error fetching CMS image:', error);
    return 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=MSPIL';
  }
  */
};

// Backward compatibility function
export const getImageUrl = (path, source = 'supabase') => {
  if (source === 'supabase') {
    return getSupabaseImageUrl(path);
  }
  return 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=MSPIL';
};

/**
 * Get multiple image URLs at once
 * @param {Array<{path: string, bucket?: string}>} images - Array of image configs
 * @returns {Object} - Object with paths as keys and URLs as values
 */
export const getSupabaseImageUrls = (images) => {
  const urls = {};
  images.forEach(({ path, bucket = 'website-images' }) => {
    urls[path] = getSupabaseImageUrl(path, bucket);
  });
  return urls;
};

// Predefined image paths for the website
export const SUPABASE_IMAGES = {
  // Hero Section
  hero: {
    backgroundVideo: 'hero/hero_background_video.mp4',
    videoPoster: 'hero/hero_video_thumbnail.jpg',
    plantOperation: 'hero/plant_operation.jpg'
  },
  
  // Leadership
  leadership: {
    founder: 'leadership/founder_rajesh_kumar.jpg',
    md: 'leadership/md_priya_sharma.jpg',
    director: 'leadership/director_vijay_singh.jpg'
  },
  
  // Infrastructure
  infrastructure: {
    sugarMill: 'infrastructure/sugar_mill_exterior.jpg',
    sugarMillInterior: 'infrastructure/sugar_mill_interior.jpg',
    ethanolPlant: 'infrastructure/ethanol_plant_exterior.jpg',
    ethanolPlantInterior: 'infrastructure/ethanol_plant_interior.jpg',
    powerPlant: 'infrastructure/power_plant_exterior.jpg',
    powerPlantInterior: 'infrastructure/power_plant_interior.jpg',
    ethanolStorageTanks: 'infrastructure/ethanol_storage_tanks.jpg',
    qualityControlLab: 'infrastructure/quality_control_lab.jpg'
  },
  
  // CSR Activities
  csr: {
    education: {
      schoolInfrastructure: 'csr/education/school_infrastructure.jpg',
      studentsClassroom: 'csr/education/students_classroom.jpg',
      digitalLiteracy: 'csr/education/digital_literacy.jpg',
      skillTrainingCenter: 'csr/education/skill_training_center.jpg'
    },
    healthcare: {
      mobileHealthClinic: 'csr/healthcare/mobile_health_clinic.jpg',
      healthCamp: 'csr/healthcare/health_camp.jpg',
      medicalCheckup: 'csr/healthcare/medical_checkup.jpg'
    },
    ruralDevelopment: {
      waterConservation: 'csr/rural_development/water_conservation.jpg',
      farmersTraining: 'csr/rural_development/farmers_training.jpg',
      watershedManagement: 'csr/rural_development/watershed_management.jpg'
    }
  },
  
  // News & Media
  news: {
    plantOperationsOverview: 'news/plant_operations_overview.jpg',
    sugarcaneHarvest: 'news/sugarcane_harvest.jpg',
    communityEngagement: 'news/community_engagement.jpg',
    solarPanelInstallation: 'news/solar_panel_installation.jpg'
  },
  
  // About Us
  about: {
    companyOverview: 'about/company_overview.jpg',
    missionVision: 'about/mission_vision.jpg',
    factoryOverview: 'about/factory_overview.jpg',
    sustainabilityInitiatives: 'about/sustainability_initiatives.jpg'
  }
};

// Document paths
export const SUPABASE_DOCUMENTS = {
  // Investor Relations
  annualReports: {
    '2023-24': 'documents/investor-relations/annual-reports/Annual_Report_2023-24.pdf',
    '2022-23': 'documents/investor-relations/annual-reports/Annual_Report_2022-23.pdf',
    '2021-22': 'documents/investor-relations/annual-reports/Annual_Report_2021-22.pdf'
  },
  
  quarterlyResults: {
    'Q3_FY24': 'documents/investor-relations/quarterly-results/Q3_FY24_Results.pdf',
    'Q2_FY24': 'documents/investor-relations/quarterly-results/Q2_FY24_Results.pdf',
    'Q1_FY24': 'documents/investor-relations/quarterly-results/Q1_FY24_Results.pdf'
  },
  
  presentations: {
    earningsCall: 'documents/investor-relations/presentations/Q3_FY24_Earnings_Call_Presentation.pdf',
    agm: 'documents/investor-relations/presentations/Annual_General_Meeting_Presentation.pdf'
  },
  
  shareholding: {
    latest: 'documents/investor-relations/shareholding/Shareholding_Pattern_Q3_FY24.pdf'
  },
  
  policies: {
    codeOfConduct: 'documents/investor-relations/policies/Code_of_Conduct.pdf',
    whistleblower: 'documents/investor-relations/policies/Whistleblower_Policy.pdf',
    relatedParty: 'documents/investor-relations/policies/Related_Party_Transaction_Policy.pdf',
    insiderTrading: 'documents/investor-relations/policies/Insider_Trading_Policy.pdf',
    dividend: 'documents/investor-relations/policies/Dividend_Distribution_Policy.pdf',
    csr: 'documents/investor-relations/policies/Corporate_Social_Responsibility_Policy.pdf'
  },
  
  // CSR Reports
  csrReports: {
    '2023-24': 'documents/csr/CSR_Report_2023-24.pdf',
    '2022-23': 'documents/csr/CSR_Report_2022-23.pdf',
    '2021-22': 'documents/csr/CSR_Report_2021-22.pdf'
  }
};

/**
 * Download a document from local storage
 * @param {string} path - The document path
 * @param {string} filename - The filename for download
 * @param {string} _bucket - Unused parameter (kept for compatibility)
 */
export const downloadSupabaseDocument = async (path, filename, _bucket = 'website-documents') => {
  try {
    // Create download link for local files
    const link = document.createElement('a');
    link.href = `/documents/${path}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading document:', error);
    alert('Failed to download document. Please try again.');
  }
};