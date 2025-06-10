import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfServicePage = () => {
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
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('legalTermsTitle')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('legalTermsLastUpdated')}
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
                  {t('legalTermsIntro')}
                </p>
              </CardContent>
            </Card>

            {/* Website Use */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('legalTermsUseTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalTermsUse')}
                </p>
              </CardContent>
            </Card>

            {/* Content and Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('legalTermsContentTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalTermsContent')}
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('legalTermsLiabilityTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalTermsLiability')}
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="bg-primary/5 dark:bg-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-primary" />
                  {t('legalTermsGoverningLawTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalTermsGoverningLaw')}
                </p>
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;