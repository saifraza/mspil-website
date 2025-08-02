import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Printer, BarChart3, TrendingUp, Factory, Zap, Droplets, ShoppingBag, Users, Globe, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InvestorPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Presentation slides data
  const slides = [
    // Slide 1: Title Slide
    {
      id: 1,
      type: 'title',
      title: 'MAHAKAUSHAL SUGAR & POWER INDUSTRIES LIMITED',
      subtitle: 'Pre-IPO Investor Presentation',
      tagline: 'Leading Integrated Sugar & Power Complex in Central India',
      backgroundGradient: 'from-green-600 via-lime-500 to-emerald-600',
      version: 'Version 6.0 | 2024-25'
    },

    // Slide 2: Company Overview
    {
      id: 2,
      type: 'overview',
      title: 'Company Overview',
      content: {
        established: '2005',
        location: 'Panna, Madhya Pradesh',
        business: 'Integrated Sugar & Power Complex',
        employees: '1,200+',
        highlights: [
          'Leading sugar manufacturer in Central India',
          'Diversified revenue streams across sugar, ethanol, and power',
          'State-of-the-art manufacturing facilities',
          'Strong farmer relationships and cane procurement network'
        ]
      },
      backgroundGradient: 'from-slate-50 to-green-50',
      icon: <Factory className="w-16 h-16 text-green-600" />
    },

    // Slide 3: Business Segments
    {
      id: 3,
      type: 'business-segments',
      title: 'Our Business Segments',
      segments: [
        {
          name: 'Sugar Manufacturing',
          capacity: '8,000 TCD',
          description: 'Premium quality sugar production with advanced refining technology',
          icon: <ShoppingBag className="w-12 h-12" />,
          color: 'from-amber-400 to-orange-500',
          percentage: '65%'
        },
        {
          name: 'Ethanol Production',
          capacity: '350 KLPD',
          description: 'High-grade ethanol for fuel blending and industrial applications',
          icon: <Droplets className="w-12 h-12" />,
          color: 'from-blue-400 to-cyan-500',
          percentage: '25%'
        },
        {
          name: 'Power Generation',
          capacity: '35 MW',
          description: 'Co-generation power plant using bagasse as renewable fuel',
          icon: <Zap className="w-12 h-12" />,
          color: 'from-yellow-400 to-amber-500',
          percentage: '10%'
        }
      ],
      backgroundGradient: 'from-slate-50 to-blue-50'
    },

    // Slide 4: Financial Highlights
    {
      id: 4,
      type: 'financial',
      title: 'Financial Performance Highlights',
      metrics: [
        { label: 'Revenue (FY 2023-24)', value: '₹2,450 Cr', growth: '+15.2%', trend: 'up' },
        { label: 'EBITDA', value: '₹385 Cr', growth: '+18.5%', trend: 'up' },
        { label: 'Net Profit', value: '₹125 Cr', growth: '+22.3%', trend: 'up' },
        { label: 'EBITDA Margin', value: '15.7%', growth: '+0.8%', trend: 'up' },
        { label: 'Return on Equity', value: '18.2%', growth: '+2.1%', trend: 'up' },
        { label: 'Debt-to-Equity', value: '0.65:1', growth: '-0.15', trend: 'down' }
      ],
      backgroundGradient: 'from-emerald-50 to-teal-50'
    },

    // Slide 5: Market Position
    {
      id: 5,
      type: 'market-position',
      title: 'Strong Market Position',
      content: {
        marketShare: [
          { region: 'Central India Sugar Market', share: '12%', rank: '#3' },
          { region: 'MP Ethanol Production', share: '15%', rank: '#2' },
          { region: 'Regional Power Supply', share: '8%', rank: '#5' }
        ],
        competitiveAdvantages: [
          'Strategic location near sugar cane growing regions',
          'Integrated business model with multiple revenue streams',
          'Modern manufacturing facilities with latest technology',
          'Strong relationships with 15,000+ farmers',
          'Experienced management team with 25+ years expertise'
        ]
      },
      backgroundGradient: 'from-purple-50 to-indigo-50'
    },

    // Slide 6: Revenue Growth Trajectory
    {
      id: 6,
      type: 'revenue-growth',
      title: 'Revenue Growth Trajectory',
      subtitle: 'Exponential growth driven by ethanol capacity addition',
      data: [
        { year: 'FY25', revenue: 300.2 },
        { year: 'FY26', revenue: 811.08 },
        { year: 'FY27', revenue: 1310.56 },
        { year: 'FY28', revenue: 1378.40 },
        { year: 'FY29', revenue: 1462.27 },
        { year: 'FY30', revenue: 1564.91 }
      ],
      backgroundGradient: 'from-slate-50 to-green-50'
    },

    // Slide 7: Growth Strategy
    {
      id: 7,
      type: 'growth-strategy',
      title: 'Growth Strategy & Future Plans',
      strategies: [
        {
          title: 'Capacity Expansion',
          description: 'Increase sugar capacity to 12,000 TCD by FY 2026-27',
          timeline: '18 months',
          investment: '₹450 Cr',
          icon: <Factory />
        },
        {
          title: 'Ethanol Enhancement',
          description: 'Expand ethanol production to 500 KLPD',
          timeline: '24 months',
          investment: '₹320 Cr',
          icon: <Droplets />
        },
        {
          title: 'Power Augmentation',
          description: 'Increase co-generation capacity to 50 MW',
          timeline: '12 months',
          investment: '₹180 Cr',
          icon: <Zap />
        },
        {
          title: 'Technology Upgrade',
          description: 'AI-driven automation and process optimization',
          timeline: '6 months',
          investment: '₹85 Cr',
          icon: <Target />
        }
      ],
      backgroundGradient: 'from-green-50 to-lime-50'
    },

    // Slide 8: ESG & Sustainability
    {
      id: 8,
      type: 'sustainability',
      title: 'ESG & Sustainability Initiatives',
      initiatives: [
        {
          category: 'Environmental',
          items: [
            'Zero liquid discharge facility',
            'Renewable energy from bagasse',
            'Water conservation programs',
            'Carbon footprint reduction'
          ],
          icon: <Globe className="w-8 h-8 text-green-600" />
        },
        {
          category: 'Social',
          items: [
            'Farmer welfare programs',
            'Community development projects',
            'Employee skill development',
            'Healthcare initiatives'
          ],
          icon: <Users className="w-8 h-8 text-blue-600" />
        },
        {
          category: 'Governance',
          items: [
            'Transparent reporting',
            'Independent board oversight',
            'Ethical business practices',
            'Stakeholder engagement'
          ],
          icon: <Award className="w-8 h-8 text-purple-600" />
        }
      ],
      backgroundGradient: 'from-teal-50 to-cyan-50'
    },

    // Slide 9: Investment Proposition
    {
      id: 9,
      type: 'investment',
      title: 'Investment Proposition',
      propositions: [
        {
          title: 'Strong Fundamentals',
          description: 'Consistent profitability with growing market demand',
          benefits: ['Stable cash flows', 'Diversified revenue', 'Asset-light model']
        },
        {
          title: 'Growth Potential',
          description: 'Significant expansion opportunities in core segments',
          benefits: ['Market leadership', 'Scalable operations', 'Technology advantage']
        },
        {
          title: 'ESG Leadership',
          description: 'Sustainable business practices and social responsibility',
          benefits: ['Environmental stewardship', 'Community impact', 'Long-term viability']
        }
      ],
      backgroundGradient: 'from-indigo-50 to-purple-50'
    },

    // Slide 10: Thank You
    {
      id: 10,
      type: 'thank-you',
      title: 'Thank You',
      subtitle: 'Questions & Discussion',
      contact: {
        company: 'Mahakaushal Sugar & Power Industries Limited',
        address: 'Panna, Madhya Pradesh, India',
        phone: '+91-XXXX-XXXXXX',
        email: 'investors@mspil.com',
        website: 'www.mspil.in'
      },
      backgroundGradient: 'from-green-600 via-lime-500 to-emerald-600'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const printPresentation = () => {
    window.print();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className={`h-full w-full bg-gradient-to-br ${slide.backgroundGradient} flex flex-col items-center justify-center text-white p-12`}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-light mb-4 opacity-90">
                {slide.subtitle}
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-80">
                {slide.tagline}
              </p>
              <div className="text-lg opacity-70">
                {slide.version}
              </div>
            </motion.div>
          </div>
        );

      case 'overview':
        return (
          <div className={`h-full w-full bg-gradient-to-br ${slide.backgroundGradient} p-12`}>
            <div className="flex items-center mb-8">
              {slide.icon}
              <h1 className="text-4xl font-bold text-gray-800 ml-4">{slide.title}</h1>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 h-3/4">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Established:</span>
                      <span className="font-semibold">{slide.content.established}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold">{slide.content.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Business:</span>
                      <span className="font-semibold">{slide.content.business}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employees:</span>
                      <span className="font-semibold">{slide.content.employees}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Highlights</h3>
                <ul className="space-y-3">
                  {slide.content.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'business-segments':
        return (
          <div className={`h-full w-full bg-gradient-to-br ${slide.backgroundGradient} p-12`}>
            <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">{slide.title}</h1>
            
            <div className="grid md:grid-cols-3 gap-8 h-3/4">
              {slide.segments.map((segment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${segment.color} opacity-10 rounded-bl-full`}></div>
                  
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${segment.color} text-white mb-4`}>
                    {segment.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{segment.name}</h3>
                  <div className="text-2xl font-bold text-green-600 mb-3">{segment.capacity}</div>
                  <p className="text-gray-600 text-sm mb-4">{segment.description}</p>
                  
                  <div className="flex items-center">
                    <div className="text-lg font-semibold text-gray-800">Revenue Share:</div>
                    <div className="ml-2 text-lg font-bold text-green-600">{segment.percentage}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className={`h-full w-full bg-gradient-to-br ${slide.backgroundGradient} p-12`}>
            <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">{slide.title}</h1>
            
            <div className="grid md:grid-cols-3 gap-6 h-3/4">
              {slide.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="text-3xl font-bold text-gray-800 mb-2">{metric.value}</div>
                  <div className="text-gray-600 mb-3">{metric.label}</div>
                  <div className={`flex items-center justify-center ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      metric.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    <span className="font-semibold">{metric.growth}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'revenue-growth':
        const maxRevenue = 1600;
        return (
          <div className={`h-full w-full bg-gradient-to-br ${slide.backgroundGradient} p-12`}>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">{slide.title}</h1>
            <p className="text-xl text-gray-600 mb-8 text-center">{slide.subtitle}</p>
            
            <div className="bg-white rounded-xl shadow-xl p-8 h-4/5 flex flex-col">
              {/* Growth indicator */}
              <div className="flex justify-end mb-4">
                <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-semibold">5.2x Growth</span>
                </div>
              </div>
              
              {/* Chart */}
              <div className="flex-1 flex">
                {/* Y-axis */}
                <div className="w-20 flex flex-col justify-between text-sm text-gray-600 text-right pr-4">
                  <span>1600</span>
                  <span>1200</span>
                  <span>800</span>
                  <span>400</span>
                  <span>0</span>
                </div>
                
                {/* Chart area */}
                <div className="flex-1 relative border-l-2 border-b-2 border-gray-400">
                  {/* Grid lines */}
                  {[0.25, 0.5, 0.75, 1].map((ratio) => (
                    <div
                      key={ratio}
                      className="absolute w-full border-t border-gray-200"
                      style={{ bottom: `${ratio * 100}%` }}
                    />
                  ))}
                  
                  {/* Bars */}
                  <div className="absolute inset-0 flex items-end justify-around px-4 pb-12">
                    {slide.data.map((item, index) => {
                      const barHeight = (item.revenue / maxRevenue) * 100;
                      return (
                        <div key={index} className="relative flex flex-col items-center" style={{ width: '12%', height: '100%' }}>
                          {/* Value label */}
                          <div className="absolute top-0 text-sm font-bold text-gray-800 whitespace-nowrap"
                               style={{ top: `${100 - barHeight - 5}%` }}>
                            ₹{item.revenue.toFixed(0)}
                          </div>
                          {/* Bar */}
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${barHeight}%` }}
                            transition={{ delay: index * 0.15, duration: 1, ease: "easeOut" }}
                            className="absolute bottom-0 w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg"
                            style={{
                              boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
                            }}
                          />
                          {/* Year label */}
                          <div className="absolute -bottom-8 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {item.year}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Y-axis label */}
              <div className="absolute left-4 top-1/2 transform -rotate-90 origin-center text-sm font-semibold text-gray-700">
                Revenue (₹ Cr)
              </div>
            </div>
          </div>
        );

      case 'thank-you':
        return (
          <div className={`h-full w-full bg-gradient-to-br ${slide.backgroundGradient} flex flex-col items-center justify-center text-white p-12`}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold mb-6">{slide.title}</h1>
              <h2 className="text-3xl font-light mb-12 opacity-90">{slide.subtitle}</h2>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-left max-w-md">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2 text-lg opacity-90">
                  <div>{slide.contact.company}</div>
                  <div>{slide.contact.address}</div>
                  <div>{slide.contact.phone}</div>
                  <div>{slide.contact.email}</div>
                  <div>{slide.contact.website}</div>
                </div>
              </div>
            </motion.div>
          </div>
        );

      default:
        return (
          <div className={`h-full w-full bg-gradient-to-br ${slide.backgroundGradient} p-12`}>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">{slide.title}</h1>
            <div className="text-gray-600">Slide content goes here...</div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Header Controls */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800">MSPIL Investor Presentation</h2>
          <span className="text-sm text-gray-500">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button onClick={printPresentation} variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print/PDF
          </Button>
          <Button onClick={toggleFullscreen} variant="outline" size="sm">
            Fullscreen
          </Button>
        </div>
      </div>

      {/* Main Presentation Area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderSlide(slides[currentSlide])}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center print:hidden">
          <Button
            onClick={prevSlide}
            variant="outline"
            size="sm"
            className="ml-4 bg-white/80 backdrop-blur-sm"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center print:hidden">
          <Button
            onClick={nextSlide}
            variant="outline"
            size="sm"
            className="mr-4 bg-white/80 backdrop-blur-sm"
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t p-4 print:hidden">
        <div className="flex items-center justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide
                  ? 'bg-green-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorPresentation;