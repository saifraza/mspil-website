import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Direct imports to debug issues
import HomePage from '@/pages/HomePage';
import AboutUsPage from '@/pages/AboutUsPage';
import OurBusinessesPage from '@/pages/OurBusinessesPage';
import SustainabilityPage from '@/pages/SustainabilityPage';
import DataInsightsPage from '@/pages/DataInsightsPage';
import InvestorRelationsPage from '@/pages/InvestorRelationsPage';
import NewsMediaPage from '@/pages/NewsMediaPage';
import CareersPage from '@/pages/CareersPage';
import ContactUsPage from '@/pages/ContactUsPage';
import CSRPage from '@/pages/CSRPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import InvestorDisclaimerPage from '@/pages/InvestorDisclaimerPage';

// CMS Pages
import SimpleCMS from '@/pages/SimpleCMS';

// Loading component with bio-energy theme
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-gradient-to-br from-bio-green-50 to-eco-lime-50">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-bio-green-200 rounded-full animate-spin border-t-bio-green-600"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-bio-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/businesses" element={<OurBusinessesPage />} />
                <Route path="/sustainability" element={<SustainabilityPage />} />
                <Route path="/data-insights" element={<DataInsightsPage />} />
                <Route path="/investor-relations" element={<InvestorRelationsPage />} />
                <Route path="/news-media" element={<NewsMediaPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/csr" element={<CSRPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/investor-disclaimer" element={<InvestorDisclaimerPage />} />
                
                {/* CMS Routes */}
                <Route path="/simple-cms" element={<SimpleCMS />} />
              </Routes>
            </Suspense>
          </Layout>
          <Toaster />
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;