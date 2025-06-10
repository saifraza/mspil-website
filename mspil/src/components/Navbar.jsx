import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageContext, useTranslation } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const { setLanguage } = useContext(LanguageContext);
  const t = useTranslation();

  const navLinks = [
    { href: '/', labelKey: 'navHome' },
    { href: '/about', labelKey: 'navAboutUs' },
    { href: '/businesses', labelKey: 'navOurBusinesses' },
    { href: '/sustainability', labelKey: 'navSustainability' },
    { href: '/data-insights', labelKey: 'navDataInsights' },
    { href: '/investor-relations', labelKey: 'navInvestors' },
    { href: '/news-media', labelKey: 'navNewsMedia' },
    { href: '/careers', labelKey: 'navCareers' },
    { href: '/csr', labelKey: 'navCSR' },
    { href: '/contact', labelKey: 'navContactUs' }
  ];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'hi' : 'en'));
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-bio-green-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0 max-w-[200px] sm:max-w-[300px] lg:max-w-none">
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/4863e124-c92c-47bd-a756-134ba49a613f/2bfaa4fa85d42efbc427b1c881d20027.png"
              alt={t('companyLogoAlt')}
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              {/* Show only short name on mobile, full layout on larger screens */}
              <span className="text-lg sm:text-xl font-bold text-foreground truncate">
                {t('companyNameShort')}
              </span>
              <span className="hidden sm:block text-xs lg:text-sm text-foreground/80 truncate">
                {t('companyNameFull')}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.labelKey}
                to={link.href}
                className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(link.href)
                    ? 'bg-gradient-to-r from-bio-green-500 to-eco-lime-500 text-white shadow-md'
                    : 'text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800 hover:text-bio-green-700 dark:hover:text-bio-green-300'
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="ml-2 text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              <span className="sr-only">{t('toggleTheme')}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage} 
              className="ml-1 text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800"
            >
              <Globe size={20} />
              <span className="sr-only">{t('toggleLanguage')}</span>
            </Button>
            <Link to="/simple-cms">
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-1 text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800"
                title="CMS Login"
              >
                <Settings size={20} />
                <span className="sr-only">CMS Login</span>
              </Button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="mr-1 text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage} 
              className="mr-1 text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800"
            >
              <Globe size={20} />
            </Button>
            <Link to="/simple-cms">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-1 text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800"
                title="CMS Login"
              >
                <Settings size={20} />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu} 
              className="text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white/95 dark:bg-bio-green-900/95 backdrop-blur-md shadow-lg pb-4"
        >
          <div className="flex flex-col space-y-2 px-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.labelKey}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActiveRoute(link.href)
                    ? 'bg-gradient-to-r from-bio-green-500 to-eco-lime-500 text-white'
                    : 'text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800 hover:text-bio-green-700 dark:hover:text-bio-green-300'
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <Link
              to="/simple-cms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 text-foreground hover:bg-bio-green-100 dark:hover:bg-bio-green-800 hover:text-bio-green-700 dark:hover:text-bio-green-300 border-t border-gray-200 dark:border-gray-700 mt-2 pt-4"
            >
              <div className="flex items-center space-x-2">
                <Settings size={18} />
                <span>CMS Login</span>
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;