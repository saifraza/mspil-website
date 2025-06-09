import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Recycle, BarChart3, CheckCircle, Droplets, Wind, Sun } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
// Removed AutoPublishedContent - using static content now
import { useTranslation } from '@/contexts/LanguageContext';

// Animated leaf component
const AnimatedLeaf = ({ delay = 0, duration = 10 }) => {
  const randomX = Math.random() * 100;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ 
        x: `${randomX}vw`, 
        y: -20,
        rotate: 0,
        opacity: 0.7
      }}
      animate={{
        y: '110vh',
        x: [`${randomX}vw`, `${randomX + (Math.random() - 0.5) * 30}vw`],
        rotate: [0, 360, 720],
        opacity: [0.7, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <Leaf className="w-6 h-6 text-green-500/50" />
    </motion.div>
  );
};

// Animated progress circle - commented out as it's not used
/*
const ProgressCircle = ({ percentage, label, icon }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div 
      className="relative"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <svg className="w-40 h-40 transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          className="text-primary"
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          {icon}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-2"
        >
          <p className="text-2xl font-bold text-primary">{percentage}%</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
*/

const SustainabilitySection = () => {
  const t = useTranslation();

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const features = [
    { 
      id: 'zero-waste',
      titleKey: 'sustainabilityZeroWasteTitle',
      descriptionKey: 'sustainabilityZeroWasteDesc',
      icon: <Recycle className="w-10 h-10 text-primary" />,
      color: 'from-green-500/20 to-emerald-500/20',
      stats: { value: 98, label: 'Waste Recycled' }
    },
    { 
      id: 'renewable',
      titleKey: 'sustainabilityRenewableTitle',
      descriptionKey: 'sustainabilityRenewableDesc',
      icon: <Sun className="w-10 h-10 text-primary" />,
      color: 'from-yellow-500/20 to-orange-500/20',
      stats: { value: 100, label: 'Renewable Energy' }
    },
    { 
      id: 'esg',
      titleKey: 'sustainabilityESGTitle',
      descriptionKey: 'sustainabilityESGDesc',
      icon: <CheckCircle className="w-10 h-10 text-primary" />,
      color: 'from-blue-500/20 to-indigo-500/20',
      stats: { value: 85, label: 'ESG Score' }
    }
  ];

  const impactMetrics = [
    { value: 75000, suffix: 'MT', labelKey: 'CO₂ Emissions Reduced', icon: <Wind className="w-6 h-6" /> },
    { value: 45, suffix: '%', labelKey: 'Water Recycled', icon: <Droplets className="w-6 h-6" /> },
    { value: 98, suffix: '%', labelKey: 'Waste Recycled', icon: <Recycle className="w-6 h-6" /> },
    { value: 100, suffix: '%', labelKey: 'Renewable Power', icon: <Sun className="w-6 h-6" /> }
  ];

  return (
    <section id="sustainability" className="py-16 relative overflow-hidden">
      {/* Animated background leaves */}
      {[...Array(5)].map((_, i) => (
        <AnimatedLeaf key={i} delay={i * 2} duration={15 + i * 2} />
      ))}
      
      <div className="container mx-auto px-4">
        <motion.div {...fadeInProps} className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('sustainabilitySectionTitle')}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('sustainabilitySectionSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              {...fadeInProps}
              transition={{ delay: index * 0.2 }}
              className={`relative group`}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <div className={`h-full rounded-2xl p-6 bg-gradient-to-br ${feature.color} border border-primary/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}>
                <motion.div
                  className="mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground">{t(feature.descriptionKey)}</p>
                <div className="mt-4 flex items-center">
                  <span className="text-3xl font-bold text-primary mr-2">
                    <AnimatedCounter to={feature.stats.value} />%
                  </span>
                  <span className="text-sm text-muted-foreground">{feature.stats.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.5 }}>
          <Card className="shadow-2xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/50 dark:to-teal-900/50 border-primary/30 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
            <CardHeader className="text-center relative z-10">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-block"
              >
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-3" />
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl">
                {t('sustainabilityDashboardTitle') || 'Interactive Sustainability Dashboard'}
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                {t('sustainabilityDashboardSubtitle') || 'Visualizing our environmental impact and progress.'}
              </p>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {impactMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.labelKey}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-primary/20"
                  >
                    <motion.div 
                      className="flex justify-center mb-2 text-primary"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {metric.icon}
                    </motion.div>
                    <p className="text-2xl font-bold text-primary">
                      <AnimatedCounter to={metric.value} suffix={metric.suffix} />
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t(metric.labelKey) || metric.labelKey}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* Animated progress bars */}
              <motion.div 
                className="mt-8 space-y-4 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('sustainabilityProgressLabel1') || 'Carbon Neutrality Progress'}</span>
                    <span className="text-primary font-semibold">75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 1.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CSR Reports & Sustainability Documents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            CSR Reports & Sustainability Documents
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access our latest CSR reports, sustainability initiatives, and environmental impact assessments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* CSR reports would be displayed here */}
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            CSR reports will be displayed here
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilitySection;