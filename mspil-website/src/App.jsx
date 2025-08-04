import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useWebVitals } from '@/hooks/useWebVitals';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutUsPage = lazy(() => import('@/pages/AboutUsPage'));
const OurBusinessesPage = lazy(() => import('@/pages/OurBusinessesPage'));
const SustainabilityPage = lazy(() => import('@/pages/SustainabilityPage'));
const DataInsightsPage = lazy(() => import('@/pages/DataInsightsPage'));
const InvestorRelationsPage = lazy(() => import('@/pages/InvestorRelationsPage'));
const NewsMediaPage = lazy(() => import('@/pages/NewsMediaPage'));
const CareersPage = lazy(() => import('@/pages/CareersPage'));
const ContactUsPage = lazy(() => import('@/pages/ContactUsPage'));
const CSRPage = lazy(() => import('@/pages/CSRPage'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage'));
const InvestorDisclaimerPage = lazy(() => import('@/pages/InvestorDisclaimerPage'));
const InvestorPresentationPage = lazy(() => import('@/pages/InvestorPresentationPage'));
const PolicyViewerPage = lazy(() => import('@/pages/PolicyViewerPage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));


// Loading component with bio-energy theme
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-gradient-to-br from-bio-green-900 to-bio-green-800">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-bio-green-700 rounded-full animate-spin border-t-bio-green-400"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-bio-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

function App() {
  // Monitor Core Web Vitals for performance
  useWebVitals();
  
  // Always use dark theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/businesses" element={<OurBusinessesPage />} />
                <Route path="/sustainability" element={<SustainabilityPage />} />
                <Route path="/data-insights" element={<Navigate to="/investor-relations" replace />} />
                <Route path="/investor-relations" element={<InvestorRelationsPage />} />
                <Route path="/news-media" element={<NewsMediaPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/csr" element={<CSRPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/investor-disclaimer" element={<InvestorDisclaimerPage />} />
                <Route path="/investor-presentation" element={<InvestorPresentationPage />} />
                <Route path="/policy/:policyId" element={<PolicyViewerPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
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