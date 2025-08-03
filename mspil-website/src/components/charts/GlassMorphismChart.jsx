import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from 'recharts';
import { TrendingUp, BarChart3, Activity, PieChartIcon, DollarSign, Percent } from 'lucide-react';
import { cardBackgrounds } from '@/utils/backgroundStyles';

// Glass morphism tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-lg p-3 shadow-2xl">
        <p className="text-sm font-semibold text-white mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Chart container with glass morphism
const ChartContainer = ({ children, title, subtitle, icon: Icon, height = 300 }) => {
  return (
    <div className={`${cardBackgrounds.glass} rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-pulse opacity-30" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              {Icon && <Icon className="w-5 h-5 text-primary" />}
              {title}
            </h3>
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
        </div>
        
        {/* Chart */}
        <div style={{ height }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Enhanced Line Chart with glass morphism
export const GlassLineChart = ({ 
  data, 
  lines = [], 
  title, 
  subtitle, 
  icon, 
  height = 300,
  gradient = true 
}) => {
  const gradientColors = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
  
  return (
    <ChartContainer title={title} subtitle={subtitle} icon={icon} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            {gradient && lines.map((line, index) => (
              <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={line.color || gradientColors[index]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={line.color || gradientColors[index]} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="year" 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
            formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>}
          />
          
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name}
              stroke={line.color || gradientColors[index]}
              strokeWidth={3}
              dot={{ fill: line.color || gradientColors[index], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Enhanced Area Chart with glass morphism
export const GlassAreaChart = ({ 
  data, 
  areas = [], 
  title, 
  subtitle, 
  icon, 
  height = 300,
  stacked = false 
}) => {
  const gradientColors = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
  
  return (
    <ChartContainer title={title} subtitle={subtitle} icon={icon} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            {areas.map((area, index) => (
              <linearGradient key={`gradient-${index}`} id={`areaGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={area.color || gradientColors[index]} stopOpacity={0.6}/>
                <stop offset="95%" stopColor={area.color || gradientColors[index]} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="year" 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>}
          />
          
          {areas.map((area, index) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name}
              stackId={stacked ? "1" : undefined}
              stroke={area.color || gradientColors[index]}
              fill={`url(#areaGradient-${index})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Enhanced Bar Chart with glass morphism
export const GlassBarChart = ({ 
  data, 
  bars = [], 
  title, 
  subtitle, 
  icon, 
  height = 300,
  stacked = false,
  horizontal = false 
}) => {
  const gradientColors = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
  
  return (
    <ChartContainer title={title} subtitle={subtitle} icon={icon} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout={horizontal ? 'horizontal' : 'vertical'}
        >
          <defs>
            {bars.map((bar, index) => (
              <linearGradient key={`barGradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={bar.color || gradientColors[index]} stopOpacity={0.9}/>
                <stop offset="95%" stopColor={bar.color || gradientColors[index]} stopOpacity={0.6}/>
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            type={horizontal ? 'number' : 'category'}
            dataKey={horizontal ? undefined : 'year'} 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            type={horizontal ? 'category' : 'number'}
            dataKey={horizontal ? 'year' : undefined}
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>}
          />
          
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name}
              stackId={stacked ? "1" : undefined}
              fill={`url(#barGradient-${index})`}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Enhanced Composed Chart (Line + Bar)
export const GlassComposedChart = ({ 
  data, 
  bars = [], 
  lines = [],
  title, 
  subtitle, 
  icon, 
  height = 300 
}) => {
  const barColors = ['#22c55e', '#3b82f6'];
  const lineColors = ['#f59e0b', '#ef4444'];
  
  return (
    <ChartContainer title={title} subtitle={subtitle} icon={icon} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            {bars.map((bar, index) => (
              <linearGradient key={`barGradient-${index}`} id={`composedBarGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={bar.color || barColors[index]} stopOpacity={0.9}/>
                <stop offset="95%" stopColor={bar.color || barColors[index]} stopOpacity={0.6}/>
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="year" 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            yAxisId="left"
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>}
          />
          
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              yAxisId="left"
              dataKey={bar.dataKey}
              name={bar.name}
              fill={`url(#composedBarGradient-${index})`}
              radius={[8, 8, 0, 0]}
            />
          ))}
          
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              yAxisId="right"
              type="monotone"
              dataKey={line.dataKey}
              name={line.name}
              stroke={line.color || lineColors[index]}
              strokeWidth={3}
              dot={{ fill: line.color || lineColors[index], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Enhanced Pie Chart with glass morphism
export const GlassPieChart = ({ 
  data, 
  title, 
  subtitle, 
  icon, 
  height = 300,
  innerRadius = 0,
  showLabel = true 
}) => {
  const COLORS = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];
  
  const renderLabel = (entry) => {
    if (!showLabel) return null;
    return `${entry.name}: ${entry.value}%`;
  };
  
  return (
    <ChartContainer title={title} subtitle={subtitle} icon={icon} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Enhanced Radial Bar Chart
export const GlassRadialChart = ({ 
  data, 
  title, 
  subtitle, 
  icon, 
  height = 300 
}) => {
  const COLORS = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b'];
  
  return (
    <ChartContainer title={title} subtitle={subtitle} icon={icon} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </RadialBar>
          <Legend 
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ paddingLeft: '20px' }}
            formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

