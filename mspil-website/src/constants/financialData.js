// Centralized financial and business metrics data
// This file serves as a single source of truth for all financial data
// Used by both DataInsightsPage and InvestorRelationsPage

export const financialData = {
  // Revenue and Growth Data
  revenue: {
    projections: [
      { year: 'FY25', turnover: 300, label: '₹300 Cr' },
      { year: 'FY26', turnover: 811.08, label: '₹811 Cr' },
      { year: 'FY27', turnover: 1310.56, label: '₹1,311 Cr' },
      { year: 'FY28', turnover: 1378.40, label: '₹1,378 Cr' },
      { year: 'FY29', turnover: 1462.27, label: '₹1,462 Cr' },
      { year: 'FY30', turnover: 1564.91, label: '₹1,565 Cr' }
    ],
    cagr: '39.1%',
    growthMultiple: '5.2x'
  },

  // Ethanol Production Data
  ethanol: {
    production: [
      { year: 'FY25', production: 0, revenue: 0 },
      { year: 'FY26', production: 30, revenue: 215.58 },
      { year: 'FY27', production: 123, revenue: 883.74 },
      { year: 'FY28', production: 123, revenue: 883.74 },
      { year: 'FY29', production: 123, revenue: 883.74 },
      { year: 'FY30', production: 123, revenue: 924.61 }
    ],
    capacity: {
      daily: '410 KLPD',
      annual: '12.3 Cr L',
      annualMillionLiters: 123
    },
    metrics: {
      rawMaterial: '900 TPD',
      conversionRate: '407 L/MT',
      operationDays: '300 Days',
      utilization: '82%'
    }
  },

  // Profitability Data
  profitability: {
    margins: [
      { year: 'FY26', ebitda: 171.82, pat: 76.45, ebitdaMargin: 21.2, patMargin: 9.4 },
      { year: 'FY27', ebitda: 296.13, pat: 170.13, ebitdaMargin: 22.6, patMargin: 13.0 },
      { year: 'FY28', ebitda: 372.92, pat: 246.99, ebitdaMargin: 27.1, patMargin: 17.9 },
      { year: 'FY29', ebitda: 406.12, pat: 276.34, ebitdaMargin: 27.8, patMargin: 18.9 },
      { year: 'FY30', ebitda: 434.30, pat: 301.45, ebitdaMargin: 27.8, patMargin: 19.3 }
    ],
    peakEbitdaMargin: '27.8%'
  },

  // Return Ratios
  returns: {
    ratios: [
      { year: 'FY26', roe: 27.0, roce: 15.5 },
      { year: 'FY27', roe: 38.5, roce: 41.2 },
      { year: 'FY28', roe: 46.0, roce: 49.0 },
      { year: 'FY29', roe: 37.9, roce: 42.5 },
      { year: 'FY30', roe: 30.9, roce: 37.2 }
    ],
    peakROCE: '49.0%',
    peakROE: '46.0%'
  },

  // Segment Revenue Data
  segments: {
    revenue: [
      { year: 'FY26', sugar: 407.48, ethanol: 215.58, ddgs: 41.46, power: 146.56 },
      { year: 'FY27', sugar: 261.59, ethanol: 883.74, ddgs: 169.95, power: 54.34 },
      { year: 'FY28', sugar: 274.67, ethanol: 883.74, ddgs: 169.95, power: 54.34 },
      { year: 'FY29', sugar: 291.19, ethanol: 883.74, ddgs: 169.95, power: 54.34 },
      { year: 'FY30', sugar: 408.02, ethanol: 924.61, ddgs: 177.94, power: 54.34 }
    ]
  },

  // Debt and Capital Structure
  capitalStructure: {
    debtEquity: [
      { year: 'FY26', debt: 310, equity: 283, debtEquityRatio: 1.10 },
      { year: 'FY27', debt: 235, equity: 441, debtEquityRatio: 0.53 },
      { year: 'FY28', debt: 144, equity: 536, debtEquityRatio: 0.27 },
      { year: 'FY29', debt: 90, equity: 729, debtEquityRatio: 0.12 },
      { year: 'FY30', debt: 45, equity: 975, debtEquityRatio: 0.05 }
    ],
    debtReduction: { from: 310, to: 45, percentage: '85%' }
  },

  // Operational Efficiency
  efficiency: {
    metrics: [
      { metric: 'Sugar Recovery', value: 11, industry: 10, unit: '%' },
      { metric: 'Ethanol Yield', value: 407, industry: 380, unit: 'L/MT' },
      { metric: 'Plant Utilization', value: 85, industry: 75, unit: '%' },
      { metric: 'Power Efficiency', value: 92, industry: 85, unit: '%' }
    ]
  },

  // Capacity Data
  capacity: {
    current: [
      { segment: 'Sugar Mill', capacity: 8000, utilization: 85, unit: 'TCD' },
      { segment: 'Ethanol Plant', capacity: 410, utilization: 82, unit: 'KLPD' },
      { segment: 'Power Plant', capacity: 9.66, utilization: 90, unit: 'MW' },
      { segment: 'DDGS', capacity: 300, utilization: 80, unit: 'TPD' }
    ]
  },

  // Shareholding Pattern
  shareholding: {
    current: {
      date: 'March 31, 2024',
      distribution: [
        { category: 'Promoters & Promoter Group', percentage: 95, shares: 7.125, value: 'Cr' },
        { category: 'Strategic Investors', percentage: 2, shares: 0.15, value: 'Cr' },
        { category: 'Financial Investors', percentage: 3, shares: 0.225, value: 'Cr' }
      ],
      totalShares: 7.5, // in Crores
      shareValue: 'Cr'
    },
    postIPO: {
      distribution: [
        { category: 'Promoters & Promoter Group', percentage: 73, shares: 7.125, value: 'Cr' },
        { category: 'Strategic Investors', percentage: 1.54, shares: 0.15, value: 'Cr' },
        { category: 'Financial Investors', percentage: 2.31, shares: 0.225, value: 'Cr' },
        { category: 'Public', percentage: 23.15, shares: 2.26, value: 'Cr' }
      ],
      totalShares: 9.76, // in Crores
      newSharesIssued: 2.26, // in Crores
      shareValue: 'Cr'
    },
    stockInfo: {
      bseCode: 'XXXXXX',
      nseSymbol: 'MSPIL',
      isin: 'INE123456789'
    }
  },

  // Investment Highlights
  investment: {
    valuation: {
      preIPO: '₹820 Cr',
      currentMarketCap: '₹615 Cr', // 7.5 Cr shares @ ₹82/share
      postIPOEstimate: '₹1,600 Cr'
    },
    minimumInvestment: '₹10 Crores',
    instrumentType: 'Equity Shares',
    lockInPeriod: '6 months post-IPO',
    boardRepresentation: 'Observer rights',
    exitTimeline: '15 Months',
    exitStrategy: 'IPO'
  },

  // Key Performance Indicators
  kpis: {
    revenueCagr: { value: '39.1%', period: '5 Years', trend: '+5.2x' },
    peakROCE: { value: '49.0%', year: 'FY28', trend: '+33.5pp' },
    ebitdaMargin: { value: '27.8%', year: 'FY30', trend: '+6.6pp' },
    sugarRecovery: { value: '11%', benchmark: '10%', trend: '+10%' }
  }
};

// Export individual sections for easier imports
export const {
  revenue: revenueData,
  ethanol: ethanolData,
  profitability: profitabilityData,
  returns: returnsData,
  segments: segmentsData,
  capitalStructure: capitalData,
  efficiency: efficiencyData,
  capacity: capacityData,
  shareholding: shareholdingData,
  investment: investmentData,
  kpis: kpiData
} = financialData;