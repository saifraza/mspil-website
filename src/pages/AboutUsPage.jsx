import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useImages } from '@/contexts/ImageContext';
import { Card, CardContent } from '@/components/ui/card';
import AboutUsSection from '@/components/sections/AboutUsSection';
import { useLocation } from 'react-router-dom';

const AboutUsPage = () => {
  const t = useTranslation();
  const { getImage } = useImages();
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

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };


  // Helper function to get uploaded image or fallback to static
  const getLeadershipImage = (category, fallbackImage) => {
    // Use the ImageContext to get the image with proper URL fixing
    const imageUrl = getImage(category, fallbackImage, 0);
    console.log(`🖼️ Leadership image for ${category}:`, imageUrl);
    return imageUrl;
  };

  const leadership = [
    {
      name: t('aboutFounderName'),
      title: t('aboutFounderTitle'),
      bio: t('aboutFounderBio'),
      image: getLeadershipImage('nawab-raza-image', '/images/leadership/nawab_raza_chairman.jpg')
    },
    {
      name: t('aboutMDName'),
      title: t('aboutMDTitle'),
      bio: t('aboutMDBio'),
      image: getLeadershipImage('saif-raza-image', '/images/leadership/saif_raza_md_2025-06-08_8384.jpeg')
    },
    {
      name: t('aboutDirectorName'),
      title: t('aboutDirectorTitle'),
      bio: t('aboutDirectorBio'),
      image: getLeadershipImage('sahil-raza-image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    },
    {
      name: t('aboutDirector2Name'),
      title: t('aboutDirector2Title'),
      bio: t('aboutDirector2Bio'),
      image: getLeadershipImage('asad-raza-image', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    },
    {
      name: t('aboutDirector3Name'),
      title: t('aboutDirector3Title'),
      bio: t('aboutDirector3Bio'),
      image: getLeadershipImage('ahmed-raza-image', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    },
    {
      name: t('aboutDirector4Name'),
      title: t('aboutDirector4Title'),
      bio: t('aboutDirector4Bio'),
      image: getLeadershipImage('fatima-raza-image', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    }
  ];



  return (
    <div className="min-h-screen">
      {/* Existing About Us Section */}
      <AboutUsSection />


      {/* Leadership Profiles */}
      <section id="leadership" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('aboutLeadershipTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('aboutLeadershipSubtitle')}
            </p>
          </motion.div>

          <div className="space-y-16">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Large Image Section */}
                <div className="flex-shrink-0 w-full lg:w-1/3">
                  <div className="relative w-80 h-80 mx-auto">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full rounded-2xl object-cover border-4 border-primary/20 shadow-2xl"
                    />
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Detailed Content Section */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div>
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                      {leader.name}
                    </h3>
                    <p className="text-2xl text-primary font-semibold mb-6">
                      {leader.title}
                    </p>
                  </div>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      {leader.bio}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold text-primary mb-3">Key Responsibilities</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                              <div>• Manufacturing Operations</div>
                              <div>• Process Optimization</div>
                              <div>• Safety Management</div>
                              <div>• Production Planning</div>
                            </>
                          )}
                          {index === 4 && (
                            <>
                              <div>• Financial Planning & Analysis</div>
                              <div>• Investment Strategy</div>
                              <div>• Risk Management</div>
                              <div>• Investor Relations</div>
                            </>
                          )}
                          {index === 5 && (
                            <>
                              <div>• Talent Acquisition</div>
                              <div>• Organizational Development</div>
                              <div>• Employee Engagement</div>
                              <div>• Culture Building</div>
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