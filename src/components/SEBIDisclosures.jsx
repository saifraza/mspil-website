import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ExternalLink, Calendar } from 'lucide-react';

const SEBIDisclosures = () => {
  const disclosureCategories = [
    {
      title: 'Mandatory Disclosures under Regulation 46',
      items: [
        { name: 'Details of Business', status: 'Published', date: '2024-01-01' },
        { name: 'Terms and Conditions of Directors', status: 'Published', date: '2024-01-01' },
        { name: 'Composition of Board Committees', status: 'Published', date: '2024-01-01' },
        { name: 'Code of Conduct', status: 'Published', date: '2024-01-01' },
        { name: 'Vigil Mechanism/Whistle Blower Policy', status: 'Published', date: '2024-01-01' },
        { name: 'Related Party Transaction Policy', status: 'Published', date: '2024-01-01' },
        { name: 'Familiarization Programme for Directors', status: 'Published', date: '2024-01-01' },
        { name: 'Email for Investor Grievances', status: 'Active', email: 'investors@mahakaushal.com' }
      ]
    },
    {
      title: 'Financial Information',
      items: [
        { name: 'Annual Report 2023-24', status: 'Published', date: '2024-05-30' },
        { name: 'Quarterly Results Q3 FY24', status: 'Published', date: '2024-01-15' },
        { name: 'Shareholding Pattern Q3 FY24', status: 'Published', date: '2024-01-15' },
        { name: 'Corporate Governance Report', status: 'Published', date: '2024-05-30' }
      ]
    },
    {
      title: 'Compliance Reports',
      items: [
        { name: 'Secretarial Audit Report', status: 'Published', date: '2024-05-30' },
        { name: 'Certificate on Non-Disqualification of Directors', status: 'Published', date: '2024-05-30' },
        { name: 'CEO/CFO Certification', status: 'Published', date: '2024-05-30' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">SEBI Compliance Statement</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          This section contains all mandatory disclosures as required under SEBI (Listing Obligations and 
          Disclosure Requirements) Regulations, 2015. All documents are updated regularly as per regulatory requirements.
        </p>
      </div>

      {disclosureCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>
              Last updated: {new Date().toLocaleDateString('en-IN')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        {item.email ? (
                          <a href={`mailto:${item.email}`} className="text-primary hover:underline">
                            {item.email}
                          </a>
                        ) : (
                          <>
                            <Calendar className="w-3 h-3" />
                            <span>{item.date}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              item.status === 'Published' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {item.status}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {!item.email && (
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Stock Exchange Filings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            For real-time updates and all regulatory filings, please visit:
          </p>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.bseindia.com" target="_blank" rel="noopener noreferrer">
                BSE Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.nseindia.com" target="_blank" rel="noopener noreferrer">
                NSE Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEBIDisclosures;