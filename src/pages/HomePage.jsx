import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  TrendingUp, 
  Users, 
  ArrowRight,
  GraduationCap,
  Heart,
  Home,
  ChevronRight,
  Calendar,
  Award,
  Newspaper
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import HeroSection from '@/components/sections/HeroSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const t = useTranslation();

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const investorHighlights = [
    { 
      icon: FileText, 
      title: t('homeInvestorAnnualReports'), 
      link: '/investor-relations#annual-reports' 
    },
    { 
      icon: TrendingUp, 
      title: t('homeInvestorQuarterlyResults'), 
      link: '/investor-relations#financial-results' 
    },
    { 
      icon: Users, 
      title: t('homeInvestorSharholding'), 
      link: '/investor-relations#shareholding' 
    }
  ];

  const recentNews = [
    {
      date: 'January 15, 2024',
      title: 'Q3 FY2024 Financial Results Announced',
      category: 'Financial Results',
      link: '/news-media'
    },
    {
      date: 'December 20, 2023',
      title: 'Expansion of Ethanol Production Capacity Completed',
      category: 'Corporate Announcement',
      link: '/news-media'
    },
    {
      date: 'November 15, 2023',
      title: 'Annual General Meeting Notice',
      category: 'Regulatory Filing',
      link: '/news-media'
    }
  ];

  const csrInitiatives = [
    {
      icon: GraduationCap,
      title: t('homeCSREducation'),
      description: t('homeCSREducationDesc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: t('homeCSRHealthcare'),
      description: t('homeCSRHealthcareDesc'),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Home,
      title: t('homeCSRRuralDev'),
      description: t('homeCSRRuralDevDesc'),
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroSection />
      
      {/* About MSPIL Short Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('homeAboutTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t('homeAboutDescription')}
            </p>
            <Button asChild size="lg" className="group">
              <Link to="/about">
                {t('homeAboutReadMore')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Investor Highlights */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('homeInvestorTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('homeInvestorDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {investorHighlights.map((item, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link to={item.link}>
                    <CardHeader className="text-center">
                      <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInProps} className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/investor-relations">
                {t('homeInvestorViewAll')}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Recent News & Announcements */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('homeNewsTitle')}
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/news-media">
                {t('homeNewsViewAll')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentNews.map((news, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <Calendar className="w-4 h-4" />
                      {news.date}
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {news.category}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={news.link}>
                          <Newspaper className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* News Ticker */}
          <motion.div 
            {...fadeInProps}
            className="mt-8 bg-primary/5 dark:bg-primary/10 rounded-lg p-4"
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
              >
                {[...recentNews, ...recentNews].map((item, index) => (
                  <span key={index} className="inline-flex items-center mx-8 text-sm font-medium text-primary">
                    <Award className="w-4 h-4 mr-2" />
                    {item.title}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSR Impact Snapshot */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('homeCSRTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('homeCSRDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {csrInitiatives.map((initiative, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.2 }}
                className="text-center"
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${initiative.color} text-white mb-4`}>
                  <initiative.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {initiative.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInProps} className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/sustainability">
                {t('homeCSRViewMore')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in Building a Sustainable Future
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Explore opportunities to partner with us or join our team in creating sustainable solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                <Link to="/careers">
                  View Careers
                  <Users className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;