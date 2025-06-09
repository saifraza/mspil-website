import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, FileCheck, Scale } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InvestorDisclaimerPage = () => {
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
      <section className="relative py-16 bg-orange-50 dark:bg-orange-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center">
            <div className="inline-flex p-4 rounded-full bg-orange-100 dark:bg-orange-900/50 mb-6">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('legalInvestorDisclaimerTitle')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('legalInvestorDisclaimerLastUpdated')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div {...fadeInProps}>
            <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
                      Important Investment Notice
                    </h3>
                    <p className="text-orange-700 dark:text-orange-300">
                      {t('legalInvestorDisclaimerIntro')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div {...fadeInProps} className="space-y-8">
            
            {/* Investment Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <TrendingDown className="w-6 h-6 mr-3 text-red-600" />
                  {t('legalInvestorRiskTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalInvestorRisk')}
                </p>
              </CardContent>
            </Card>

            {/* Forward-Looking Statements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <TrendingDown className="w-6 h-6 mr-3 text-amber-600" />
                  {t('legalInvestorForwardLookingTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalInvestorForwardLooking')}
                </p>
              </CardContent>
            </Card>

            {/* Not Investment Advice */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <FileCheck className="w-6 h-6 mr-3 text-blue-600" />
                  {t('legalInvestorNoAdviceTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalInvestorNoAdvice')}
                </p>
              </CardContent>
            </Card>

            {/* Regulatory Compliance */}
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-green-600" />
                  {t('legalInvestorComplianceTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('legalInvestorCompliance')}
                </p>
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InvestorDisclaimerPage;