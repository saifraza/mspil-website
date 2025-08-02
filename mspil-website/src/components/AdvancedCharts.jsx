import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, TrendingUp, TrendingDown, Maximize2, Download, Filter, BarChart3, LineChart, PieChart, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Enhanced animated tooltip
const AnimatedTooltip = ({ active, payload, label, customLabel }) => {
  if (!active || !payload || !payload.length) return null;

  const total = payload.reduce((sum, entry) => sum + entry.value, 0);
  const trend = payload[0]?.payload?.trend || 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 min-w-[200px]"
    >
      <p className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">
        {customLabel || label}
      </p>
      
      {payload.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center justify-between gap-4 mb-2"
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium">{entry.name}:</span>
          </div>
          <span className="font-bold text-sm">{entry.value.toLocaleString()}</span>
        </motion.div>
      ))}
      
      {payload.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-semibold">Total: {total.toLocaleString()}</p>
        </motion.div>
      )}
      
      {trend !== 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 flex items-center gap-1"
        >
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(trend)}% vs last period
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

// Advanced Line Chart with animations
const AdvancedLineChart = lazy(async () => {
  const recharts = await import('recharts');
  return {
    default: ({ data, dataKeys, colors, names, showGrid = true, showAnimation = true, curved = true }) => {
      const [animationComplete, setAnimationComplete] = useState(false);

      useEffect(() => {
        if (showAnimation) {
          const timer = setTimeout(() => setAnimationComplete(true), 1500);
          return () => clearTimeout(timer);
        } else {
          setAnimationComplete(true);
        }
      }, [showAnimation]);

      return (
        <recharts.ResponsiveContainer width="100%" height={400}>
          <recharts.LineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              {dataKeys.map((key, index) => (
                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[index]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[index]} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            
            {showGrid && (
              <recharts.CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                opacity={0.5}
                vertical={false}
              />
            )}
            
            <recharts.XAxis 
              dataKey="year" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            
            <recharts.YAxis 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            
            <recharts.Tooltip 
              content={<AnimatedTooltip />}
              cursor={{ stroke: 'rgba(107, 114, 128, 0.1)', strokeWidth: 2 }}
              animationDuration={300}
              animationEasing="ease-out"
            />
            
            <recharts.Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            
            {dataKeys.map((key, index) => (
              <React.Fragment key={key}>
                <recharts.Line
                  type={curved ? "monotone" : "linear"}
                  dataKey={key}
                  stroke={colors[index]}
                  strokeWidth={3}
                  name={names[index]}
                  dot={{ fill: colors[index], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: colors[index] }}
                  animationDuration={showAnimation ? 1500 : 0}
                  animationBegin={index * 200}
                />
                {animationComplete && (
                  <recharts.Area
                    type={curved ? "monotone" : "linear"}
                    dataKey={key}
                    stroke="none"
                    fill={colors[index]}
                    fillOpacity={0.1}
                    animationDuration={500}
                    animationBegin={1500 + index * 100}
                  />
                )}
              </React.Fragment>
            ))}
          </recharts.LineChart>
        </recharts.ResponsiveContainer>
      );
    }
  };
});

// Advanced Bar Chart with animations
const AdvancedBarChart = lazy(async () => {
  const recharts = await import('recharts');
  return {
    default: ({ data, dataKeys, colors, names, stacked = false, showAnimation = true }) => {
      return (
        <recharts.ResponsiveContainer width="100%" height={400}>
          <recharts.BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              {dataKeys.map((key, index) => (
                <linearGradient key={key} id={`bar-gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors[index]} stopOpacity={1}/>
                  <stop offset="100%" stopColor={colors[index]} stopOpacity={0.7}/>
                </linearGradient>
              ))}
            </defs>
            
            <recharts.CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              opacity={0.5}
              vertical={false}
            />
            
            <recharts.XAxis 
              dataKey="year"
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            
            <recharts.YAxis 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            
            <recharts.Tooltip 
              content={<AnimatedTooltip />}
              cursor={{ fill: 'rgba(107, 114, 128, 0.05)' }}
            />
            
            <recharts.Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />
            
            {dataKeys.map((key, index) => (
              <recharts.Bar
                key={key}
                dataKey={key}
                fill={colors[index]}
                name={names[index]}
                stackId={stacked ? "stack" : undefined}
                animationDuration={showAnimation ? 1000 : 0}
                animationBegin={index * 200}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </recharts.BarChart>
        </recharts.ResponsiveContainer>
      );
    }
  };
});

// Chart wrapper component with controls
export const AdvancedChartCard = ({
  title,
  description,
  data,
  dataKeys,
  colors,
  names,
  defaultChartType = 'line',
  showControls = true,
  className = ''
}) => {
  const [chartType, setChartType] = useState(defaultChartType);
  const [timeRange, setTimeRange] = useState('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  // Filter data based on time range
  const filteredData = React.useMemo(() => {
    if (timeRange === 'all') return data;
    
    const currentYear = new Date().getFullYear();
    const years = {
      '1y': 1,
      '3y': 3,
      '5y': 5
    };
    
    const cutoffYear = currentYear - years[timeRange];
    return data.filter(item => {
      const year = parseInt(item.year.split('-')[0]);
      return year >= cutoffYear;
    });
  }, [data, timeRange]);

  const exportChart = () => {
    // Implement chart export functionality
    console.log('Exporting chart...');
  };

  return (
    <motion.div
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-8' : ''} ${className}`}
      layout
    >
      <Card className="h-full">
        <CardHeader className="space-y-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              {description && (
                <CardDescription className="text-muted-foreground">
                  {description}
                </CardDescription>
              )}
            </div>
            
            {showControls && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="h-8 w-8"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={exportChart}
                  className="h-8 w-8"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {showControls && (
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Tabs value={chartType} onValueChange={setChartType}>
                <TabsList>
                  <TabsTrigger value="line" className="gap-2">
                    <LineChart className="h-4 w-4" />
                    Line
                  </TabsTrigger>
                  <TabsTrigger value="bar" className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Bar
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="5y">5 Years</SelectItem>
                  <SelectItem value="3y">3 Years</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={chartType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<ChartLoader />}>
                {chartType === 'line' ? (
                  <AdvancedLineChart
                    data={filteredData}
                    dataKeys={dataKeys}
                    colors={colors}
                    names={names}
                    showAnimation={showAnimation}
                  />
                ) : (
                  <AdvancedBarChart
                    data={filteredData}
                    dataKeys={dataKeys}
                    colors={colors}
                    names={names}
                    showAnimation={showAnimation}
                  />
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
          
          {/* Chart insights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-muted/30 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Key Insights</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {filteredData.length} data points
              </Badge>
              <Badge variant="outline">
                Updated in real-time
              </Badge>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ChartLoader = () => (
  <div className="flex items-center justify-center h-[400px]">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center space-y-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="h-10 w-10 text-primary" />
      </motion.div>
      <p className="text-sm text-muted-foreground font-medium">Loading visualization...</p>
    </motion.div>
  </div>
);

export default AdvancedChartCard;