import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line } from 'recharts';
import { TrendingUp, BarChartBig, Leaf, Loader2 } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

const DataInsightsSection = () => {
  const t = useTranslation();
  const [turnoverDataDb, setTurnoverDataDb] = useState([
    { year: '2019-20', turnover: 850 },
    { year: '2020-21', turnover: 920 },
    { year: '2021-22', turnover: 1050 },
    { year: '2022-23', turnover: 1180 },
    { year: '2023-24', turnover: 1320 }
  ]);
  const [productionDataDb, setProductionDataDb] = useState([
    { year: '2019-20', crushing: 8.5 },
    { year: '2020-21', crushing: 9.2 },
    { year: '2021-22', crushing: 10.5 },
    { year: '2022-23', crushing: 11.8 },
    { year: '2023-24', crushing: 13.2 }
  ]);
  const [loadingCharts, setLoadingCharts] = useState(false);

  const initialOtherMetrics = useMemo(() => [
    { titleKey: 'insightsMetricEthanolTitle', descKey: 'insightsMetricEthanolDesc', statisticText: '12 Crore Liters', altKey: 'insightsEthanolIconAlt' },
    { titleKey: 'insightsMetricPowerTitle', descKey: 'insightsMetricPowerDesc', statisticText: '900 MW', altKey: 'insightsPowerIconAlt' },
    { titleKey: 'insightsMetricDDGSTitle', descKey: 'insightsMetricDDGSDesc', statisticText: '60000 Tons', altKey: 'insightsDDGSIconAlt' },
  ], []);

  // Data is now static, no need for useEffect to fetch from database

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };
  
  const chartCardClass = "shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/10 dark:bg-muted/30";
  const chartHeaderClass = "items-center text-center pb-2";
  const chartTitleClass = "mt-2 text-2xl font-semibold text-primary";
  const chartDescClass = "text-sm text-foreground/70 mb-4 min-h-[40px]";
  const chartContainerHeight = 300;

  const renderChartPlaceholder = () => (
    <div style={{ width: '100%', height: chartContainerHeight }} className="flex items-center justify-center bg-muted/50 rounded-md">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );

  return (
    <section id="insights" className="section-padding bg-muted/10 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInProps} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('insightsTitle')}</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {t('insightsSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <TrendingUp className="w-10 h-10 text-primary" />
                <CardTitle className={chartTitleClass}>{t('insightsTurnoverChartTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  {t('insightsTurnoverChartDesc')}
                </CardDescription>
                {loadingCharts ? renderChartPlaceholder() : (
                  <div style={{ width: '100%', height: chartContainerHeight }}>
                    <ResponsiveContainer>
                      <LineChart data={turnoverDataDb} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="year" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                        <YAxis tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--primary))', color: 'hsl(var(--foreground))' }} itemStyle={{ color: 'hsl(var(--foreground))' }} />
                        <Legend wrapperStyle={{ fontSize: "14px" }} />
                        <Line type="monotone" dataKey="turnover" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} name={t('insightsTurnoverLegend') || "Turnover (Cr)"} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.3 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <BarChartBig className="w-10 h-10 text-primary" />
                <CardTitle className={chartTitleClass}>{t('insightsProductionChartTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  {t('insightsProductionChartDesc')}
                </CardDescription>
                {loadingCharts ? renderChartPlaceholder() : (
                  <div style={{ width: '100%', height: chartContainerHeight }}>
                    <ResponsiveContainer>
                      <BarChart data={productionDataDb} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="year" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                        <YAxis tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--primary))', color: 'hsl(var(--foreground))' }} itemStyle={{ color: 'hsl(var(--foreground))' }} />
                        <Legend wrapperStyle={{ fontSize: "14px" }} />
                        <Bar dataKey="crushing" fill="hsl(var(--primary))" name={t('insightsProductionLegend') || "Crushing (Lakh Tons)"} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }} className="text-center mt-12">
            <Card className={`${chartCardClass} p-6`}>
                <CardHeader className={chartHeaderClass}>
                    <Leaf className="w-10 h-10 text-primary" />
                    <CardTitle className={chartTitleClass}>{t('insightsOtherMetricsTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className={`${chartDescClass} max-w-2xl mx-auto`}>
                        {t('insightsOtherMetricsDesc')}
                    </CardDescription>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {initialOtherMetrics.map((metric, index) => (
                          <div key={index} className="p-4 bg-background/50 dark:bg-muted/50 rounded-lg text-center">
                              <div className="mx-auto mb-2 h-16 w-16 flex items-center justify-center rounded">
                                <span className="text-2xl font-bold text-primary">{metric.statisticText}</span>
                              </div>
                              <h4 className="font-semibold text-foreground">{t(metric.titleKey)}</h4>
                              <p className="text-xs text-muted-foreground">{t(metric.descKey)}</p>
                          </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DataInsightsSection;