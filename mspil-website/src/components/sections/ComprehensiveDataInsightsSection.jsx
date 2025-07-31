import React, { useState, useMemo } from 'react';
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
const ComprehensiveDataInsightsSection = () => {
  
  // Revenue data from financial model
  const [turnoverDataDb, setTurnoverDataDb] = useState([
    { year: 'FY25', turnover: 300 },
    { year: 'FY26', turnover: 811.08 },
    { year: 'FY27', turnover: 1310.56 },
    { year: 'FY28', turnover: 1378.40 },
    { year: 'FY29', turnover: 1462.27 },
    { year: 'FY30', turnover: 1564.91 }
  ]);
  
  // Ethanol production data
  const [ethanolProductionData, setEthanolProductionData] = useState([
    { year: 'FY25', production: 0, revenue: 0 },
    { year: 'FY26', production: 30, revenue: 215.58 },
    { year: 'FY27', production: 123, revenue: 883.74 },
    { year: 'FY28', production: 123, revenue: 883.74 },
    { year: 'FY29', production: 123, revenue: 883.74 },
    { year: 'FY30', production: 123, revenue: 924.61 }
  ]);
  
  // EBITDA and PAT data
  const [profitabilityData, setProfitabilityData] = useState([
    { year: 'FY26', ebitda: 171.82, pat: 76.45 },
    { year: 'FY27', ebitda: 296.13, pat: 170.13 },
    { year: 'FY28', ebitda: 372.92, pat: 246.99 },
    { year: 'FY29', ebitda: 406.12, pat: 276.34 },
    { year: 'FY30', ebitda: 434.30, pat: 301.45 }
  ]);
  
  // Business segment revenue breakdown
  const [segmentRevenueData, setSegmentRevenueData] = useState([
    { year: 'FY26', sugar: 407.48, ethanol: 215.58, ddgs: 41.46, power: 146.56 },
    { year: 'FY27', sugar: 261.59, ethanol: 883.74, ddgs: 169.95, power: 54.34 },
    { year: 'FY28', sugar: 274.67, ethanol: 883.74, ddgs: 169.95, power: 54.34 },
    { year: 'FY29', sugar: 291.19, ethanol: 883.74, ddgs: 169.95, power: 54.34 },
    { year: 'FY30', sugar: 408.02, ethanol: 924.61, ddgs: 177.94, power: 54.34 }
  ]);
  
  // Return ratios data
  const [returnRatiosData, setReturnRatiosData] = useState([
    { year: 'FY26', roe: 27.0, roce: 15.5 },
    { year: 'FY27', roe: 38.5, roce: 41.2 },
    { year: 'FY28', roe: 46.0, roce: 49.0 },
    { year: 'FY29', roe: 37.9, roce: 42.5 },
    { year: 'FY30', roe: 30.9, roce: 37.2 }
  ]);
  
  // Debt reduction data
  const [debtData, setDebtData] = useState([
    { year: 'FY26', debt: 310, equity: 283 },
    { year: 'FY27', debt: 235, equity: 441 },
    { year: 'FY28', debt: 144, equity: 536 },
    { year: 'FY29', debt: 90, equity: 729 },
    { year: 'FY30', debt: 45, equity: 975 }
  ]);
  
  // Operational efficiency metrics
  const [efficiencyData, setEfficiencyData] = useState([
    { metric: 'Sugar Recovery', value: 11, industry: 10, unit: '%' },
    { metric: 'Ethanol Yield', value: 407, industry: 380, unit: 'L/MT' },
    { metric: 'Plant Utilization', value: 85, industry: 75, unit: '%' },
    { metric: 'Power Efficiency', value: 92, industry: 85, unit: '%' }
  ]);
  
  // Capacity utilization data
  const [capacityUtilization, setCapacityUtilization] = useState([
    { segment: 'Sugar Mill', capacity: 8000, utilization: 85, unit: 'TCD' },
    { segment: 'Ethanol Plant', capacity: 410, utilization: 82, unit: 'KLPD' },
    { segment: 'Power Plant', capacity: 9.66, utilization: 90, unit: 'MW' },
    { segment: 'DDGS', capacity: 300, utilization: 80, unit: 'TPD' }
  ]);
  
  // Key performance metrics
  const keyMetrics = useMemo(() => [
    { 
      icon: DollarSign, 
      titleKey: 'Revenue CAGR', 
      value: '39.1%', 
      descKey: '5-Year Growth Rate',
      color: 'text-green-600',
      trend: '+5.2x'
    },
    { 
      icon: Percent, 
      titleKey: 'Peak ROCE', 
      value: '49.0%', 
      descKey: 'Return on Capital (FY28)',
      color: 'text-blue-600',
      trend: '+33.5pp'
    },
    { 
      icon: Activity, 
      titleKey: 'EBITDA Margin', 
      value: '27.8%', 
      descKey: 'By FY30',
      color: 'text-purple-600',
      trend: '+6.6pp'
    },
    { 
      icon: Target, 
      titleKey: 'Sugar Recovery', 
      value: '11%', 
      descKey: 'vs 10% Industry',
      color: 'text-orange-600',
      trend: '+10%'
    }
  ], []);
  
  // Ethanol specific metrics
  const ethanolMetrics = useMemo(() => [
    { 
      icon: Droplets,
      title: 'Annual Capacity',
      value: '12.3 Cr L',
      desc: '410 KLPD Plant',
      color: 'text-cyan-600'
    },
    { 
      icon: Wheat,
      title: 'Raw Material',
      value: '900 TPD',
      desc: 'Maize Consumption',
      color: 'text-amber-600'
    },
    { 
      icon: Gauge,
      title: 'Conversion Rate',
      value: '407 L/MT',
      desc: 'Ethanol Yield',
      color: 'text-emerald-600'
    },
    { 
      icon: Timer,
      title: 'Operation Days',
      value: '300 Days',
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
    <section id="insights" className="section-padding">
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
                  data={profitabilityData}
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
                {efficiencyData.map((item, index) => (
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
                  <p className="text-3xl font-bold mb-2 text-primary">5.2x</p>
                  <p className="text-sm text-muted-foreground">Revenue growth in 5 years</p>
                </div>
                <div className="text-center p-4">
                  <h4 className="font-semibold mb-2 text-lg">Valuation</h4>
                  <p className="text-3xl font-bold mb-2 text-primary">₹820 Cr</p>
                  <p className="text-sm text-muted-foreground">Pre-IPO opportunity</p>
                </div>
                <div className="text-center p-4">
                  <h4 className="font-semibold mb-2 text-lg">Exit Timeline</h4>
                  <p className="text-3xl font-bold mb-2 text-primary">15 Months</p>
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