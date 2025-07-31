import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChartLazy, BarChartLazy } from '@/components/LazyChart';
import { TrendingUp, BarChartBig, Leaf, Loader2, Droplets, Zap, Wheat, Factory } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

const DataInsightsSection = () => {
  const t = useTranslation();
  const [turnoverDataDb, setTurnoverDataDb] = useState([
    { year: '2024-25', turnover: 305.00, note: 'Sugar only' },
    { year: '2025-26', turnover: 811.08, note: 'Ethanol plant operational' },
    { year: '2026-27', turnover: 1310.56, note: 'Full ethanol capacity' },
    { year: '2027-28', turnover: 1378.40, note: 'Steady growth' },
    { year: '2028-29', turnover: 1462.27, note: 'Market expansion' },
    { year: '2029-30', turnover: 1564.91, note: 'Peak performance' }
  ]);
  const [productionDataDb, setProductionDataDb] = useState([
    { year: '2024-25', crushing: 5.5 },
    { year: '2025-26', crushing: 8.5 },
    { year: '2026-27', crushing: 9.6 },
    { year: '2027-28', crushing: 10.8 },
    { year: '2028-29', crushing: 12.0 },
    { year: '2029-30', crushing: 13.2 }
  ]);
  
  const [ethanolProductionData] = useState([
    { year: '2024-25', production: 0, note: 'Plant under construction' },
    { year: '2025-26', production: 5.0, note: 'Initial ramp-up (50% capacity)' },
    { year: '2026-27', production: 8.5, note: 'Reaching 85% capacity' },
    { year: '2027-28', production: 10.0, note: 'Full capacity - 350 KLPD' },
    { year: '2028-29', production: 10.5, note: 'Optimization phase' },
    { year: '2029-30', production: 11.0, note: 'Peak efficiency' }
  ]);
  
  const [sugarProductionData] = useState([
    { year: '2024-25', production: 5.5, note: 'Current capacity' },
    { year: '2025-26', production: 8.5, note: 'Expanded operations' },
    { year: '2026-27', production: 9.0, note: 'Efficiency improvements' },
    { year: '2027-28', production: 9.5, note: 'Optimized processing' },
    { year: '2028-29', production: 10.0, note: 'Peak capacity utilization' },
    { year: '2029-30', production: 10.5, note: 'Maximum efficiency' }
  ]);
  const [loadingCharts, setLoadingCharts] = useState(false);

  const initialOtherMetrics = useMemo(() => [
    { titleKey: 'insightsMetricEthanolTitle', descKey: 'insightsMetricEthanolDesc', statisticText: '10 Crore Liters', icon: Droplets, altKey: 'insightsEthanolIconAlt' },
    { titleKey: 'insightsMetricPowerTitle', descKey: 'insightsMetricPowerDesc', statisticText: '14 MW', icon: Zap, altKey: 'insightsPowerIconAlt' },
    { titleKey: 'insightsMetricDDGSTitle', descKey: 'insightsMetricDDGSDesc', statisticText: '60,000 Tons', icon: Wheat, altKey: 'insightsDDGSIconAlt' },
  ], []);

  // Data is now static, no need for useEffect to fetch from database

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };
  
  const chartCardClass = "shadow-lg hover:shadow-xl transition-all duration-300 border-bio-green-200 dark:border-bio-green-800 bg-white dark:bg-gray-800 hover:border-bio-green-300 dark:hover:border-bio-green-700";
  const chartHeaderClass = "items-center text-center pb-2";
  const chartTitleClass = "mt-2 text-2xl font-semibold bg-gradient-to-r from-bio-green-700 to-eco-lime-700 dark:from-bio-green-400 dark:to-eco-lime-400 bg-clip-text text-transparent";
  const chartDescClass = "text-sm text-foreground/70 mb-4 min-h-[40px]";
  const chartContainerHeight = 300;

  const renderChartPlaceholder = () => (
    <div style={{ width: '100%', height: chartContainerHeight }} className="flex items-center justify-center bg-muted/50 rounded-md">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );

  return (
    <section id="insights" className="section-padding bg-gradient-to-b from-white via-bio-green-50 to-eco-lime-50 dark:from-bio-green-900 dark:via-bio-green-800 dark:to-bio-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInProps} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-bio-green-700 to-eco-lime-700 dark:from-bio-green-400 dark:to-eco-lime-400 bg-clip-text text-transparent mb-4">{t('insightsTitle')}</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {t('insightsSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-bio-green-100 to-eco-lime-100 dark:from-bio-green-800 dark:to-bio-green-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-bio-green-600 dark:text-bio-green-400" />
                </div>
                <CardTitle className={chartTitleClass}>{t('insightsTurnoverChartTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  {t('insightsTurnoverChartDesc')}
                </CardDescription>
                <div className="mb-4 p-4 bg-bio-green-100 dark:bg-bio-green-900/30 rounded-lg border border-bio-green-200 dark:border-bio-green-800">
                  <p className="text-sm font-medium text-bio-green-800 dark:text-bio-green-200 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Major growth from 2025-26 due to ethanol plant (350 KLPD) becoming operational
                  </p>
                </div>
                <LineChartLazy 
                  data={turnoverDataDb} 
                  dataKey="turnover" 
                  stroke="#059669" 
                  name={t('insightsTurnoverLegend') || "Turnover (Cr)"} 
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.3 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-bio-green-100 to-eco-lime-100 dark:from-bio-green-800 dark:to-bio-green-900 rounded-full flex items-center justify-center">
                  <BarChartBig className="w-8 h-8 text-bio-green-600 dark:text-bio-green-400" />
                </div>
                <CardTitle className={chartTitleClass}>{t('insightsProductionChartTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  {t('insightsProductionChartDesc')}
                </CardDescription>
                <BarChartLazy 
                  data={productionDataDb} 
                  dataKey="crushing" 
                  fill="#10b981" 
                  name={t('insightsProductionLegend') || "Crushing (Lakh Tons)"} 
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Ethanol and Sugar Production Charts */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-bio-green-100 to-eco-lime-100 dark:from-bio-green-800 dark:to-bio-green-900 rounded-full flex items-center justify-center">
                  <Droplets className="w-8 h-8 text-bio-green-600 dark:text-bio-green-400" />
                </div>
                <CardTitle className={chartTitleClass}>Ethanol Production Ramp-up</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  Annual ethanol production growth from 0 to 11 Crore Liters
                </CardDescription>
                <div className="mb-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    ⚡ Plant commissioning in 2025-26, reaching full capacity by 2027-28
                  </p>
                </div>
                <LineChartLazy 
                  data={ethanolProductionData} 
                  dataKey="production" 
                  stroke="#10b981" 
                  name="Ethanol Production (Cr Liters)" 
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.5 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-bio-green-100 to-eco-lime-100 dark:from-bio-green-800 dark:to-bio-green-900 rounded-full flex items-center justify-center">
                  <Factory className="w-8 h-8 text-bio-green-600 dark:text-bio-green-400" />
                </div>
                <CardTitle className={chartTitleClass}>Sugar Production Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  Sugar production capacity utilization and efficiency improvements
                </CardDescription>
                <BarChartLazy 
                  data={sugarProductionData} 
                  dataKey="production" 
                  fill="#f59e0b" 
                  name="Sugar Production (Lakh Tons)" 
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }} className="text-center mt-12">
            <Card className={`${chartCardClass} p-6`}>
                <CardHeader className={chartHeaderClass}>
                    <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-bio-green-100 to-eco-lime-100 dark:from-bio-green-800 dark:to-bio-green-900 rounded-full flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-bio-green-600 dark:text-bio-green-400" />
                    </div>
                    <CardTitle className={chartTitleClass}>{t('insightsOtherMetricsTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className={`${chartDescClass} max-w-2xl mx-auto`}>
                        {t('insightsOtherMetricsDesc')}
                    </CardDescription>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {initialOtherMetrics.map((metric, index) => {
                          const Icon = metric.icon;
                          return (
                            <div key={index} className="p-6 bg-gradient-to-br from-bio-green-50 to-eco-lime-50 dark:from-bio-green-800/50 dark:to-bio-green-900/50 rounded-xl text-center transform hover:scale-105 transition-transform duration-300 border border-bio-green-200/50 dark:border-bio-green-700/50">
                                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-bio-green-100 to-eco-lime-100 dark:from-bio-green-700 dark:to-bio-green-800 rounded-full flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-bio-green-600 dark:text-bio-green-300" />
                                </div>
                                <div className="mb-2">
                                  <span className="text-2xl font-bold bg-gradient-to-r from-bio-green-600 to-eco-lime-600 dark:from-bio-green-400 dark:to-eco-lime-400 bg-clip-text text-transparent">{metric.statisticText}</span>
                                </div>
                                <h4 className="font-semibold text-foreground mb-1">{t(metric.titleKey)}</h4>
                                <p className="text-xs text-muted-foreground">{t(metric.descKey)}</p>
                            </div>
                          );
                        })}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DataInsightsSection;