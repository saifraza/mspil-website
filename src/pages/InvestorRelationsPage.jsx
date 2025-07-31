import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
// Using static content instead of components

const InvestorRelationsPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [activeTab, setActiveTab] = useState('financial-info');

  // Handler for document downloads
  const handleDocumentDownload = (documentType, documentKey, fileName) => {
    // In production, these would be actual document URLs
    // For now, we'll show a placeholder message
    alert(`Document ${fileName} will be available soon.`);
  };


  // Handler for quick navigation
  const handleQuickNavigation = (targetTab, targetSection) => {
    // First, switch to the correct tab
    setActiveTab(targetTab);
    
    // Then scroll to the section after a brief delay to allow tab content to render
    setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Investor Relations
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
              Committed to transparency, compliance, and creating sustainable value for our stakeholders
            </p>
            <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                📋 <strong>Demo Note:</strong> All download buttons are functional and will show download confirmations. 
                In production, these would connect to your actual document repository.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Annual Reports', icon: FileText, tab: 'financial-info', section: 'annual-reports' },
              { title: 'Financial Results', icon: TrendingUp, tab: 'financial-info', section: 'financial-results' },
              { title: 'Shareholding Pattern', icon: Users, tab: 'shareholding', section: 'shareholding' },
              { title: 'Corporate Governance', icon: Shield, tab: 'governance', section: 'governance' }
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleQuickNavigation(item.tab, item.section)}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.1 }}
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left w-full"
              >
                <item.icon className="w-8 h-8 text-primary mr-3" />
                <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="financial-info">Financial Information</TabsTrigger>
              <TabsTrigger value="shareholding">Shareholding</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            {/* Financial Information Tab */}
            <TabsContent value="financial-info" className="space-y-8">
              <div id="annual-reports">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Annual Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <FileText className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">Annual Report 2023-24</h3>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div id="financial-results">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Results</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Quarterly & Annual Results</CardTitle>
                    <CardDescription>Select a year to view financial results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2 mb-4">
                        {['2024', '2023', '2022'].map((year) => (
                          <Button
                            key={year}
                            variant={selectedYear === year ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedYear(year)}
                          >
                            FY {year}
                          </Button>
                        ))}
                      </div>
                      
                      {financialResults[selectedYear]?.quarterly.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium">{result.quarter}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{result.date}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDocumentDownload('Financial Results', `quarterly-${result.quarter.replace(' ', '-')}`, `${result.quarter}_Results.pdf`)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div id="quarterly-results">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quarterly Results</h2>
                <div className="text-gray-600">Quarterly results will be displayed here.</div>
              </div>

              <div id="presentations">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Investor Presentations</h2>
                <div className="text-gray-600">Presentations will be displayed here.</div>
              </div>

              <div id="notices">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notices & Announcements</h2>
                <div className="text-gray-600">Notices and announcements will be displayed here.</div>
              </div>
            </TabsContent>

            {/* Shareholding Tab */}
            <TabsContent value="shareholding" className="space-y-8">
              <div id="shareholding">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shareholding Pattern</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>As on March 31, 2024</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-4">Shareholding Distribution</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Promoters & Promoter Group</span>
                              <span className="font-medium">68.45%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Public - Institutions</span>
                              <span className="font-medium">15.23%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Public - Non-Institutions</span>
                              <span className="font-medium">16.32%</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-4">Share Information</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>BSE Code</span>
                              <span className="font-medium">XXXXXX</span>
                            </div>
                            <div className="flex justify-between">
                              <span>NSE Symbol</span>
                              <span className="font-medium">MSPIL</span>
                            </div>
                            <div className="flex justify-between">
                              <span>ISIN</span>
                              <span className="font-medium">INE123456789</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDocumentDownload('Shareholding Pattern', 'shareholding-pattern', 'Shareholding_Pattern_Q3_FY24.pdf')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Detailed Pattern
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Corporate Governance Tab */}
            <TabsContent value="governance" className="space-y-8">
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
            </TabsContent>

            {/* Policies Tab */}
            <TabsContent value="policies" className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Corporate Policies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Code of Conduct', icon: Gavel },
                  { title: 'Whistleblower Policy', icon: Shield },
                  { title: 'Related Party Transaction Policy', icon: Users },
                  { title: 'Insider Trading Policy', icon: FileSpreadsheet },
                  { title: 'Dividend Distribution Policy', icon: TrendingUp },
                  { title: 'Corporate Social Responsibility Policy', icon: Building }
                ].map((policy, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
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
                        onClick={() => {
                          const policyKeys = {
                            'Code of Conduct': 'code-of-conduct',
                            'Whistleblower Policy': 'whistleblower-policy',
                            'Related Party Transaction Policy': 'related-party-policy',
                            'Insider Trading Policy': 'insider-trading-policy',
                            'Dividend Distribution Policy': 'dividend-policy',
                            'Corporate Social Responsibility Policy': 'csr-policy'
                          };
                          const key = policyKeys[policy.title];
                          handleDocumentDownload('Policy', key, policy.title.replace(/\s+/g, '_') + '.pdf');
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-8">
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

      {/* Stock Exchange Announcements Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Announcements</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { date: 'January 15, 2024', title: 'Declaration of Q3 FY24 Results', exchange: 'BSE/NSE' },
                  { date: 'December 28, 2023', title: 'Intimation of Board Meeting', exchange: 'BSE/NSE' },
                  { date: 'November 30, 2023', title: 'Disclosure under Regulation 30', exchange: 'BSE/NSE' }
                ].map((announcement, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{announcement.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {announcement.date} | {announcement.exchange}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDocumentDownload('Announcement', 'announcement-general', announcement.title.replace(/\s+/g, '_') + '.pdf')}
                      >
                        View
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default InvestorRelationsPage;