import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cardBackgrounds } from '@/utils/backgroundStyles';
import { SubtleBackground } from '@/components/ui/SubtleBackground';
import { 
  ArrowUpRight
} from 'lucide-react';
import { 
  revenueData, 
  investmentData
} from '@/constants/financialData';

// Import charts directly (not lazy loaded for now to debug)
import {
  SugarProductionChart,
  EthanolProductionChart,
  PowerGenerationChart,
  DDGSProductionChart,
  OperationalEfficiencyChart,
  ProductMixChart,
  CapacityTrendsChart,
  EthanolMetricsCard,
  KPIMetricsCard
} from '@/components/charts/BusinessCharts';

import {
  RevenueGrowthChart,
  ProfitabilityChart,
  ReturnRatiosChart,
  DebtEquityChart,
  SegmentRevenueChart,
  FinancialSummaryCard
} from '@/components/charts/FinancialCharts';


const ComprehensiveDataInsightsSection = () => {
  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="insights" className="py-8 bg-transparent relative">
      {/* Subtle animated background */}
      <SubtleBackground type="both" colors={['rgba(59, 130, 246, 0.02)', 'rgba(6, 182, 212, 0.02)', 'rgba(139, 92, 246, 0.02)']} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeInProps} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Performance & Impact Metrics</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive insights into our operational excellence, financial performance, and growth trajectory
          </p>
        </motion.div>

        {/* Key Performance Indicators */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.1 }}>
          <KPIMetricsCard />
        </motion.div>

        {/* Business Operations Section */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.15 }}>
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Business Operations Dashboard</h3>
        </motion.div>

        {/* Sugar & Ethanol Production */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
            <SugarProductionChart />
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.3 }}>
            <EthanolProductionChart />
          </motion.div>
        </div>

        {/* Ethanol Business Metrics */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.35 }}>
          <Card className={`${cardBackgrounds.glass} shadow-2xl mb-12`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">Ethanol Business Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <EthanolMetricsCard />
            </CardContent>
          </Card>
        </motion.div>

        {/* Power & DDGS Production */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
            <PowerGenerationChart />
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.45 }}>
            <DDGSProductionChart />
          </motion.div>
        </div>

        {/* Financial Performance Section */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.5 }}>
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Financial Performance</h3>
        </motion.div>

        {/* Revenue & Profitability */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.55 }}>
            <RevenueGrowthChart />
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }}>
            <ProfitabilityChart />
          </motion.div>
        </div>

        {/* Revenue Mix & Return Ratios */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.65 }}>
            <SegmentRevenueChart />
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.7 }}>
            <ReturnRatiosChart />
          </motion.div>
        </div>

        {/* Operational Excellence Section */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.75 }}>
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Operational Excellence</h3>
        </motion.div>

        {/* Efficiency & Capacity */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.8 }}>
            <OperationalEfficiencyChart />
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.85 }}>
            <CapacityTrendsChart />
          </motion.div>
        </div>

        {/* Product Mix & Capital Structure */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.9 }}>
            <ProductMixChart />
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.95 }}>
            <DebtEquityChart />
          </motion.div>
        </div>

        {/* Investment Highlights */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 1.0 }}>
          <Card className={`${cardBackgrounds.glass} shadow-2xl`}>
            <CardHeader className="text-center">
              <ArrowUpRight className="w-10 h-10 mx-auto text-primary mb-2" />
              <CardTitle className="text-2xl font-bold text-white">Investment Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl">
                  <h4 className="font-semibold mb-2 text-lg text-white">Growth Story</h4>
                  <p className="text-3xl font-bold mb-2 text-primary">{revenueData.growthMultiple}</p>
                  <p className="text-sm text-gray-400">Revenue growth in 5 years</p>
                </div>
                <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl">
                  <h4 className="font-semibold mb-2 text-lg text-white">Valuation</h4>
                  <p className="text-3xl font-bold mb-2 text-primary">{investmentData.valuation.preIPO}</p>
                  <p className="text-sm text-gray-400">Pre-IPO opportunity</p>
                </div>
                <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl">
                  <h4 className="font-semibold mb-2 text-lg text-white">Exit Timeline</h4>
                  <p className="text-3xl font-bold mb-2 text-primary">{investmentData.exitTimeline}</p>
                  <p className="text-sm text-gray-400">Planned IPO listing</p>
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