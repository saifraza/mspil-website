import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Phone } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicyPage = () => {
  const t = useTranslation();

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="relative py-16 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('legalPrivacyTitle')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('legalPrivacyLastUpdated')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div {...fadeInProps} className="space-y-8">
            
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalPrivacyIntro')}
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('legalPrivacyInfoCollectionTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalPrivacyInfoCollection')}
                </p>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('legalPrivacyInfoUseTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalPrivacyInfoUse')}
                </p>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('legalPrivacyDataProtectionTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalPrivacyDataProtection')}
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-primary/5 dark:bg-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-primary" />
                  {t('legalPrivacyContactTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {t('legalPrivacyContact')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-primary" />
                    <a href="mailto:privacy@mahakaushal.com" className="text-primary hover:underline">
                      privacy@mahakaushal.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    <a href="tel:+917692267170" className="text-primary hover:underline">
                      +91 (0) 7692 267 170
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;