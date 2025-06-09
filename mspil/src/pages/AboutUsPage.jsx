import React from 'react';
import { motion } from 'framer-motion';
import { 
  User
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import AboutUsSection from '@/components/sections/AboutUsSection';
// Removed AutoPublishedContent - using static content now

const AboutUsPage = () => {
  const t = useTranslation();

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };


  const leadership = [
    {
      name: t('aboutFounderName'),
      title: t('aboutFounderTitle'),
      bio: t('aboutFounderBio'),
      image: '/images/leadership/nawab_raza_chairman.jpg'
    },
    {
      name: t('aboutMDName'),
      title: t('aboutMDTitle'),
      bio: t('aboutMDBio'),
      image: '/images/leadership/saif_raza_md_2025-06-08_8384.jpeg'
    },
    {
      name: t('aboutDirectorName'),
      title: t('aboutDirectorTitle'),
      bio: t('aboutDirectorBio'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Existing About Us Section */}
      <AboutUsSection />


      {/* Leadership Profiles */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('aboutLeadershipTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('aboutLeadershipSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.2 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full rounded-full object-cover border-4 border-primary/20"
                      />
                      <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-primary font-semibold mb-4">
                      {leader.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {leader.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;