import React from 'react';
import { financialData } from '@/constants/financialData';
import {
  WorkingRevenueChart,
  WorkingProfitabilityChart,
  WorkingReturnRatiosChart,
  WorkingDebtEquityChart,
  WorkingSegmentRevenueChart,
  WorkingShareholdingChart,
  WorkingFinancialSummaryCard
} from './BusinessCharts';

// Revenue Growth Chart
export const RevenueGrowthChart = () => {
  const data = financialData.revenue.projections.map(item => ({
    year: item.year,
    revenue: item.turnover,
    label: item.label
  }));

  return <WorkingRevenueChart data={data} />;
};

// Profitability Chart (EBITDA & PAT)
export const ProfitabilityChart = () => {
  const data = financialData.profitability.margins;
  return <WorkingProfitabilityChart data={data} />;
};

// Return Ratios Chart (ROE & ROCE)
export const ReturnRatiosChart = () => {
  const data = financialData.returns.ratios;
  return <WorkingReturnRatiosChart data={data} />;
};

// Debt Equity Chart
export const DebtEquityChart = () => {
  const data = financialData.capitalStructure.debtEquity.map(item => ({
    ...item,
    ratio: item.debtEquityRatio
  }));
  return <WorkingDebtEquityChart data={data} />;
};

// Shareholding Pattern Pie Chart
export const ShareholdingChart = ({ postIPO = false }) => {
  const shareholdingData = postIPO 
    ? financialData.shareholding.postIPO 
    : financialData.shareholding.current;
    
  const data = shareholdingData.distribution.map(item => ({
    name: item.category,
    value: item.percentage
  }));

  return <WorkingShareholdingChart data={data} postIPO={postIPO} />;
};

// Segment Revenue Mix Chart
export const SegmentRevenueChart = () => {
  // Get the latest year's data
  const latestData = financialData.segments.revenue[financialData.segments.revenue.length - 1];
  
  if (!latestData) {
    return <WorkingSegmentRevenueChart data={[]} />;
  }
  
  // Transform the data to the expected format
  const totalRevenue = latestData.sugar + latestData.ethanol + latestData.ddgs + latestData.power;
  const data = [
    {
      segment: 'Sugar',
      revenue: latestData.sugar,
      percentage: Math.round((latestData.sugar / totalRevenue) * 100)
    },
    {
      segment: 'Ethanol',
      revenue: latestData.ethanol,
      percentage: Math.round((latestData.ethanol / totalRevenue) * 100)
    },
    {
      segment: 'DDGS',
      revenue: latestData.ddgs,
      percentage: Math.round((latestData.ddgs / totalRevenue) * 100)
    },
    {
      segment: 'Power',
      revenue: latestData.power,
      percentage: Math.round((latestData.power / totalRevenue) * 100)
    }
  ];
  
  return <WorkingSegmentRevenueChart data={data} />;
};

// Capacity Utilization Chart
export const CapacityUtilizationChart = () => {
  const data = financialData.capacity.current;

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">Plant Capacity Utilization</h3>
      <p className="text-sm text-gray-400 mb-6">Operating efficiency across business segments</p>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-white">{item.segment}</span>
              <span className="text-sm text-gray-400">{item.capacity} {item.unit}</span>
            </div>
            <div className="relative h-8 bg-gray-700/50 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                style={{width: `${item.utilization}%`}}
              >
                <span className="text-xs font-semibold text-white">
                  {item.utilization}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Financial Summary Card
export const FinancialSummaryCard = () => {
  const metrics = [
    {
      label: 'Revenue CAGR',
      value: financialData.kpis.revenueCagr.value,
      trend: financialData.kpis.revenueCagr.trend,
      color: 'text-green-400'
    },
    {
      label: 'Peak ROCE',
      value: financialData.kpis.peakROCE.value,
      trend: financialData.kpis.peakROCE.trend,
      color: 'text-blue-400'
    },
    {
      label: 'EBITDA Margin',
      value: financialData.kpis.ebitdaMargin.value,
      trend: financialData.kpis.ebitdaMargin.trend,
      color: 'text-purple-400'
    },
    {
      label: 'Pre-IPO Valuation',
      value: financialData.investment.valuation.preIPO,
      trend: 'Closed',
      color: 'text-orange-400'
    }
  ];

  return <WorkingFinancialSummaryCard metrics={metrics} />;
};