import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Development Notice Ticker Component
const DevelopmentTicker = () => {
  return (
    <div className="bg-yellow-500 text-black py-1.5 overflow-hidden fixed top-0 left-0 right-0 z-50 border-b border-yellow-600">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-8 font-bold text-xs tracking-wide">
          🚧 WEBSITE UNDER DEVELOPMENT - ALL NUMBERS SHOWN ARE DEMO VALUES 🚧
        </span>
        <span className="mx-8 font-bold text-xs tracking-wide">
          🚧 WEBSITE UNDER DEVELOPMENT - ALL NUMBERS SHOWN ARE DEMO VALUES 🚧
        </span>
        <span className="mx-8 font-bold text-xs tracking-wide">
          🚧 WEBSITE UNDER DEVELOPMENT - ALL NUMBERS SHOWN ARE DEMO VALUES 🚧
        </span>
        <span className="mx-8 font-bold text-xs tracking-wide">
          🚧 WEBSITE UNDER DEVELOPMENT - ALL NUMBERS SHOWN ARE DEMO VALUES 🚧
        </span>
        <span className="mx-8 font-bold text-xs tracking-wide">
          🚧 WEBSITE UNDER DEVELOPMENT - ALL NUMBERS SHOWN ARE DEMO VALUES 🚧
        </span>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <DevelopmentTicker />
      <Navbar />
      <main className="flex-grow pt-28"> {/* Added pt-28 for fixed navbar + ticker overlap */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;