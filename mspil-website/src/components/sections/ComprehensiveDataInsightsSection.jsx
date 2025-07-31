import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChartLazy } from '@/components/LazyChart';
import { EnhancedLineChartLazy, EnhancedBarChartLazy } from '@/components/EnhancedLazyChart';
import { 
  TrendingUp, 
  BarChart3,
  DollarSign,
  Factory,
  Zap,
  Target,
  Activity,
  Percent,
  Droplets,
  ArrowUpRight,
  Wheat,
  Gauge,
  Scale,
  Building2,
  Timer
} from 'lucide-react';
import { 
  revenueData, 
  ethanolData, 
  profitabilityData, 
  segmentsData, 
  returnsData, 
  capitalData, 
  efficiencyData, 
  capacityData,
  investmentData,
  kpiData
} from '@/constants/financialData';

const ComprehensiveDataInsightsSection = () => {
  // Using centralized data from financialData.js
  const turnoverDataDb = revenueData.projections;
  const ethanolProductionData = ethanolData.production;
  const profitabilityDataChart = profitabilityData.margins;
  const segmentRevenueData = segmentsData.revenue;
  const returnRatiosData = returnsData.ratios;
  const debtData = capitalData.debtEquity;
  const efficiencyMetrics = efficiencyData.metrics;
  const capacityUtilization = capacityData.current;
  
  // Key performance metrics
  const keyMetrics = useMemo(() => [
    { 
      icon: DollarSign, 
      titleKey: 'Revenue CAGR', 
      value: kpiData.revenueCagr.value, 
      descKey: `${kpiData.revenueCagr.period} Growth Rate`,
      color: 'text-green-600',
      trend: kpiData.revenueCagr.trend
    },
    { 
      icon: Percent, 
      titleKey: 'Peak ROCE', 
      value: kpiData.peakROCE.value, 
      descKey: `Return on Capital (${kpiData.peakROCE.year})`,
      color: 'text-blue-600',
      trend: kpiData.peakROCE.trend
    },
    { 
      icon: Activity, 
      titleKey: 'EBITDA Margin', 
      value: kpiData.ebitdaMargin.value, 
      descKey: `By ${kpiData.ebitdaMargin.year}`,
      color: 'text-purple-600',
      trend: kpiData.ebitdaMargin.trend
    },
    { 
      icon: Target, 
      titleKey: 'Sugar Recovery', 
      value: kpiData.sugarRecovery.value, 
      descKey: `vs ${kpiData.sugarRecovery.benchmark} Industry`,
      color: 'text-orange-600',
      trend: kpiData.sugarRecovery.trend
    }
  ], []);
  
  // Ethanol specific metrics
  const ethanolMetrics = useMemo(() => [
    { 
      icon: Droplets,
      title: 'Annual Capacity',
      value: ethanolData.capacity.annual,
      desc: `${ethanolData.capacity.daily} Plant`,
      color: 'text-cyan-600'
    },
    { 
      icon: Wheat,
      title: 'Raw Material',
      value: ethanolData.metrics.rawMaterial,
      desc: 'Maize Consumption',
      color: 'text-amber-600'
    },
    { 
      icon: Gauge,
      title: 'Conversion Rate',
      value: ethanolData.metrics.conversionRate,
      desc: 'Ethanol Yield',
      color: 'text-emerald-600'
    },
    { 
      icon: Timer,
      title: 'Operation Days',
      value: ethanolData.metrics.operationDays,
      desc: 'Annual Running',
      color: 'text-indigo-600'
    }
  ], []);
  
  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };
  
  const chartCardClass = "shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/10 bg-white dark:bg-gray-800";
  const chartHeaderClass = "items-center text-center pb-2";
  const chartTitleClass = "mt-2 text-2xl font-semibold text-primary";
  const chartDescClass = "text-sm text-foreground/70 mb-4 min-h-[40px]";

  return (
    <section id="insights" className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInProps} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Performance & Impact Metrics</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Comprehensive insights into our operational excellence, financial performance, and growth trajectory
          </p>
        </motion.div>

        {/* Key Performance Metrics */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.1 }} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    <div className="text-right">
                      <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
                      <p className="text-xs text-green-600 font-semibold">{metric.trend}</p>
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{metric.titleKey}</h4>
                  <p className="text-sm text-muted-foreground">{metric.descKey}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Revenue and Ethanol Production Charts */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <TrendingUp className="w-10 h-10 text-primary" />
                <CardTitle className={chartTitleClass}>Revenue Growth Trajectory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  Exponential growth driven by ethanol capacity addition
                </CardDescription>
                <LineChartLazy 
                  data={turnoverDataDb} 
                  dataKey="turnover" 
                  stroke="#059669" 
                  name="Revenue (₹ Cr)" 
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.3 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <Droplets className="w-10 h-10 text-cyan-600" />
                <CardTitle className={chartTitleClass}>Ethanol Production Ramp-up</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  From zero to 12.3 crore liters annual capacity
                </CardDescription>
                <LineChartLazy 
                  data={ethanolProductionData} 
                  dataKey="production" 
                  stroke="#06b6d4" 
                  name="Production (Million L)" 
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Ethanol Business Metrics */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.35 }} className="mb-12">
          <Card className={chartCardClass}>
            <CardHeader className="text-center">
              <Factory className="w-10 h-10 text-primary mx-auto" />
              <CardTitle className={chartTitleClass}>Ethanol Business Analytics</CardTitle>
              <CardDescription className="text-center max-w-2xl">
                Key operational metrics for our state-of-the-art ethanol facility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {ethanolMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-2`} />
                    <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                    <h4 className="font-medium text-sm">{metric.title}</h4>
                    <p className="text-xs text-muted-foreground">{metric.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Segment Performance */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }} className="mb-12">
          <Card className={chartCardClass}>
            <CardHeader className={chartHeaderClass}>
              <BarChart3 className="w-10 h-10 text-primary" />
              <CardTitle className={chartTitleClass}>Revenue Mix Evolution</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className={chartDescClass}>
                Transformation from sugar-centric to diversified revenue streams
              </CardDescription>
              <EnhancedBarChartLazy 
                data={segmentRevenueData}
                dataKeys={['sugar', 'ethanol', 'ddgs', 'power']}
                colors={['#e5e7eb', '#10b981', '#fbbf24', '#3b82f6']}
                names={['Sugar', 'Ethanol', 'DDGS', 'Power']}
                stacked={true}
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <span className="text-xs">Sugar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                  <span className="text-xs">Ethanol</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-400 rounded"></div>
                  <span className="text-xs">DDGS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-xs">Power</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profitability Metrics */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.45 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <Activity className="w-10 h-10 text-primary" />
                <CardTitle className={chartTitleClass}>Profitability Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  EBITDA and PAT expansion over 5 years
                </CardDescription>
                <EnhancedLineChartLazy 
                  data={profitabilityDataChart}
                  dataKeys={['ebitda', 'pat']}
                  colors={['#3b82f6', '#10b981']}
                  names={['EBITDA (₹ Cr)', 'PAT (₹ Cr)']}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.5 }}>
            <Card className={chartCardClass}>
              <CardHeader className={chartHeaderClass}>
                <Percent className="w-10 h-10 text-primary" />
                <CardTitle className={chartTitleClass}>Return Ratios</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={chartDescClass}>
                  Best-in-class returns on equity and capital
                </CardDescription>
                <EnhancedLineChartLazy 
                  data={returnRatiosData}
                  dataKeys={['roe', 'roce']}
                  colors={['#8b5cf6', '#f59e0b']}
                  names={['ROE %', 'ROCE %']}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Operational Excellence */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.55 }} className="mb-12">
          <Card className={chartCardClass}>
            <CardHeader className="text-center">
              <Gauge className="w-10 h-10 text-primary mx-auto" />
              <CardTitle className={chartTitleClass}>Operational Excellence</CardTitle>
              <CardDescription className="text-center max-w-2xl">
                Outperforming industry benchmarks across key metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {efficiencyMetrics.map((item, index) => (
                  <div key={index} className="text-center">
                    <h4 className="font-semibold mb-2">{item.metric}</h4>
                    <div className="relative h-32 flex items-end justify-center gap-2">
                      <div className="w-16 bg-primary/20 rounded-t" style={{height: `${(item.industry/item.value)*100}%`}}>
                        <div className="text-xs font-medium pt-1">{item.industry}{item.unit}</div>
                      </div>
                      <div className="w-16 bg-primary rounded-t" style={{height: '100%'}}>
                        <div className="text-sm font-bold pt-1">{item.value}{item.unit}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Industry vs MSIPL</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Debt Reduction Journey */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }} className="mb-12">
          <Card className={chartCardClass}>
            <CardHeader className={chartHeaderClass}>
              <Scale className="w-10 h-10 text-primary" />
              <CardTitle className={chartTitleClass}>Balance Sheet Strengthening</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className={chartDescClass}>
                Deleveraging journey - From ₹310 Cr to ₹45 Cr debt
              </CardDescription>
              <EnhancedBarChartLazy 
                data={debtData}
                dataKeys={['debt', 'equity']}
                colors={['#ef4444', '#10b981']}
                names={['Debt (₹ Cr)', 'Equity (₹ Cr)']}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Capacity Utilization */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.65 }} className="mb-12">
          <Card className={chartCardClass}>
            <CardHeader className="text-center">
              <Building2 className="w-10 h-10 text-primary mx-auto" />
              <CardTitle className={chartTitleClass}>Plant Capacity Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capacityUtilization.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.segment}</span>
                      <span className="text-sm text-muted-foreground">{item.capacity} {item.unit}</span>
                    </div>
                    <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-primary rounded-full transition-all duration-1000"
                        style={{width: `${item.utilization}%`}}
                      >
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary-foreground">
                          {item.utilization}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Investment Highlights */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.7 }}>
          <Card className={chartCardClass}>
            <CardHeader className="text-center">
              <ArrowUpRight className="w-10 h-10 mx-auto text-primary" />
              <CardTitle className="text-2xl font-bold">Investment Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <h4 className="font-semibold mb-2 text-lg">Growth Story</h4>
                  <p className="text-3xl font-bold mb-2 text-primary">{revenueData.growthMultiple}</p>
                  <p className="text-sm text-muted-foreground">Revenue growth in 5 years</p>
                </div>
                <div className="text-center p-4">
                  <h4 className="font-semibold mb-2 text-lg">Valuation</h4>
                  <p className="text-3xl font-bold mb-2 text-primary">{investmentData.valuation.preIPO}</p>
                  <p className="text-sm text-muted-foreground">Pre-IPO opportunity</p>
                </div>
                <div className="text-center p-4">
                  <h4 className="font-semibold mb-2 text-lg">Exit Timeline</h4>
                  <p className="text-3xl font-bold mb-2 text-primary">{investmentData.exitTimeline}</p>
                  <p className="text-sm text-muted-foreground">Planned IPO listing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ComprehensiveDataInsightsSection;