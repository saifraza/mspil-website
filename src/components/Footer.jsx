import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

const companyLogoUrl = "/images/company_logo.png";
const companyName = "Mahakaushal Sugar & Power Industries Ltd.";

const Footer = () => {
  const t = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src={companyLogoUrl} alt={`${companyName} Logo`} className="h-10 w-auto" />
              <span className="font-bold text-lg text-foreground">{companyName}</span>
            </Link>
            <p className="text-sm">
              Leading in Sustainability Since 2005
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.linkedin.com/company/27478454/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/businesses" className="hover:text-primary transition-colors">Our Businesses</Link></li>
              <li><Link to="/sustainability" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-3">Investor Relations</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/investor-relations#annual-reports" className="hover:text-primary transition-colors">Annual Reports</Link></li>
              <li><Link to="/investor-relations#financial-results" className="hover:text-primary transition-colors">Financial Results</Link></li>
              <li><Link to="/investor-relations#shareholding" className="hover:text-primary transition-colors">Shareholding Pattern</Link></li>
              <li><Link to="/investor-relations#governance" className="hover:text-primary transition-colors">Corporate Governance</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-3">Contact Info</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 shrink-0 text-primary" />
                <span>Village Bachai, Dist. Narsinghpur (M.P.) - 487001</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 shrink-0 text-primary" />
                <a href="tel:+919907494252" className="hover:text-primary transition-colors">+91 99074 94252</a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 shrink-0 text-primary" />
                <a href="mailto:saifraza@mspil.in" className="hover:text-primary transition-colors">saifraza@mspil.in</a>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold text-foreground mb-3">{t('footerLegalLinks')}</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">{t('footerPrivacyPolicy')}</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">{t('footerTermsOfService')}</Link></li>
              <li><Link to="/investor-relations" className="hover:text-primary transition-colors">Investor Relations</Link></li>
              <li><Link to="/investor-disclaimer" className="hover:text-primary transition-colors">{t('footerInvestorDisclaimer')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {currentYear} {companyName}. All rights reserved.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            CIN: U01543MP2005PLC017514 | GSTIN: 23AAECM3666P1Z1
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;