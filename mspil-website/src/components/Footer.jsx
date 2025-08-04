import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import LazyImage from '@/components/LazyImage';
import { sectionBackgrounds } from '@/utils/backgroundStyles';

const companyLogoUrl = "/images/company_logo.png";
const companyName = "Mahakaushal Sugar & Power Industries Ltd.";

const Footer = () => {
  const t = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900/95 backdrop-blur-xl text-gray-300 border-t border-white/10 mt-8 overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
              <LazyImage src={companyLogoUrl} alt={`${companyName} Logo`} className="h-10 w-auto" />
              <span className="font-bold text-base sm:text-lg text-white">{companyName}</span>
            </Link>
            <p className="text-sm text-gray-400">
              Leading in Sustainability Since 2005
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.linkedin.com/company/mahakaushal-sugar-and-power-industries-limited" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-white mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors text-gray-300">About Us</Link></li>
              <li><Link to="/businesses" className="hover:text-primary transition-colors text-gray-300">Our Businesses</Link></li>
              <li><Link to="/sustainability" className="hover:text-primary transition-colors text-gray-300">Sustainability</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors text-gray-300">Careers</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white mb-3">Investor Relations</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/investor-relations#reports" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">Annual Reports</Link></li>
              <li><Link to="/investor-relations#reports" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">Financial Results</Link></li>
              <li><Link to="/investor-relations#shareholding" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">Shareholding Pattern</Link></li>
              <li><Link to="/investor-relations#governance" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">Corporate Governance</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white mb-3">Contact Info</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 shrink-0 text-primary" />
                <span className="text-gray-600 dark:text-gray-300">Village Bachai, Dist. Narsinghpur (M.P.) - 487001</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 shrink-0 text-primary" />
                <a href="tel:+919907494252" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">+91 99074 94252</a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 shrink-0 text-primary" />
                <a href="mailto:saifraza@mspil.in" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">saifraza@mspil.in</a>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold text-gray-900 dark:text-white mb-3">{t('footerLegalLinks')}</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">{t('footerPrivacyPolicy')}</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">{t('footerTermsOfService')}</Link></li>
              <li><Link to="/investor-relations" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">Investor Relations</Link></li>
              <li><Link to="/investor-disclaimer" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300">{t('footerInvestorDisclaimer')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200/30 dark:border-white/10 pt-8 text-center text-sm">
          <p className="text-gray-700 dark:text-gray-300">&copy; {currentYear} {companyName}. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            CIN: U01543MP2005PLC017514 | GSTIN: 23AAECM3666P1Z1
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;