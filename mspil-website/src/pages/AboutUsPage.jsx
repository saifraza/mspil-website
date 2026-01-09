import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import LazyImage from '@/components/LazyImage';
import { Card, CardContent } from '@/components/ui/card';
import AboutUsSection from '@/components/sections/AboutUsSection';
import { useLocation } from 'react-router-dom';
import { pageBackgrounds, sectionBackgrounds, cardBackgrounds } from '@/utils/backgroundStyles';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { fastFadeInProps, fastStaggerProps } from '@/utils/scrollAnimations';

const AboutUsPage = () => {
  const t = useTranslation();
  const location = useLocation();
  const [uploadedLeadershipImages, setUploadedLeadershipImages] = useState([]);

  useEffect(() => {
    const fetchUploadedLeadershipImages = async () => {
      try {
        // Remove direct API call - ImageContext handles this now
        return; // Skip the fetch since ImageContext provides the images
        
        const response = await fetch(`${API_URL}/content`);
        const allContent = await response.json();
        
        // Filter for leadership images
        const leadershipFiles = allContent.filter(item => 
          item.category === 'leadership-images' || 
          item.category === 'nawab-raza-image' || 
          item.category === 'saif-raza-image' ||
          item.category === 'sahil-raza-image' ||
          item.category === 'asad-raza-image' ||
          item.category === 'ahmed-raza-image' ||
          item.category === 'fatima-raza-image'
        );
        
        setUploadedLeadershipImages(leadershipFiles);
        console.log('🖼️ Fetched leadership images:', leadershipFiles);
      } catch (error) {
        console.log('Could not fetch leadership images:', error);
      }
    };

    fetchUploadedLeadershipImages();
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const elementId = hash.substring(1); // Remove the # symbol
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        }
      }, 100);
    }
  }, [location.hash]);



  // Get images from CMS context
  

  // Using static images for leadership team

  // Map leaders to their CMS image categories
  const leaderImageCategories = [
    'nawab-raza-image',  // Founder & Chairman
    'saif-raza-image',   // MD
    'sahil-raza-image',  // Director Supply Chain
    'asad-raza-image',   // Director Operations
    'ahmed-raza-image',  // Director Finance
    'fatima-raza-image', // Director HR
    'leadership-images'  // Generic board member
  ];

  // Use static images for now (CMS has issues)
  const leadership = [
   {
      name: t('aboutFounderName'),
      title: t('aboutFounderTitle'),
      bio: t('aboutFounderBio'),
      image: '/images/leadership/nawab_raza.png'
    },
    {
      name: t('aboutMDName'),
      title: t('aboutMDTitle'),
      bio: t('aboutMDBio'),
      image: '/images/leadership/saifraza.jpeg' // Fallback until Saif image is added
    },
    {
      name: t('aboutDirectorName'),
      title: t('aboutDirectorTitle'),
      bio: t('aboutDirectorBio'),
      image: '/images/leadership/sahilraza.jpeg' // Fallback until Sahil image is added
    },
     {
      name: t('aboutDirector4Name'),
      title: t('aboutDirector4Title'),
      bio: t('aboutDirector4Bio'),
      image: '/images/leadership/asmatraza.png' // Fallback until Sahil image is added
    },
 
  
    {
      name: t('aboutBoard3Name'),
      title: t('aboutBoard3Title'),
      bio: t('aboutBoard3Bio'),
      image: '/images/leadership/rajandubey.jpeg' // Fallback until Rajan image is added
    },
     
    {
      name: t('aboutBoard4Name'),
      title: t('aboutBoard4Title'),
      bio: t('aboutBoard4Bio'),
      image: '/images/leadership/manishsir.jpeg' // Fallback until Chandrakant image is added
    },
       {
      name: t('aboutBoard1Name'),
      title: t('aboutBoard1Title'),
      bio: t('aboutBoard1Bio'),
      image: '/images/leadership/sakshiji.jpeg' // Fallback until Ranganathan image is added
    },
     {
      name: t('aboutBoard2Name'),
      title: t('aboutBoard2Title'),
      bio: t('aboutBoard2Bio'),
      image: '/images/leadership/devrajji.jpeg' // Fallback until Mohan image is added
    },
       {
      name: t('aboutBoard5Name'),
      title: t('aboutBoard5Title'),
      bio: t('aboutBoard5Bio'),
      image: '/images/leadership/dilshadji.jpeg' // Fallback until Chandrakant image is added
    },
  ];



  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      {/* Existing About Us Section */}
      <AboutUsSection />


      {/* Leadership Profiles */}
      <section id="leadership" className="section-padding-compact bg-white/10 dark:bg-gray-800/10 backdrop-blur-md relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fastFadeInProps} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('aboutLeadershipTitle')}
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              {t('aboutLeadershipSubtitle')}
            </p>
          </motion.div>

          <div className="space-y-16">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                {...fastStaggerProps(index * 2)}
                className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Large Image Section */}
                <div className="flex-shrink-0 w-full lg:w-1/2">
                  <div className="relative w-96 h-96 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl blur-xl"></div>
                    <LazyImage
                      src={leader.image}
                      alt={leader.name}
                      className="relative z-10 w-full h-full rounded-2xl object-cover border-2 border-white/30 shadow-2xl"
                      fallbackSrc="/images/leadership/nawab_raza_chairman.jpg"
                    />
                    <div className="absolute bottom-6 right-6 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Detailed Content Section */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                      {leader.name}
                    </h3>
                    <p className="text-2xl text-primary font-semibold mb-6">
                      {leader.title}
                    </p>
                  </div>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-foreground/80">
                      {leader.bio}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:bg-white/70 dark:hover:bg-gray-800/70 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold text-primary mb-3">Key Responsibilities</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground/70">
                       {index === 0 && (
                            <>
                              <div>• Strategic Leadership & Vision</div>
                              <div>• Board Governance</div>
                              <div>• Stakeholder Relations</div>
                              <div>• Corporate Social Responsibility</div>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <div>• Overall Business Management</div>
                              <div>• Technology Innovation</div>
                              <div>• Expansion Planning</div>
                              <div>• Quality Assurance</div>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <div>• Supply Chain Optimization</div>
                              <div>• Vendor Management</div>
                              <div>• Logistics Coordination</div>
                              <div>• Cost Management</div>
                            </>
                          )}
                          {index === 3 && (
                            <>
                              <div>• Strategic Advisory</div>
                              <div>• Social Development Oversight</div>
                              <div>• Agro-Research Coordination</div>
                              <div>• Sustainability Integration</div>
                            </>
                          )}
                          {index === 4 && (
                            <>
                              <div>• Program Leadership and Execution</div>
                              <div>• Strategic Advisory in Public Health</div>
                              <div>• Innovation and Product Commercialization</div>
                              <div>• Global Collaboration</div>
                            </>
                          )}
                          
                             {index === 5 && (
                            <>
                              <div>• Finance Function Leadership</div>
                              <div>• Business Growth Advisory</div>
                              <div>• Regulatory Compliance Management</div>
                              <div>• Strategic Financial Planning</div>
                            </>
                          )}
                             {index === 6 && (
                            <>
                              <div>• Talent Acquisition</div>
                              <div>• Stakeholder Transparency Enhancement</div>
                              <div>• Listing and IPO Readiness</div>
                              <div>• Regulatory Compliance Management</div>
                            </>
                          )}
                          {index === 7 && (
                            <>
                              <div>• Organizational Management</div>
                              <div>• Strategic Foresight and Planning</div>
                              <div>• Governance and Compliance</div>
                              <div>• Cross-Functional Integration</div>
                            </>
                          )}
                             {index === 8 && (
                            <>
                              <div>• Talent Acquisition</div>
                              <div>• Financial Reporting and Audit Oversight</div>
                              <div>• Tax and Legal Compliance</div>
                              <div>• Regulatory Liaisoning</div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
