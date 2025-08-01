import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChartLazy, BarChartLazy } from '@/components/LazyChart';
import AdvancedChartCard from '@/components/AdvancedCharts';
import { TrendingUp, BarChartBig, Leaf, Loader2, Droplets, Zap, Wheat, Factory, DollarSign, Package } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DataInsightsSection = () => {
  const t = useTranslation();
  const [turnoverDataDb, setTurnoverDataDb] = useState([
    { year: '2024-25', turnover: 300.00, revenue: 300.00, profit: 21.70, trend: 0, note: 'Sugar only' },
    { year: '2025-26', turnover: 811.08, revenue: 811.08, profit: 76.45, trend: 170.4, note: 'Ethanol plant operational' },
    { year: '2026-27', turnover: 1310.56, revenue: 1310.56, profit: 170.13, trend: 61.5, note: 'Full ethanol capacity' },
    { year: '2027-28', turnover: 1378.40, revenue: 1378.40, profit: 246.99, trend: 5.2, note: 'Steady growth' },
    { year: '2028-29', turnover: 1462.27, revenue: 1462.27, profit: 276.34, trend: 6.1, note: 'Market expansion' },
    { year: '2029-30', turnover: 1564.91, revenue: 1564.91, profit: 301.45, trend: 7.0, note: 'Peak performance' }
  ]);
  const [productionDataDb, setProductionDataDb] = useState([
    { year: '2024-25', crushing: 5.5, sugar: 5.5, ethanol: 0, power: 9.66, ddgs: 0 },
    { year: '2025-26', crushing: 6.8, sugar: 6.8, ethanol: 3.0, power: 9.66, ddgs: 2.5 },
    { year: '2026-27', crushing: 6.8, sugar: 6.8, ethanol: 8.5, power: 9.66, ddgs: 5.1 },
    { year: '2027-28', crushing: 6.8, sugar: 6.8, ethanol: 10.0, power: 9.66, ddgs: 6.8 },
    { year: '2028-29', crushing: 6.8, sugar: 6.8, ethanol: 10.5, power: 9.66, ddgs: 7.0 },
    { year: '2029-30', crushing: 6.8, sugar: 6.8, ethanol: 10.5, power: 9.66, ddgs: 7.0 }
  ]);
  
  const [ethanolProductionData] = useState([
    { year: '2024-25', production: 0, note: 'Plant under construction' },
    { year: '2025-26', production: 3.0, note: 'Initial ramp-up (30% capacity)' },
    { year: '2026-27', production: 8.5, note: 'Reaching 85% capacity' },
    { year: '2027-28', production: 10.0, note: 'Full capacity - 350 KLPD' },
    { year: '2028-29', production: 10.5, note: 'Peak capacity - 10.5 Cr L' },
    { year: '2029-30', production: 10.5, note: 'Sustained peak capacity' }
  ]);
  
  const [sugarProductionData] = useState([
    { year: '2024-25', production: 5.5, note: 'Current capacity' },
    { year: '2025-26', production: 6.8, note: 'Optimized operations' },
    { year: '2026-27', production: 6.8, note: 'Efficiency improvements' },
    { year: '2027-28', production: 6.8, note: 'Consistent processing' },
    { year: '2028-29', production: 6.8, note: 'Maintained capacity' },
    { year: '2029-30', production: 6.8, note: 'Stable production' }
  ]);
  const [loadingCharts, setLoadingCharts] = useState(false);

  const initialOtherMetrics = useMemo(() => [
    { titleKey: 'insightsMetricEthanolTitle', descKey: 'insightsMetricEthanolDesc', statisticText: '10.5 Cr L Annual Capacity', icon: Droplets, altKey: 'insightsEthanolIconAlt' },
    { titleKey: 'insightsMetricPowerTitle', descKey: 'insightsMetricPowerDesc', statisticText: '9.66 MW', icon: Zap, altKey: 'insightsPowerIconAlt' },
    { titleKey: 'insightsMetricDDGSTitle', descKey: 'insightsMetricDDGSDesc', statisticText: '60,000 Tons', icon: Wheat, altKey: 'insightsDDGSIconAlt' },
  ], []);

  // Data is now static, no need for useEffect to fetch from database

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };
  
  const chartCardClass = "shadow-md hover:shadow-lg transition-all duration-300 border-bio-green-200 dark:border-bio-green-800 bg-white dark:bg-gray-800 hover:border-bio-green-300 dark:hover:border-bio-green-700";
  const chartHeaderClass = "items-center text-center pb-1";
  const chartTitleClass = "text-lg font-semibold bg-gradient-to-r from-bio-green-700 to-eco-lime-700 dark:from-bio-green-400 dark:to-eco-lime-400 bg-clip-text text-transparent";
  const chartDescClass = "text-xs text-foreground/70 mb-2 min-h-[30px]";
  const chartContainerHeight = 250;

  const renderChartPlaceholder = () => (
    <div style={{ width: '100%', height: chartContainerHeight }} className="flex items-center justify-center bg-muted/50 rounded-md">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );

  return (
    <section id="insights" className="py-8 bg-gradient-to-b from-white via-bio-green-50 to-eco-lime-50 dark:from-bio-green-900 dark:via-bio-green-800 dark:to-bio-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInProps} className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-bio-green-700 to-eco-lime-700 dark:from-bio-green-400 dark:to-eco-lime-400 bg-clip-text text-transparent mb-4">{t('insightsTitle')}</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {t('insightsSubtitle')}
          </p>
        </motion.div>

        {/* Financial Performance Overview */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }} className="mb-4">
          <AdvancedChartCard
            title={t('insightsTurnoverChartTitle') || "Financial Performance Projection"}
            description={t('insightsTurnoverChartDesc') || "Revenue and profit growth trajectory"}
            data={turnoverDataDb}
            dataKeys={['revenue', 'profit']}
            colors={['#059669', '#f59e0b']}
            names={['Revenue (₹ Cr)', 'Profit (₹ Cr)']}
            defaultChartType="line"
            showControls={true}
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2 p-3 bg-gradient-to-r from-bio-green-100 to-eco-lime-100 dark:from-bio-green-900/30 dark:to-eco-lime-900/30 rounded-lg border border-bio-green-200 dark:border-bio-green-800"
          >
            <p className="text-sm font-medium text-bio-green-800 dark:text-bio-green-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Major growth from 2025-26 due to ethanol plant (350 KLPD) becoming operational
            </p>
          </motion.div>
        </motion.div>

        {/* Comprehensive Production Overview */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.3 }} className="mb-4">
          <AdvancedChartCard
            title="Integrated Production Dashboard"
            description="All business segments production capacity and growth projections"
            data={productionDataDb}
            dataKeys={['sugar', 'ethanol', 'power', 'ddgs']}
            colors={['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']}
            names={['Sugar (Lakh Tons)', 'Ethanol (Cr Liters)', 'Power (MW)', 'DDGS (10k Tons)']}
            defaultChartType="bar"
            showControls={true}
          />
        </motion.div>

        {/* Individual Production Analysis */}
        <Tabs defaultValue="ethanol" className="mb-4">
          <TabsList className="grid w-full grid-cols-2 md:w-[350px] mx-auto h-10">
            <TabsTrigger value="ethanol" className="gap-2">
              <Droplets className="h-4 w-4" />
              Ethanol Production
            </TabsTrigger>
            <TabsTrigger value="sugar" className="gap-2">
              <Factory className="h-4 w-4" />
              Sugar Production
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ethanol">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AdvancedChartCard
                title="Ethanol Production Ramp-up"
                description="Annual ethanol production growth from 0 to 11 Crore Liters"
                data={ethanolProductionData}
                dataKeys={['production']}
                colors={['#10b981']}
                names={['Ethanol Production (Cr Liters)']}
                defaultChartType="line"
                showControls={false}
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 p-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg border border-amber-200 dark:border-amber-800"
              >
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Plant commissioning in 2025-26, reaching full capacity by 2027-28
                </p>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="sugar">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AdvancedChartCard
                title="Sugar Production Growth"
                description="Sugar production capacity utilization and efficiency improvements"
                data={sugarProductionData}
                dataKeys={['production']}
                colors={['#f59e0b']}
                names={['Sugar Production (Lakh Tons)']}
                defaultChartType="bar"
                showControls={false}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }} className="text-center mt-6">
            <Card className={`${chartCardClass} p-4`}>
                <CardHeader className={chartHeaderClass}>
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-bio-green-100 to-eco-lime-100 dark:from-bio-green-800 dark:to-bio-green-900 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-bio-green-600 dark:text-bio-green-400" />
                    </div>
                    <CardTitle className={chartTitleClass}>{t('insightsOtherMetricsTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className={`${chartDescClass} max-w-2xl mx-auto`}>
                        {t('insightsOtherMetricsDesc')}
                    </CardDescription>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {initialOtherMetrics.map((metric, index) => {
                          const Icon = metric.icon;
                          return (
                            <div key={index} className="p-4 bg-gradient-to-br from-bio-green-50 to-eco-lime-50 dark:from-bio-green-800/50 dark:to-bio-green-900/50 rounded-lg text-center transform hover:scale-105 transition-transform duration-300 border border-bio-green-200/50 dark:border-bio-green-700/50">
                                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-bio-green-100 to-eco-lime-100 dark:from-bio-green-700 dark:to-bio-green-800 rounded-full flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-bio-green-600 dark:text-bio-green-300" />
                                </div>
                                <div className="mb-1">
                                  <span className="text-xl font-bold bg-gradient-to-r from-bio-green-600 to-eco-lime-600 dark:from-bio-green-400 dark:to-eco-lime-400 bg-clip-text text-transparent">{metric.statisticText}</span>
                                </div>
                                <h4 className="font-medium text-sm text-foreground mb-1">{t(metric.titleKey)}</h4>
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