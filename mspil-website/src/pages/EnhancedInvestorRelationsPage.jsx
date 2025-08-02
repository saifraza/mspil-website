import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChartLazy, BarChartLazy } from '@/components/LazyChart';
import { EnhancedLineChartLazy, EnhancedBarChartLazy } from '@/components/EnhancedLazyChart';
import { 
  FileText, 
  TrendingUp, 
  Users, 
  Shield, 
  Download, 
  Building,
  FileSpreadsheet,
  Gavel,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  DollarSign,
  Target,
  Factory,
  Timer,
  Percent,
  Activity,
  Scale,
  Award,
  Zap,
  Droplets,
  Wheat,
  BarChart3,
  PieChart,
  Gauge,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { pageBackgrounds, cardBackgrounds, sectionBackgrounds } from '@/utils/backgroundStyles';
import { fastFadeInProps, fastStaggerProps } from '@/utils/scrollAnimations';

const EnhancedInvestorRelationsPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [activeTab, setActiveTab] = useState('investment-opportunity');

  // Pre-IPO Investment Data
  const investmentData = {
    valuation: {
      preMoney: 820,
      postMoney: 910,
      bookValue: 536,
      peRatio: 3.3,
      currency: '₹ Cr'
    },
    timeline: {
      currentStage: 'Pre-IPO Closed - IPO Preparation',
      ipoTarget: '15 months',
      listingDate: 'Q3 2026',
      minimumInvestment: '₹ 10 Cr'
    },
    returns: {
      expectedROI: '150-200%',
      exitMultiple: '2.5-3x',
      irr: '80-100%'
    },
    roundStatus: 'CLOSED',
    amountRaised: '₹40 Cr',
    closingDate: 'Aug 2, 2025'
  };

  // Key Investment Highlights
  const investmentHighlights = [
    {
      icon: TrendingUp,
      title: '5.2x Revenue Growth',
      description: 'From ₹300 Cr to ₹1,564 Cr in 5 years',
      metric: '39.1% CAGR',
      color: 'text-green-600'
    },
    {
      icon: Factory,
      title: 'Ethanol Expansion',
      description: '350 KLPD capacity operational from 2025',
      metric: '₹925 Cr Revenue',
      color: 'text-blue-600'
    },
    {
      icon: Percent,
      title: 'Best-in-Class Returns',
      description: 'Peak ROCE of 49% by FY28',
      metric: '46% ROE',
      color: 'text-purple-600'
    },
    {
      icon: Scale,
      title: 'Debt Reduction',
      description: 'From ₹310 Cr to ₹45 Cr by FY30',
      metric: '85% Reduction',
      color: 'text-orange-600'
    }
  ];

  // Financial Projection Data
  const revenueProjections = [
    { year: 'FY25', revenue: 300.2, ebitda: 67.28, pat: 33.20 },
    { year: 'FY26', revenue: 811.08, ebitda: 171.82, pat: 76.45 },
    { year: 'FY27', revenue: 1310.56, ebitda: 296.13, pat: 170.13 },
    { year: 'FY28', revenue: 1378.40, ebitda: 372.92, pat: 247.00 },
    { year: 'FY29', revenue: 1462.27, ebitda: 406.12, pat: 276.34 },
    { year: 'FY30', revenue: 1564.91, ebitda: 434.30, pat: 301.45 }
  ];

  // Shareholding Pattern
  const shareholdingPattern = {
    preIPO: [
      { category: 'Promoters & Promoter Group', percentage: 75, shares: '7.5 Cr' },
      { category: 'Strategic Investors', percentage: 15, shares: '1.5 Cr' },
      { category: 'Financial Investors', percentage: 10, shares: '1.0 Cr' }
    ],
    postIPO: [
      { category: 'Promoters & Promoter Group', percentage: 56.25, shares: '7.5 Cr' },
      { category: 'Strategic Investors', percentage: 11.25, shares: '1.5 Cr' },
      { category: 'Financial Investors', percentage: 7.5, shares: '1.0 Cr' },
      { category: 'Public', percentage: 25, shares: '3.33 Cr' }
    ]
  };

  // Business Segments Revenue Mix (CORRECTED from Excel Model)
  const segmentRevenueMix = [
    { year: 'FY26', sugar: 35.9, ethanol: 50.9, ddgs: 9.3, power: 3.9, 
      sugarValue: 291.26, ethanolValue: 412.99, ddgsValue: 75.14, powerValue: 31.69 },
    { year: 'FY27', sugar: 20.5, ethanol: 65.1, ddgs: 11.8, power: 2.6,
      sugarValue: 268.53, ethanolValue: 853.46, ddgsValue: 154.71, powerValue: 33.86 },
    { year: 'FY28', sugar: 21.7, ethanol: 63.6, ddgs: 11.8, power: 2.9,
      sugarValue: 299.08, ethanolValue: 877.19, ddgsValue: 162.21, powerValue: 39.92 },
    { year: 'FY29', sugar: 23.6, ethanol: 61.6, ddgs: 11.6, power: 3.2,
      sugarValue: 345.15, ethanolValue: 900.90, ddgsValue: 169.95, powerValue: 46.27 },
    { year: 'FY30', sugar: 26.1, ethanol: 59.1, ddgs: 11.4, power: 3.5,
      sugarValue: 408.02, ethanolValue: 924.61, ddgsValue: 177.94, powerValue: 54.34 }
  ];

  const handleQuickNavigation = (targetTab, targetSection) => {
    setActiveTab(targetTab);
    setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };


  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      {/* Hero Section with Investment Opportunity */}
      <section className="relative py-20 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fastFadeInProps} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Investor Relations
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Join us in our journey to become India's leading integrated sugar and ethanol producer
            </p>
            
            {/* Pre-IPO Investment Status */}
            <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/40 dark:to-emerald-900/40 backdrop-blur-md border border-green-200/50 dark:border-green-800/50 rounded-xl p-6 max-w-4xl mx-auto shadow-xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                  Pre-IPO Round Successfully Closed
                </h3>
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹820 Cr</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Final Valuation</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹40 Cr</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Amount Raised</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">Today</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Closing Date</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">15 Months</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">IPO Timeline</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Round successfully completed • IPO preparation underway
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Investment Opportunity', icon: DollarSign, tab: 'investment-opportunity', section: 'investment-opportunity' },
              { title: 'Financial Performance', icon: TrendingUp, tab: 'financial-performance', section: 'financial-performance' },
              { title: 'Business Model', icon: Factory, tab: 'business-model', section: 'business-model' },
              { title: 'Corporate Governance', icon: Shield, tab: 'governance', section: 'governance' }
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleQuickNavigation(item.tab, item.section)}
                {...fastFadeInProps}
                transition={{ ...fastFadeInProps.transition, delay: index * 0.1 }}
                className="flex items-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg hover:shadow-xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all text-left w-full hover:-translate-y-1"
              >
                <item.icon className="w-8 h-8 text-primary mr-3" />
                <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 h-auto">
              <TabsTrigger value="investment-opportunity" className="text-xs sm:text-sm">Investment</TabsTrigger>
              <TabsTrigger value="financial-performance" className="text-xs sm:text-sm">Financials</TabsTrigger>
              <TabsTrigger value="business-model" className="text-xs sm:text-sm">Business</TabsTrigger>
              <TabsTrigger value="shareholding" className="text-xs sm:text-sm">Shareholding</TabsTrigger>
              <TabsTrigger value="governance" className="text-xs sm:text-sm">Governance</TabsTrigger>
              <TabsTrigger value="contact" className="text-xs sm:text-sm">Contact</TabsTrigger>
            </TabsList>

            {/* Investment Opportunity Tab */}
            <TabsContent value="investment-opportunity" className="space-y-8">
              <div id="investment-opportunity">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Pre-IPO Investment Opportunity</h2>
                
                {/* Key Investment Highlights */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {investmentHighlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      {...fastFadeInProps}
                      transition={{ ...fastFadeInProps.transition, delay: index * 0.1 }}
                    >
                      <Card className={`h-full ${cardBackgrounds.glass} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                        <CardContent className="p-6">
                          <highlight.icon className={`w-10 h-10 ${highlight.color} mb-4`} />
                          <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{highlight.description}</p>
                          <p className={`text-2xl font-bold ${highlight.color}`}>{highlight.metric}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Valuation Details */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        Company Valuation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20">
                          <span className="font-medium">Pre-Money Valuation</span>
                          <span className="text-2xl font-bold text-primary">₹820 Cr</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                          <span>Post-Money Valuation</span>
                          <span className="text-xl font-semibold">₹910 Cr</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                          <span>Book Value (FY28)</span>
                          <span className="text-xl font-semibold">₹536 Cr</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                          <span>P/E Ratio</span>
                          <span className="text-xl font-semibold">3.3x</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Timer className="w-5 h-5 text-primary" />
                        Investment Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100/70 dark:bg-green-900/40 backdrop-blur-sm border border-green-200/30 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold">Current Stage</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pre-IPO Closed - IPO Preparation</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100/70 dark:bg-blue-900/40 backdrop-blur-sm border border-blue-200/30 rounded-full flex items-center justify-center">
                            <Clock className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold">IPO Timeline</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">15 months (Q3 2026)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100/70 dark:bg-purple-900/40 backdrop-blur-sm border border-purple-200/30 rounded-full flex items-center justify-center">
                            <Target className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold">Expected Returns</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">2.5-3x in 15 months</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Growth Story Chart */}
                <Card className={`mb-8 ${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle>5-Year Growth Trajectory</CardTitle>
                    <CardDescription>Revenue, EBITDA, and PAT projections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <EnhancedBarChartLazy
                        data={revenueProjections}
                        dataKeys={['revenue', 'ebitda', 'pat']}
                        colors={['#059669', '#3b82f6', '#8b5cf6']}
                        names={['Revenue (₹ Cr)', 'EBITDA (₹ Cr)', 'PAT (₹ Cr)']}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Investment Terms */}
                <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Investment Terms & Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg mb-4">Investment Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Minimum Investment</span>
                            <span className="font-medium">₹10 Crores</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Instrument Type</span>
                            <span className="font-medium">Equity Shares</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Lock-in Period</span>
                            <span className="font-medium">6 months post-IPO</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-gray-600">Board Representation</span>
                            <span className="font-medium">Observer rights</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg mb-4">Exit Strategy</h4>
                        <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-sm p-4 rounded-lg border border-green-200/20">
                          <div className="flex items-center gap-2 mb-3">
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-green-800 dark:text-green-200">IPO Listing</span>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                              <span>Planned listing on BSE/NSE in 15 months</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                              <span>Expected listing premium: 50-75%</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                              <span>Strong secondary market potential</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Financial Performance Tab */}
            <TabsContent value="financial-performance" className="space-y-8">
              <div id="financial-performance">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Financial Performance & Projections</h2>
                
                {/* Key Financial Metrics */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Revenue CAGR', value: '39.1%', period: '5 Years', icon: TrendingUp, color: 'text-green-600' },
                    { label: 'Peak EBITDA Margin', value: '27.8%', period: 'FY30', icon: Activity, color: 'text-blue-600' },
                    { label: 'Peak ROCE', value: '49.0%', period: 'FY28', icon: Percent, color: 'text-purple-600' },
                    { label: 'Debt Reduction', value: '85%', period: 'By FY30', icon: Scale, color: 'text-orange-600' }
                  ].map((metric, index) => (
                    <Card key={index} className={`${cardBackgrounds.glass} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <metric.icon className={`w-8 h-8 ${metric.color}`} />
                          <span className="text-xs text-gray-500">{metric.period}</span>
                        </div>
                        <p className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</p>
                        <p className="text-sm font-medium">{metric.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Revenue Mix Evolution */}
                <Card className={`mb-8 ${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle>Revenue Mix Evolution</CardTitle>
                    <CardDescription>Transformation from sugar-centric to diversified revenue model</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <EnhancedBarChartLazy
                        data={segmentRevenueMix}
                        dataKeys={['sugar', 'ethanol', 'ddgs', 'power']}
                        colors={['#e5e7eb', '#10b981', '#fbbf24', '#3b82f6']}
                        names={['Sugar %', 'Ethanol %', 'DDGS %', 'Power %']}
                        stacked={true}
                      />
                    </div>
                    <div className="mt-4 p-4 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-200/20">
                      <p className="text-sm">
                        <Info className="w-4 h-4 inline mr-2 text-blue-600" />
                        Ethanol becomes the dominant revenue contributor from FY27 onwards, accounting for over 60% of total revenue
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Financial Projections */}
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    <CardHeader>
                      <CardTitle>Revenue & Profitability Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <table className="w-full text-sm bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden">
                          <thead>
                            <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-100/50 dark:bg-gray-800/50">
                              <th className="text-left py-2">Year</th>
                              <th className="text-right py-2">Revenue</th>
                              <th className="text-right py-2">EBITDA</th>
                              <th className="text-right py-2">PAT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {revenueProjections.map((year, index) => (
                              <tr key={index} className="border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="py-2 font-medium">{year.year}</td>
                                <td className="text-right font-semibold text-primary">₹{year.revenue}</td>
                                <td className="text-right text-blue-600 dark:text-blue-400">₹{year.ebitda}</td>
                                <td className="text-right text-green-600 dark:text-green-400">₹{year.pat}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    <CardHeader>
                      <CardTitle>Key Ratios & Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                          <div className="flex justify-between mb-2">
                            <span>EBITDA Margin Evolution</span>
                            <span className="font-medium">21.2% → 27.8%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary rounded-full h-2" style={{width: '78%'}}></div>
                          </div>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                          <div className="flex justify-between mb-2">
                            <span>PAT Margin Growth</span>
                            <span className="font-medium">7.2% → 19.3%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-600 rounded-full h-2" style={{width: '68%'}}></div>
                          </div>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                          <div className="flex justify-between mb-2">
                            <span>Debt-to-Equity Ratio</span>
                            <span className="font-medium">1.09 → 0.05</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-green-600 rounded-full h-2" style={{width: '95%'}}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Annual Reports Section */}
                <div id="reports" className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Annual Reports</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { year: '2023-24', title: 'Annual Report 2023-24', status: 'Available', fileSize: '2.4 MB' },
                      { year: '2022-23', title: 'Annual Report 2022-23', status: 'Available', fileSize: '2.1 MB' },
                      { year: '2021-22', title: 'Annual Report 2021-22', status: 'Available', fileSize: '1.9 MB' }
                    ].map((report, index) => (
                      <Card key={index} className={`${cardBackgrounds.glass} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <FileText className="w-8 h-8 text-primary" />
                            <span className={`px-2 py-1 text-xs rounded-full ${report.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                              {report.status}
                            </span>
                          </div>
                          <h4 className="font-semibold mb-2">{report.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Financial Year {report.year}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{report.fileSize}</span>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Quarterly Results Section */}
                <div id="quarterly" className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quarterly Results</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { quarter: 'Q3 FY24', title: 'Q3 FY2024 Results', date: 'Feb 2024', growth: '+23%' },
                      { quarter: 'Q2 FY24', title: 'Q2 FY2024 Results', date: 'Nov 2023', growth: '+18%' },
                      { quarter: 'Q1 FY24', title: 'Q1 FY2024 Results', date: 'Aug 2023', growth: '+15%' },
                      { quarter: 'Q4 FY23', title: 'Q4 FY2023 Results', date: 'May 2023', growth: '+12%' }
                    ].map((result, index) => (
                      <Card key={index} className={`${cardBackgrounds.glass} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <BarChart3 className="w-8 h-8 text-blue-600" />
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {result.growth}
                            </span>
                          </div>
                          <h4 className="font-semibold mb-2">{result.quarter}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{result.date}</p>
                          <Button size="sm" variant="outline" className="w-full">
                            <FileSpreadsheet className="w-4 h-4 mr-2" />
                            View Results
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Business Model Tab */}
            <TabsContent value="business-model" className="space-y-8">
              <div id="business-model">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Integrated Business Model</h2>
                
                {/* Business Model Overview */}
                <Card className={`mb-8 ${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="w-6 h-6 text-primary" />
                      Integrated Sugar Complex Model
                    </CardTitle>
                    <CardDescription>
                      Four revenue streams from a single raw material source
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      {[
                        {
                          icon: Factory,
                          title: 'Sugar Manufacturing',
                          capacity: '8,000 TCD',
                          revenue: '₹408 Cr (FY30)',
                          description: 'Premium quality sugar production',
                          color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                        },
                        {
                          icon: Droplets,
                          title: 'Ethanol Production',
                          capacity: '350 KLPD',
                          revenue: '₹925 Cr (FY30)',
                          description: 'Grain-based ethanol for fuel blending',
                          color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                        },
                        {
                          icon: Wheat,
                          title: 'DDGS Production',
                          capacity: '300 TPD',
                          revenue: '₹178 Cr (FY30)',
                          description: 'High-protein cattle feed',
                          color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                        },
                        {
                          icon: Zap,
                          title: 'Power Generation',
                          capacity: '9.66 MW',
                          revenue: '₹54 Cr (FY30)',
                          description: 'Co-generation from bagasse',
                          color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        }
                      ].map((segment, index) => (
                        <div key={index} className="space-y-4">
                          <div className={`p-4 rounded-lg ${segment.color}`}>
                            <segment.icon className="w-8 h-8 mb-3" />
                            <h4 className="font-semibold text-lg">{segment.title}</h4>
                            <p className="text-2xl font-bold my-2">{segment.capacity}</p>
                            <p className="text-sm">{segment.description}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xl font-bold text-primary">{segment.revenue}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Projected Revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Competitive Advantages */}
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        Competitive Advantages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Strategic Location</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Central India location with abundant raw material</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Operational Excellence</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">11% sugar recovery vs 10% industry average</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Government Support</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">E20 mandate driving ethanol demand</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Zero Waste Model</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">100% utilization of by-products</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Growth Drivers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <ArrowUpRight className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Ethanol Blending Program</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">E20 target by 2025 creating massive demand</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ArrowUpRight className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Capacity Expansion</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">350 KLPD ethanol plant operational from FY26</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ArrowUpRight className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Value Addition</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Higher margins from ethanol vs sugar</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ArrowUpRight className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Sustainable Operations</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">ESG compliance attracting premium valuations</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Shareholding Tab */}
            <TabsContent value="shareholding" className="space-y-8">
              <div id="shareholding">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shareholding Pattern</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    <CardHeader>
                      <CardTitle>Pre-IPO Structure</CardTitle>
                      <CardDescription>Current shareholding pattern</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {shareholdingPattern.preIPO.map((holder, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                            <div>
                              <p className="font-medium">{holder.category}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{holder.shares} shares</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">{holder.percentage}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-200/20">
                        <p className="text-sm">
                          <Info className="w-4 h-4 inline mr-2 text-blue-600" />
                          Total Equity Shares: 10 Crore (Pre-IPO)
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    <CardHeader>
                      <CardTitle>Post-IPO Structure</CardTitle>
                      <CardDescription>Expected shareholding after IPO</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {shareholdingPattern.postIPO.map((holder, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                            <div>
                              <p className="font-medium">{holder.category}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{holder.shares} shares</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">{holder.percentage}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-green-50/80 dark:bg-green-900/30 backdrop-blur-sm rounded-lg border border-green-200/20">
                        <p className="text-sm">
                          <Info className="w-4 h-4 inline mr-2 text-green-600" />
                          Total Equity Shares: 13.33 Crore (Post-IPO)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Shareholders */}
                <Card className={`mt-8 ${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle>Promoter Commitment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/10">
                        <p className="text-3xl font-bold text-primary mb-2">56.25%</p>
                        <p className="font-medium">Post-IPO Holding</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Strong promoter confidence</p>
                      </div>
                      <div className="text-center p-6 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/10">
                        <p className="text-3xl font-bold text-primary mb-2">3 Years</p>
                        <p className="font-medium">Lock-in Period</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Promoter shares locked</p>
                      </div>
                      <div className="text-center p-6 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/10">
                        <p className="text-3xl font-bold text-primary mb-2">₹0</p>
                        <p className="font-medium">Pledged Shares</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Zero promoter pledge</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Corporate Governance Tab */}
            <TabsContent value="governance" className="space-y-8">
              <div id="governance">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Corporate Governance</h2>
                
                <Card className={`mb-8 ${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      Board of Directors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { name: 'Mr. Nawab Raza', position: 'Chairman & Whole-time Director', type: 'Promoter', experience: '35+ years' },
                        { name: 'Mr. Saif Raza', position: 'Managing Director', type: 'Promoter', experience: '15+ years' },
                        { name: 'Mr. Sahil Raza', position: 'Director - Supply Chain', type: 'Promoter', experience: '10+ years' },
                        { name: 'Dr. Rajan Dubey', position: 'Non-Executive Director', type: 'Non-Executive', experience: '25+ years' },
                        { name: 'Mr. E. S. Ranganathan', position: 'Independent Director', type: 'Independent', experience: '30+ years' },
                        { name: 'Mr. Mohan Tiwari', position: 'Independent Director', type: 'Independent', experience: '28+ years' },
                        { name: 'Dr. Chandrakant N. Patil', position: 'Independent Director', type: 'Independent', experience: '32+ years' }
                      ].map((director, index) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{director.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded backdrop-blur-sm border ${
                              director.type === 'Independent' 
                                ? 'bg-green-100/70 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200/30'
                                : director.type === 'Promoter'
                                ? 'bg-blue-100/70 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200/30'
                                : 'bg-gray-100/70 text-gray-700 dark:bg-gray-700/40 dark:text-gray-300 border-gray-200/30'
                            }`}>
                              {director.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{director.position}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Experience: {director.experience}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle>Board Committees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Audit Committee', members: 3, chairman: 'Mr. E. S. Ranganathan', meetings: '4/year' },
                        { name: 'Nomination & Remuneration Committee', members: 3, chairman: 'Mr. Mohan Tiwari', meetings: '2/year' },
                        { name: 'Stakeholders Relationship Committee', members: 3, chairman: 'Dr. Rajan Dubey', meetings: '4/year' },
                        { name: 'Risk Management Committee', members: 4, chairman: 'Mr. Nawab Raza', meetings: '2/year' }
                      ].map((committee, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                          <div>
                            <p className="font-medium">{committee.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Chairman: {committee.chairman} | Members: {committee.members}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{committee.meetings}</p>
                            <p className="text-xs text-gray-500">Meetings</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Investor Contact</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle>For Investment Queries</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-lg">Mr. Saif Raza</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Managing Director</p>
                      <div className="space-y-2">
                        <p className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-primary" />
                          <a href="tel:+919907494252" className="hover:text-primary">+91 99074 94252</a>
                        </p>
                        <p className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-primary" />
                          <a href="mailto:saifraza@mspil.in" className="hover:text-primary">saifraza@mspil.in</a>
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="font-semibold">Investment Banking Partner</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Details to be announced</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle>Registered Office</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-semibold">Mahakaushal Sugar & Power Industries Ltd.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-start text-sm">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary shrink-0" />
                        Village Bachai, Tehsil Gadarwara,<br />
                        District Narsinghpur (M.P.) - 487001
                      </p>
                      <p className="flex items-center text-sm">
                        <Building className="w-4 h-4 mr-2 text-primary" />
                        CIN: U01543MP2005PLC017514
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className={`${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                <CardHeader>
                  <CardTitle>Investment Process</CardTitle>
                  <CardDescription>Simple 4-step process to become our valued investor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { step: 1, title: 'Initial Contact', desc: 'Reach out to our team', icon: Mail },
                      { step: 2, title: 'Due Diligence', desc: 'Review detailed information', icon: FileText },
                      { step: 3, title: 'Documentation', desc: 'Complete investment papers', icon: FileSpreadsheet },
                      { step: 4, title: 'Investment', desc: 'Transfer and confirmation', icon: CheckCircle }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <item.icon className="w-8 h-8 text-primary" />
                        </div>
                        <p className="font-semibold mb-1">Step {item.step}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default EnhancedInvestorRelationsPage;