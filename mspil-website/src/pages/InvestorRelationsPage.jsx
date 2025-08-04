import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  BarChart3,
  DollarSign,
  Activity,
  Percent,
  Scale,
  Calendar,
  FileCheck
} from 'lucide-react';
import { shareholdingData, investmentData } from '@/constants/financialData';
import { pageBackgrounds, cardBackgrounds } from '@/utils/backgroundStyles';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { fetchDocuments } from '@/services/documentService';

// Import all charts from centralized index
import {
  RevenueGrowthChart,
  ProfitabilityChart,
  ReturnRatiosChart,
  DebtEquityChart,
  ShareholdingChart,
  SegmentRevenueChart,
  CapacityUtilizationChart,
  SugarProductionChart,
  EthanolProductionChart,
  PowerGenerationChart,
  DDGSProductionChart,
  OperationalEfficiencyChart,
  ProductMixChart,
  CapacityTrendsChart,
  EthanolMetricsCard
} from '@/components/charts';

// Chart skeleton loader for performance
const ChartSkeleton = ({ height = 250 }) => (
  <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl animate-pulse">
    <div className="h-6 w-48 mb-4 bg-gray-700/50 rounded"></div>
    <div className="w-full bg-gray-700/30 rounded" style={{ height: `${height}px` }}></div>
  </div>
);

const InvestorRelationsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [activeTab, setActiveTab] = useState('overview');
  const [isChartsLoaded, setIsChartsLoaded] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);
  const tabsSectionRef = useRef(null);

  // Load charts progressively after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChartsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Load documents data from Railway
  useEffect(() => {
    fetchDocuments()
      .then(data => setDocumentsData(data))
      .catch(err => {
        console.error('Error loading documents:', err);
        // Fallback to local documents
        fetch('/data/documents.json')
          .then(res => res.json())
          .then(data => setDocumentsData(data))
          .catch(fallbackErr => console.error('Fallback also failed:', fallbackErr));
      });
  }, []);

  // Handle hash navigation from location
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Map hash values to tab values
      const tabMap = {
        'overview': 'overview',
        'pre-ipo': 'pre-ipo',
        'financial-performance': 'financial-performance',
        'business-operations': 'business-operations',
        'shareholding': 'shareholding',
        'reports': 'reports',
        'governance': 'governance',
        // Legacy mappings for compatibility
        'annual-reports': 'reports',
        'financial-results': 'reports'
      };
      
      const tabValue = tabMap[hash] || 'overview';
      setActiveTab(tabValue);
      
      // Scroll to tabs section after a small delay
      setTimeout(() => {
        if (tabsSectionRef.current) {
          const yOffset = -100;
          const y = tabsSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  // Handle tab change with smooth scroll
  const handleTabChange = (value) => {
    setActiveTab(value);
    
    // Update URL hash
    window.history.pushState(null, '', `#${value}`);
    
    // Use requestAnimationFrame to wait for next paint
    requestAnimationFrame(() => {
      // Double rAF to ensure content is painted
      requestAnimationFrame(() => {
        // Additional small delay for chart rendering
        setTimeout(() => {
          const tabsContainer = tabsSectionRef.current;
          if (tabsContainer) {
            // Get the position of the tabs section
            const tabsRect = tabsContainer.getBoundingClientRect();
            // Calculate scroll position to show tabs near top with content visible
            const scrollTop = window.pageYOffset + tabsRect.top - 80; // 80px offset for header
            
            // Smooth scroll to position
            window.scrollTo({
              top: Math.max(0, scrollTop),
              behavior: 'smooth'
            });
          }
        }, 150); // Small delay for charts to initialize
      });
    });
  };

  // Handler for document downloads
  const handleDocumentDownload = (url, filename) => {
    // Create a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  // Mock data for financial results
  const financialResults = {
    '2024': {
      quarterly: [
        { quarter: 'Q3 FY24', date: 'January 15, 2024', status: 'Published' },
        { quarter: 'Q2 FY24', date: 'October 18, 2023', status: 'Published' },
        { quarter: 'Q1 FY24', date: 'July 20, 2023', status: 'Published' }
      ],
      annual: { year: 'FY 2023-24', date: 'May 30, 2024', status: 'Published' }
    }
  };

  // Investor contact details
  const investorContacts = {
    complianceOfficer: {
      name: 'Company Secretary',
      designation: 'Compliance Officer',
      phone: '+91 98915 46422',
      email: 'cs@mspil.in'
    },
    registrar: {
      name: 'Link Intime India Pvt. Ltd.',
      address: 'C-101, 247 Park, L.B.S. Marg, Vikhroli (West), Mumbai - 400083',
      phone: '+91 22 4918 6000',
      email: 'rnt.helpdesk@linkintime.co.in'
    }
  };

  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      {/* Hero Section - Minimal and Clean */}
      <section className="relative pt-28 pb-4 md:pt-24 md:pb-8 bg-gradient-to-b from-gray-900/50 to-transparent backdrop-blur-xl w-full">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
              Investor Relations
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              Transparency, compliance, and sustainable value creation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section ref={tabsSectionRef} className="py-2 sm:py-4 md:py-8 w-full">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4 sm:space-y-6">
            {/* Desktop & Tablet: Centered tabs */}
            <div className="hidden sm:flex justify-center mb-6">
              <TabsList className="flex gap-1 bg-gray-900/60 backdrop-blur-md p-1 rounded-lg border border-gray-700/50">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 px-4 py-1.5 text-sm font-medium transition-all rounded-md border border-transparent whitespace-nowrap">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="pre-ipo" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 relative px-4 py-1.5 text-sm font-medium transition-all rounded-md border border-transparent whitespace-nowrap">
                      Pre-IPO
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    </TabsTrigger>
                    <TabsTrigger value="financial-performance" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 px-4 py-1.5 text-sm font-medium transition-all rounded-md border border-transparent whitespace-nowrap">
                      Financials
                    </TabsTrigger>
                    <TabsTrigger value="business-operations" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 px-4 py-1.5 text-sm font-medium transition-all rounded-md border border-transparent whitespace-nowrap">
                      Operations
                    </TabsTrigger>
                    <TabsTrigger value="shareholding" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 px-4 py-1.5 text-sm font-medium transition-all rounded-md border border-transparent whitespace-nowrap">
                      Shareholding
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 px-4 py-1.5 text-sm font-medium transition-all rounded-md border border-transparent whitespace-nowrap">
                      Reports
                    </TabsTrigger>
                    <TabsTrigger value="governance" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 px-4 py-1.5 text-sm font-medium transition-all rounded-md border border-transparent whitespace-nowrap">
                      Governance
                    </TabsTrigger>
                  </TabsList>
            </div>
            
            {/* Mobile: Fixed container with proper spacing */}
            <div className="block sm:hidden">
                <div className="bg-gray-900/90 backdrop-blur-lg rounded-lg border border-gray-700/50 p-2 mb-4">
                  <TabsList className="grid grid-cols-2 gap-2 bg-transparent">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-400 data-[state=active]:border-green-500/50 data-[state=inactive]:text-gray-400 data-[state=inactive]:bg-gray-800/50 px-3 py-2 text-xs font-medium transition-all rounded-md border border-gray-700/50 text-center">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="pre-ipo" className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-400 data-[state=active]:border-green-500/50 data-[state=inactive]:text-gray-400 data-[state=inactive]:bg-gray-800/50 relative px-3 py-2 text-xs font-medium transition-all rounded-md border border-gray-700/50 text-center">
                      Pre-IPO
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    </TabsTrigger>
                    <TabsTrigger value="financial-performance" className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-400 data-[state=active]:border-green-500/50 data-[state=inactive]:text-gray-400 data-[state=inactive]:bg-gray-800/50 px-3 py-2 text-xs font-medium transition-all rounded-md border border-gray-700/50 text-center">
                      Financials
                    </TabsTrigger>
                    <TabsTrigger value="business-operations" className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-400 data-[state=active]:border-green-500/50 data-[state=inactive]:text-gray-400 data-[state=inactive]:bg-gray-800/50 px-3 py-2 text-xs font-medium transition-all rounded-md border border-gray-700/50 text-center">
                      Operations
                    </TabsTrigger>
                    <TabsTrigger value="shareholding" className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-400 data-[state=active]:border-green-500/50 data-[state=inactive]:text-gray-400 data-[state=inactive]:bg-gray-800/50 px-3 py-2 text-xs font-medium transition-all rounded-md border border-gray-700/50 text-center">
                      Shareholding
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-400 data-[state=active]:border-green-500/50 data-[state=inactive]:text-gray-400 data-[state=inactive]:bg-gray-800/50 px-3 py-2 text-xs font-medium transition-all rounded-md border border-gray-700/50 text-center">
                      Reports
                    </TabsTrigger>
                    <TabsTrigger value="governance" className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-400 data-[state=active]:border-green-500/50 data-[state=inactive]:text-gray-400 data-[state=inactive]:bg-gray-800/50 px-3 py-2 text-xs font-medium transition-all rounded-md border border-gray-700/50 text-center col-span-2">
                      Governance
                    </TabsTrigger>
                  </TabsList>
                </div>
            </div>

            {/* Overview Tab - Combined Dashboard */}
            <TabsContent value="overview" className="space-y-4 sm:space-y-6 bg-transparent mt-4 sm:mt-6">
              <div className="space-y-4 sm:space-y-6">
                <motion.div {...fadeInProps}>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Investor Dashboard</h2>
                  
                  {/* Pre-IPO Investment Highlight */}
                  <div className="mb-4 sm:mb-6">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600/10 to-blue-600/10 backdrop-blur-xl border border-white/20 p-3 sm:p-4">
                      <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-green-400/10 rounded-full blur-2xl"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-400 font-semibold text-xs sm:text-sm">PRE-IPO ROUND CLOSED</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white mb-1">Strategic Investment Completed</h3>
                          <p className="text-gray-400 text-xs sm:text-sm">Successfully raised ₹40 Cr at ₹820 Cr valuation</p>
                        </div>
                        <Button 
                          onClick={() => handleTabChange('pre-ipo')}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm w-full sm:w-auto"
                        >
                          View Details
                          <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* 6 Charts Grid - 3 rows x 2 columns */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {isChartsLoaded ? (
                      <>
                        {/* Row 1 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                          <RevenueGrowthChart />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                          <ProfitabilityChart />
                        </motion.div>
                        
                        {/* Row 2 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                          <ReturnRatiosChart />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                          <DebtEquityChart />
                        </motion.div>
                        
                        {/* Row 3 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
                          <ProductMixChart />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
                          <OperationalEfficiencyChart />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <ChartSkeleton />
                        <ChartSkeleton />
                        <ChartSkeleton />
                        <ChartSkeleton />
                        <ChartSkeleton />
                        <ChartSkeleton />
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Pre-IPO Tab */}
            <TabsContent value="pre-ipo" className="space-y-8 bg-transparent">
              <div className="space-y-8">
                <motion.div {...fadeInProps}>
                  {/* Pre-IPO Header with Status */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-white">Pre-IPO Investment Round</h2>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-semibold uppercase tracking-wider">Round Closed</span>
                      </div>
                    </div>
                    
                    {/* Pre-IPO Highlights Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600/10 via-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-white/20 p-8">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4">Strategic Investment Round Successfully Completed</h3>
                        <p className="text-lg text-gray-300 mb-8">
                          MSPIL has successfully closed its pre-IPO funding round, raising ₹40 Crores at a valuation of ₹820 Crores. 
                          This strategic investment will fuel our expansion plans and strengthen our market position ahead of the planned IPO.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                            <DollarSign className="w-8 h-8 text-green-400 mb-3" />
                            <p className="text-3xl font-bold text-white mb-1">₹820 Cr</p>
                            <p className="text-sm text-gray-400">Pre-Money Valuation</p>
                          </div>
                          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                            <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
                            <p className="text-3xl font-bold text-white mb-1">₹40 Cr</p>
                            <p className="text-sm text-gray-400">Amount Raised</p>
                          </div>
                          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                            <Activity className="w-8 h-8 text-purple-400 mb-3" />
                            <p className="text-3xl font-bold text-white mb-1">15 Months</p>
                            <p className="text-sm text-gray-400">Expected IPO Timeline</p>
                          </div>
                          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                            <Percent className="w-8 h-8 text-orange-400 mb-3" />
                            <p className="text-3xl font-bold text-white mb-1">2.3x</p>
                            <p className="text-sm text-gray-400">Expected Returns</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Investment Details Grid */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Investment Structure */}
                    <Card className={`${cardBackgrounds.glass} shadow-2xl`}>
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Scale className="w-5 h-5 text-primary" />
                          Investment Structure
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                            <span className="text-gray-300">Instrument Type</span>
                            <span className="font-semibold text-white">Equity Shares</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                            <span className="text-gray-300">Price per Share</span>
                            <span className="font-semibold text-white">₹109.33</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                            <span className="text-gray-300">Minimum Investment</span>
                            <span className="font-semibold text-white">₹10 Crores</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                            <span className="text-gray-300">Lock-in Period</span>
                            <span className="font-semibold text-white">6 months post-IPO</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                            <span className="text-gray-300">Board Representation</span>
                            <span className="font-semibold text-white">Observer Rights</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Use of Funds */}
                    <Card className={`${cardBackgrounds.glass} shadow-2xl`}>
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-primary" />
                          Use of Funds
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300">Ethanol Plant Expansion</span>
                              <span className="text-white font-semibold">60%</span>
                            </div>
                            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{width: '60%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300">Working Capital</span>
                              <span className="text-white font-semibold">25%</span>
                            </div>
                            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{width: '25%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300">Technology Upgrades</span>
                              <span className="text-white font-semibold">10%</span>
                            </div>
                            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{width: '10%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300">General Corporate</span>
                              <span className="text-white font-semibold">5%</span>
                            </div>
                            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" style={{width: '5%'}}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* IPO Roadmap */}
                  <Card className={`${cardBackgrounds.glass} shadow-2xl mt-8`}>
                    <CardHeader>
                      <CardTitle className="text-white">IPO Roadmap</CardTitle>
                      <CardDescription className="text-gray-400">Expected timeline for public listing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
                        <div className="space-y-8">
                          {[
                            { date: 'Dec 2024', title: 'Pre-IPO Round Closed', status: 'completed', description: 'Successfully raised ₹40 Cr from strategic investors' },
                            { date: 'Q1 2025', title: 'DRHP Filing', status: 'upcoming', description: 'Submit Draft Red Herring Prospectus to SEBI' },
                            { date: 'Q2 2025', title: 'SEBI Approval', status: 'upcoming', description: 'Receive regulatory approvals for IPO' },
                            { date: 'Q3 2025', title: 'IPO Launch', status: 'upcoming', description: 'Public issue opens for subscription' },
                            { date: 'Q4 2025', title: 'Listing', status: 'upcoming', description: 'Trading commences on BSE & NSE' }
                          ].map((item, index) => (
                            <div key={index} className="relative flex items-center">
                              <div className={`w-4 h-4 rounded-full z-10 ${
                                item.status === 'completed' ? 'bg-green-500' : 'bg-gray-600'
                              }`}></div>
                              <div className="ml-6">
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="font-semibold text-white">{item.title}</h4>
                                  <span className="text-sm text-gray-400">{item.date}</span>
                                </div>
                                <p className="text-sm text-gray-400">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Value Creation Journey */}
                  <Card className={`${cardBackgrounds.glass} shadow-2xl mt-8`}>
                    <CardHeader>
                      <CardTitle className="text-white">Value Creation Journey</CardTitle>
                      <CardDescription className="text-gray-400">Expected valuation growth trajectory</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-400 mb-2">Current (Pre-IPO)</p>
                          <p className="text-3xl font-bold text-green-400">₹820 Cr</p>
                          <p className="text-sm text-gray-500 mt-1">December 2024</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400 mb-2">IPO Valuation</p>
                          <p className="text-3xl font-bold text-blue-400">₹1,600 Cr</p>
                          <p className="text-sm text-gray-500 mt-1">Expected Q3 2025</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400 mb-2">Post-Listing Target</p>
                          <p className="text-3xl font-bold text-purple-400">₹2,000+ Cr</p>
                          <p className="text-sm text-gray-500 mt-1">12-18 months post-IPO</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Business Operations Tab */}
            <TabsContent value="business-operations" className="space-y-8 bg-transparent">
              <div className="space-y-8">
                <motion.div {...fadeInProps}>
                  <h2 className="text-3xl font-bold text-white mb-8">Business Operations Dashboard</h2>
                  
                  {/* Sugar & Ethanol Production */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <SugarProductionChart />
                    <EthanolProductionChart />
                  </div>
                  
                  {/* Ethanol Business Metrics */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Ethanol Business Analytics</h3>
                    <EthanolMetricsCard />
                  </div>
                  
                  {/* Power & DDGS Production */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <PowerGenerationChart />
                    <DDGSProductionChart />
                  </div>
                  
                  {/* Capacity Utilization & Trends */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <CapacityUtilizationChart />
                    <CapacityTrendsChart />
                  </div>
                  
                  {/* Segment Revenue Analysis */}
                  <div className="mb-8">
                    <SegmentRevenueChart />
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Financial Performance Tab with Charts */}
            <TabsContent value="financial-performance" className="space-y-6 bg-transparent">
              <div className="space-y-6">
                <motion.div {...fadeInProps}>
                  <h2 className="text-2xl font-bold text-white mb-6">Financial Performance Dashboard</h2>
                  
                  {/* 6 Charts Grid - 3 rows x 2 columns */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Row 1 - Revenue & Profitability */}
                    <RevenueGrowthChart />
                    <ProfitabilityChart />
                    
                    {/* Row 2 - Returns & Capital */}
                    <ReturnRatiosChart />
                    <DebtEquityChart />
                    
                    {/* Row 3 - Segments & Operational Efficiency */}
                    <SegmentRevenueChart />
                    <OperationalEfficiencyChart />
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Reports & Documents Tab */}
            <TabsContent value="reports" className="space-y-8 bg-transparent">
              {documentsData && documentsData.investorRelations && (
                <>
                  {/* Annual Reports */}
                  <motion.div {...fadeInProps}>
                    <h2 className="text-2xl font-bold text-white mb-6">Annual Reports</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {documentsData.investorRelations.annualReports.map((report, index) => (
                        <Card key={index} className={`${cardBackgrounds.glass} hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                              <FileText className="w-5 h-5 text-green-400" />
                              {report.title}
                            </CardTitle>
                            <CardDescription className="text-gray-400 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300 mb-4">{report.description}</p>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs text-gray-400">Size: {report.fileSize}</span>
                              <span className="text-xs text-gray-400">PDF</span>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full bg-green-600/10 hover:bg-green-600/20 border-green-600/30 text-green-400"
                              onClick={() => handleDocumentDownload(report.url, report.filename)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Report
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>

                  {/* Quarterly Results */}
                  <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.1 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Quarterly Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {documentsData.investorRelations.quarterlyResults.map((result, index) => (
                        <Card key={index} className={`${cardBackgrounds.glass} hover:shadow-xl transition-all`}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-white mb-2">{result.title}</h3>
                                <p className="text-sm text-gray-400 mb-3">{result.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(result.date).toLocaleDateString()}
                                  </span>
                                  <span>{result.fileSize || '1.0 MB'}</span>
                                </div>
                              </div>
                              <Button 
                                size="sm"
                                className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400"
                                onClick={() => handleDocumentDownload(result.url, result.filename)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>

                  {/* Corporate Policies */}
                  <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Corporate Policies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {documentsData.investorRelations.policies.map((policy, index) => {
                        const IconComponent = {
                          'Code of Conduct': Gavel,
                          'Whistleblower Policy': Shield,
                          'Related Party Transaction Policy': Users,
                          'Insider Trading Policy': FileSpreadsheet,
                          'Dividend Distribution Policy': TrendingUp,
                          'Corporate Social Responsibility Policy': Building,
                          'Corporate Governance Policy': FileCheck
                        }[policy.title] || FileText;

                        // Convert policy filename to URL-friendly ID
                        const policyId = policy.filename.replace('.pdf', '').replace(/_/g, '-');

                        return (
                          <Card key={index} className={`${cardBackgrounds.glass} hover:shadow-lg transition-all cursor-pointer`}
                            onClick={() => navigate(`/policy/${policyId}`)}
                          >
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-base text-white">
                                <IconComponent className="w-5 h-5 text-purple-400" />
                                {policy.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-xs text-gray-400 mb-3">{policy.description}</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full text-xs bg-purple-600/10 hover:bg-purple-600/20 border-purple-600/30 text-purple-400"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                View Policy
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Investor Presentations */}
                  <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.3 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Investor Presentations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {documentsData.investorRelations.presentations.map((presentation, index) => (
                        <Card key={index} className={`${cardBackgrounds.glass} hover:shadow-xl transition-all`}>
                          <CardHeader>
                            <CardTitle className="text-white">{presentation.title}</CardTitle>
                            <CardDescription className="text-gray-400">
                              {new Date(presentation.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300 mb-4">{presentation.description}</p>
                            <Button 
                              className="w-full bg-orange-600/20 hover:bg-orange-600/30 border border-orange-600/30 text-orange-400"
                              onClick={() => handleDocumentDownload(presentation.url, presentation.filename)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Presentation
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>

                  {/* Notices & Announcements */}
                  {documentsData.investorRelations.notices && (
                    <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
                      <h2 className="text-2xl font-bold text-white mb-6">Notices & Announcements</h2>
                      <Card className={`${cardBackgrounds.glass}`}>
                        <CardContent className="p-0">
                          <div className="divide-y divide-gray-700">
                            {documentsData.investorRelations.notices.map((notice, index) => (
                              <div key={index} className="p-4 hover:bg-gray-800/50 transition-colors">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h3 className="font-medium text-white">{notice.title}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{notice.description}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                      {new Date(notice.date).toLocaleDateString()} • {notice.fileSize}
                                    </p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-green-400 hover:text-green-300"
                                    onClick={() => handleDocumentDownload(notice.url, notice.filename)}
                                  >
                                    Download
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </>
              )}
            </TabsContent>

            {/* Shareholding Tab with Enhanced Visuals */}
            <TabsContent value="shareholding" className="space-y-8 bg-transparent">
              <div id="shareholding">
                <h2 className="text-3xl font-bold text-white mb-8">Shareholding & Investment Structure</h2>
                
                {/* Current vs Post-IPO Shareholding */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.1 }}>
                    <ShareholdingChart postIPO={false} />
                  </motion.div>
                  <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
                    <ShareholdingChart postIPO={true} />
                  </motion.div>
                </div>

                {/* Stock Information Card */}
                <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.3 }}>
                  <Card className={`${cardBackgrounds.glass} shadow-2xl mb-8`}>
                    <CardHeader>
                      <CardTitle className="text-white">Stock Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-800/30 rounded-lg">
                          <p className="text-gray-400 text-sm">BSE Code</p>
                          <p className="text-white font-semibold">{shareholdingData.stockInfo.bseCode}</p>
                        </div>
                        <div className="p-4 bg-gray-800/30 rounded-lg">
                          <p className="text-gray-400 text-sm">NSE Symbol</p>
                          <p className="text-white font-semibold">{shareholdingData.stockInfo.nseSymbol}</p>
                        </div>
                        <div className="p-4 bg-gray-800/30 rounded-lg">
                          <p className="text-gray-400 text-sm">ISIN</p>
                          <p className="text-white font-semibold">{shareholdingData.stockInfo.isin}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Investment Terms Section */}
              <div id="investment-terms" className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Investment Terms & Structure</h2>
                
                {/* Pre-IPO Status Banner */}
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Pre-IPO Round Successfully Closed
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Completed in {investmentData.closingDate} • Valuation: {investmentData.valuation.preIPO} • Amount Raised: {investmentData.amountRaised}
                      </p>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Pre-IPO Investment Round - CLOSED</CardTitle>
                    <CardDescription>Successfully completed strategic fundraising round</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Round Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Round Status</span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {investmentData.preIPOStatus}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Amount Raised</span>
                            <span className="font-medium">{investmentData.amountRaised}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Closing Date</span>
                            <span className="font-medium">{investmentData.closingDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pre-IPO Valuation</span>
                            <span className="font-medium">{investmentData.valuation.preIPO}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Investment Terms</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Instrument Type</span>
                            <span className="font-medium">{investmentData.instrumentType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Lock-in Period</span>
                            <span className="font-medium">{investmentData.lockInPeriod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Exit Strategy</span>
                            <span className="font-medium">{investmentData.exitStrategy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Exit Timeline</span>
                            <span className="font-medium">{investmentData.exitTimeline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Next Steps: IPO Preparation</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          With the pre-IPO round successfully completed, the company is now focused on IPO preparation 
                          with an expected timeline of {investmentData.exitTimeline}. The raised capital will be utilized 
                          for capacity expansion and working capital requirements.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Post-IPO Shareholding Pattern */}
              <div id="post-ipo-shareholding" className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Post-IPO Shareholding Pattern</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Expected Shareholding After IPO</CardTitle>
                    <CardDescription>Projected shareholding distribution post public issue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-4">Post-IPO Distribution</h3>
                          <div className="space-y-3">
                            {shareholdingData.postIPO.distribution.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span>{item.category}</span>
                                <span className="font-medium">{item.percentage}%</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between">
                              <span className="font-semibold">Total Shares Post-IPO</span>
                              <span className="font-medium">{shareholdingData.postIPO.totalShares} {shareholdingData.postIPO.shareValue}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold">New Shares Issued</span>
                              <span className="font-medium">{shareholdingData.postIPO.newSharesIssued} {shareholdingData.postIPO.shareValue}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-4">IPO Details</h3>
                          <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg">
                            <p className="text-sm mb-2">
                              <strong>Fresh Issue:</strong> {shareholdingData.postIPO.newSharesIssued} Crore shares
                            </p>
                            <p className="text-sm mb-2">
                              <strong>Promoter Dilution:</strong> From {shareholdingData.current.distribution[0].percentage}% to {shareholdingData.postIPO.distribution[0].percentage}%
                            </p>
                            <p className="text-sm">
                              <strong>Public Float:</strong> {shareholdingData.postIPO.distribution.find(d => d.category === 'Public').percentage}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Corporate Governance Tab */}
            <TabsContent value="governance" className="space-y-8 bg-transparent">
              <div id="governance">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Corporate Governance</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-primary" />
                        Board of Directors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { name: 'Mr. Nawab Raza', position: 'Chairman', type: 'Executive' },
                          { name: 'Mr. Saif Raza', position: 'Managing Director', type: 'Executive' },
                          { name: 'Mr. Sahil Raza', position: 'Director - Supply Chain', type: 'Executive' },
                          { name: 'Dr. Rajan Dubey', position: 'Non-Executive Director', type: 'Non-Executive' },
                          { name: 'Mr. E. S. Ranganathan', position: 'Independent Director', type: 'Independent' },
                          { name: 'Mr. Mohan Tiwari', position: 'Independent Director', type: 'Independent' },
                          { name: 'Dr. Chandrakant N. Patil', position: 'Independent Director', type: 'Independent' }
                        ].map((director, index) => (
                          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 className="font-semibold">{director.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{director.position}</p>
                            <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                              {director.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Board Committees</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: 'Audit Committee', members: 3, chairman: 'Mr. E. S. Ranganathan' },
                          { name: 'Nomination & Remuneration Committee', members: 3, chairman: 'Mr. Mohan Tiwari' },
                          { name: 'Stakeholders Relationship Committee', members: 3, chairman: 'Dr. Rajan Dubey' },
                          { name: 'Risk Management Committee', members: 4, chairman: 'Mr. Nawab Raza' }
                        ].map((committee, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                              <p className="font-medium">{committee.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Chairman: {committee.chairman} | Members: {committee.members}
                              </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Corporate Policies Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Corporate Policies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Code of Conduct', icon: Gavel, id: 'code-of-conduct' },
                  { title: 'Whistleblower Policy', icon: Shield, id: 'whistleblower-policy' },
                  { title: 'Related Party Transaction Policy', icon: Users, id: 'related-party-policy' },
                  { title: 'Insider Trading Policy', icon: FileSpreadsheet, id: 'insider-trading-policy' },
                  { title: 'Dividend Distribution Policy', icon: TrendingUp, id: 'dividend-policy' },
                  { title: 'Corporate Social Responsibility Policy', icon: Building, id: 'csr-policy' }
                ].map((policy, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:bg-white/70 dark:hover:bg-gray-800/70 cursor-pointer"
                    onClick={() => navigate(`/policy/${policy.id}`)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <policy.icon className="w-5 h-5 mr-2 text-primary" />
                        {policy.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Policy
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                </div>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-8 bg-transparent">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Investor Contact</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Officer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-semibold">{investorContacts.complianceOfficer.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {investorContacts.complianceOfficer.designation}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-primary" />
                        <a href={`tel:${investorContacts.complianceOfficer.phone}`} className="hover:text-primary">
                          {investorContacts.complianceOfficer.phone}
                        </a>
                      </p>
                      <p className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-primary" />
                        <a href={`mailto:${investorContacts.complianceOfficer.email}`} className="hover:text-primary">
                          {investorContacts.complianceOfficer.email}
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Registrar & Transfer Agent</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-semibold">{investorContacts.registrar.name}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-start text-sm">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary shrink-0" />
                        {investorContacts.registrar.address}
                      </p>
                      <p className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-primary" />
                        <a href={`tel:${investorContacts.registrar.phone}`} className="hover:text-primary">
                          {investorContacts.registrar.phone}
                        </a>
                      </p>
                      <p className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-primary" />
                        <a href={`mailto:${investorContacts.registrar.email}`} className="hover:text-primary">
                          {investorContacts.registrar.email}
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Investor Grievance Redressal</CardTitle>
                  <CardDescription>
                    For any queries or grievances, please contact our Compliance Officer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm">
                      Email your queries to: <a href="mailto:cs@mspil.in" className="font-medium text-primary hover:underline">cs@mspil.in</a>
                    </p>
                    <p className="text-sm mt-2">
                      Response time: Within 48 hours on working days
                    </p>
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

export default InvestorRelationsPage;