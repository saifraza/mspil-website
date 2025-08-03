import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, BarChart3, DollarSign, Zap } from 'lucide-react';
import { financialData } from '@/constants/financialData';

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Revenue Growth Chart
export const WorkingRevenueChart = ({ data }) => (
  <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
    <h3 className="text-xl font-semibold text-white mb-4">Revenue Growth</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="revenue" fill="#22c55e" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Profitability Chart
export const WorkingProfitabilityChart = ({ data }) => (
  <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
    <h3 className="text-xl font-semibold text-white mb-4">Profitability Trends</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="ebitda" stroke="#22c55e" strokeWidth={3} dot={{ r: 6 }} name="EBITDA" />
        <Line type="monotone" dataKey="pat" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} name="PAT" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Return Ratios Chart
export const WorkingReturnRatiosChart = ({ data }) => (
  <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
    <h3 className="text-xl font-semibold text-white mb-4">Return Ratios</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="roe" stroke="#f59e0b" strokeWidth={3} dot={{ r: 6 }} name="ROE %" />
        <Line type="monotone" dataKey="roce" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} name="ROCE %" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Debt Equity Chart
export const WorkingDebtEquityChart = ({ data }) => (
  <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
    <h3 className="text-xl font-semibold text-white mb-4">Debt Equity Ratio</h3>
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="ratio" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// Segment Revenue Chart
export const WorkingSegmentRevenueChart = ({ data }) => {
  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">Revenue by Segment</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="revenue"
            label={({ segment, percentage }) => `${segment} (${percentage}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Shareholding Chart
export const WorkingShareholdingChart = ({ data, postIPO }) => {
  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">
        Shareholding Pattern {postIPO ? '(Post-IPO)' : '(Current)'}
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name} (${value}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Financial Summary Card
export const WorkingFinancialSummaryCard = ({ metrics }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {metrics.map((metric, index) => (
      <div key={index} className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-xl p-4">
        <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
        <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
        <p className="text-xs text-gray-500 mt-1">{metric.trend}</p>
      </div>
    ))}
  </div>
);

// Business-specific charts
export const WorkingSugarProductionChart = ({ data }) => (
  <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
    <h3 className="text-xl font-semibold text-white mb-4">Sugar Production & Revenue</h3>
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9CA3AF" />
        <YAxis yAxisId="left" stroke="#9CA3AF" />
        <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar yAxisId="left" dataKey="production" fill="#22c55e" name="Production (MT)" />
        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue (₹Cr)" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export const WorkingEthanolProductionChart = ({ data }) => (
  <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
    <h3 className="text-xl font-semibold text-white mb-4">Ethanol Production & Revenue</h3>
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9CA3AF" />
        <YAxis yAxisId="left" stroke="#9CA3AF" />
        <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar yAxisId="left" dataKey="production" fill="#3b82f6" name="Production (KL)" />
        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} name="Revenue (₹Cr)" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export const WorkingProductMixChart = ({ data }) => {
  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">Product Mix</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="percentage"
            label={({ name, percentage }) => `${name} (${percentage}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const WorkingKPIMetricsCard = ({ kpis }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {kpis.map((kpi, index) => (
      <div key={index} className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          {kpi.icon && <kpi.icon className="w-5 h-5 text-green-400" />}
          <p className="text-sm text-gray-400">{kpi.label}</p>
        </div>
        <p className="text-2xl font-bold text-white">{kpi.value}</p>
        {kpi.change && (
          <p className={`text-xs mt-1 ${kpi.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {kpi.change > 0 ? '+' : ''}{kpi.change}%
          </p>
        )}
      </div>
    ))}
  </div>
);

// Export original chart components
export const SugarProductionChart = () => {
  const data = [
    { year: 'FY21', production: 65000, recovery: 10.2, revenue: 195 },
    { year: 'FY22', production: 72000, recovery: 10.5, revenue: 230 },
    { year: 'FY23', production: 78000, recovery: 10.8, revenue: 265 },
    { year: 'FY24', production: 85000, recovery: 11.0, revenue: 291 },
    { year: 'FY25', production: 88000, recovery: 11.0, revenue: 300 }
  ];

  return <WorkingSugarProductionChart data={data} />;
};

export const EthanolProductionChart = () => {
  const data = financialData.ethanol.production.map(item => ({
    year: item.year,
    production: item.production,
    revenue: item.revenue,
    efficiency: item.production > 0 ? Math.round((item.production / 123) * 100) : 0
  }));

  return <WorkingEthanolProductionChart data={data} />;
};

export const ProductMixChart = () => {
  // Get the latest year's segment data
  const segmentData = financialData.segments.revenue[financialData.segments.revenue.length - 1];
  
  if (!segmentData) {
    return <WorkingProductMixChart data={[]} />;
  }
  
  // Calculate total revenue and create data array
  const totalRevenue = segmentData.sugar + segmentData.ethanol + segmentData.ddgs + segmentData.power;
  
  const data = [
    {
      name: 'Sugar',
      percentage: Math.round((segmentData.sugar / totalRevenue) * 100),
      value: segmentData.sugar
    },
    {
      name: 'Ethanol',
      percentage: Math.round((segmentData.ethanol / totalRevenue) * 100),
      value: segmentData.ethanol
    },
    {
      name: 'DDGS',
      percentage: Math.round((segmentData.ddgs / totalRevenue) * 100),
      value: segmentData.ddgs
    },
    {
      name: 'Power',
      percentage: Math.round((segmentData.power / totalRevenue) * 100),
      value: segmentData.power
    }
  ];

  return <WorkingProductMixChart data={data} />;
};

export const BusinessKPIsCard = () => {
  const kpis = [
    {
      label: 'Sugar Capacity',
      value: '8000 TCD',
      icon: BarChart3,
      change: 14
    },
    {
      label: 'Ethanol Capacity',
      value: '350 KLPD',
      icon: Zap,
      change: 25
    },
    {
      label: 'Power Generation',
      value: '24 MW',
      icon: DollarSign,
      change: 9
    },
    {
      label: 'Revenue FY24',
      value: '₹618 Cr',
      icon: TrendingUp,
      change: 12
    },
    {
      label: 'EBITDA Margin',
      value: '18.5%',
      icon: BarChart3,
      change: 5
    },
    {
      label: 'Employees',
      value: '1,250+',
      icon: TrendingUp,
      change: 8
    }
  ];

  return <WorkingKPIMetricsCard kpis={kpis} />;
};

// Add missing exports
export const KPIMetricsCard = BusinessKPIsCard;

export const PowerGenerationChart = () => {
  const data = [
    { year: 'FY21', generation: 120, export: 90, revenue: 45 },
    { year: 'FY22', generation: 135, export: 105, revenue: 55 },
    { year: 'FY23', generation: 145, export: 115, revenue: 62 },
    { year: 'FY24', generation: 156, export: 126, revenue: 70 },
    { year: 'FY25', generation: 165, export: 135, revenue: 75 }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">Power Generation & Revenue</h3>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" stroke="#9CA3AF" />
          <YAxis yAxisId="left" stroke="#9CA3AF" />
          <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="generation" fill="#ef4444" name="Generation (MW)" />
          <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} name="Revenue (₹Cr)" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DDGSProductionChart = () => {
  const data = [
    { year: 'FY21', production: 18000, revenue: 25 },
    { year: 'FY22', production: 22000, revenue: 32 },
    { year: 'FY23', production: 26000, revenue: 40 },
    { year: 'FY24', production: 30000, revenue: 48 },
    { year: 'FY25', production: 32000, revenue: 52 }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">DDGS Production & Revenue</h3>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" stroke="#9CA3AF" />
          <YAxis yAxisId="left" stroke="#9CA3AF" />
          <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="production" fill="#8b5cf6" name="Production (MT)" />
          <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} name="Revenue (₹Cr)" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export const OperationalEfficiencyChart = () => {
  // Data showing achievement percentage towards target
  const data = [
    { 
      metric: 'Sugar (Steam)', 
      achieved: 70.3, // 26/37 * 100 = 70.3% achieved (target is lower)
      target: 100,
      currentLabel: '37%',
      targetLabel: '26%',
      info: 'Lower is better'
    },
    { 
      metric: 'Ethanol (Yield)', 
      achieved: 97.5, // 390/400 * 100 = 97.5% achieved
      target: 100,
      currentLabel: '390 L/ton',
      targetLabel: '400 L/ton',
      info: 'Higher is better'
    },
    { 
      metric: 'Power', 
      achieved: 64.3, // 9/14 * 100 = 64.3% achieved
      target: 100,
      currentLabel: '9 MW',
      targetLabel: '14 MW',
      info: 'Higher is better'
    },
    { 
      metric: 'DDGS (Aflatoxin)', 
      achieved: 20, // 20/100 * 100 = 20% achieved (target is lower)
      target: 100,
      currentLabel: '100 ppb',
      targetLabel: '20 ppb',
      info: 'Lower is better'
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-2">Operational Efficiency (5 Year Target)</h3>
      
      {/* Value labels above chart */}
      <div className="mb-4">
        <div className="grid grid-cols-4 gap-4 text-center">
          {data.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <div className="text-green-400 font-bold text-sm">{item.currentLabel}</div>
              <div className="text-gray-500 text-xs">↓</div>
              <div className="text-yellow-400 font-bold text-sm">{item.targetLabel}</div>
            </div>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 40, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="metric" 
            stroke="#9CA3AF" 
            angle={-35} 
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 11 }}
          />
          <YAxis 
            stroke="#9CA3AF" 
            domain={[0, 120]}
            ticks={[0, 20, 40, 60, 80, 100, 120]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = data.find(d => d.metric === label);
                return (
                  <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
                    <p className="text-white font-semibold mb-1">{label}</p>
                    <p className="text-green-400 text-sm">Current: {item.currentLabel}</p>
                    <p className="text-yellow-400 text-sm">Target: {item.targetLabel}</p>
                    <p className="text-blue-400 text-sm">Achievement: {item.achieved.toFixed(1)}%</p>
                    <p className="text-gray-400 text-xs mt-1">{item.info}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar 
            dataKey="achieved" 
            fill="#22c55e" 
            name="Achievement %" 
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            dataKey="target" 
            fill="#f59e0b" 
            name="Target (100%)" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CapacityTrendsChart = () => {
  const data = [
    { year: 'FY21', sugar: 7000, ethanol: 250, power: 20 },
    { year: 'FY22', sugar: 7500, ethanol: 280, power: 22 },
    { year: 'FY23', sugar: 8000, ethanol: 320, power: 24 },
    { year: 'FY24', sugar: 8000, ethanol: 350, power: 24 },
    { year: 'FY25', sugar: 8500, ethanol: 400, power: 26 }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">Capacity Growth Trends</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="sugar" stroke="#22c55e" strokeWidth={3} name="Sugar (TCD)" />
          <Line type="monotone" dataKey="ethanol" stroke="#3b82f6" strokeWidth={3} name="Ethanol (KLPD)" />
          <Line type="monotone" dataKey="power" stroke="#ef4444" strokeWidth={3} name="Power (MW)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const EthanolMetricsCard = () => {
  const metrics = [
    {
      label: 'Daily Production',
      value: '320 KL',
      trend: '+12%',
      color: 'text-blue-400'
    },
    {
      label: 'Annual Capacity',
      value: '117M Liters',
      trend: '+25%',
      color: 'text-green-400'
    },
    {
      label: 'Efficiency',
      value: '92%',
      trend: '+3%',
      color: 'text-purple-400'
    },
    {
      label: 'Revenue Share',
      value: '35%',
      trend: '+5%',
      color: 'text-orange-400'
    }
  ];

  return <WorkingFinancialSummaryCard metrics={metrics} />;
};