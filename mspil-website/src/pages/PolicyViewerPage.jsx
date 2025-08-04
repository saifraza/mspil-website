import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileText, Calendar, Building2 } from 'lucide-react';
import { pageBackgrounds } from '@/utils/backgroundStyles';
import UnifiedBackground from '@/components/ui/UnifiedBackground';

// Policy content data
const policyContent = {
  'code-of-conduct': {
    title: 'Code of Conduct',
    lastUpdated: 'January 1, 2024',
    content: [
      {
        heading: 'Introduction',
        text: 'Mahakaushal Sugar & Power Industries Ltd. (MSPIL) is committed to conducting business with the highest standards of ethics, integrity, and compliance with all applicable laws. This Code of Conduct applies to all directors, officers, employees, and business partners.'
      },
      {
        heading: 'Core Values',
        text: 'Our core values guide every decision we make and every action we take:',
        list: [
          'Integrity: We act with honesty and adhere to the highest ethical standards',
          'Respect: We treat everyone with dignity and value diverse perspectives',
          'Excellence: We strive for the highest quality in everything we do',
          'Sustainability: We are committed to environmental and social responsibility',
          'Innovation: We embrace change and continuously seek improvement'
        ]
      },
      {
        heading: 'Standards of Conduct',
        sections: [
          {
            subtitle: '1. Business Ethics',
            content: 'All business dealings must be conducted with integrity, transparency, and in compliance with applicable laws. Bribery, corruption, and any form of unethical business practice are strictly prohibited.'
          },
          {
            subtitle: '2. Conflicts of Interest',
            content: 'Employees must avoid situations where personal interests conflict with company interests. Any potential conflicts must be disclosed to management immediately.'
          },
          {
            subtitle: '3. Confidentiality',
            content: 'Confidential information must be protected and used only for legitimate business purposes. This obligation continues even after employment ends.'
          },
          {
            subtitle: '4. Fair Dealing',
            content: 'We deal fairly with customers, suppliers, competitors, and employees. No one should take unfair advantage through manipulation, concealment, or misrepresentation.'
          },
          {
            subtitle: '5. Workplace Conduct',
            content: 'We maintain a professional, respectful, and safe work environment free from discrimination, harassment, and violence.'
          }
        ]
      },
      {
        heading: 'Compliance and Reporting',
        text: 'All employees are responsible for understanding and complying with this Code. Violations should be reported through appropriate channels, including the whistleblower mechanism. No retaliation will be tolerated against those who report violations in good faith.'
      }
    ]
  },
  'whistleblower-policy': {
    title: 'Whistleblower Policy',
    lastUpdated: 'January 1, 2024',
    content: [
      {
        heading: 'Purpose',
        text: 'This policy provides a mechanism for reporting unethical behavior, actual or suspected fraud, or violations of company policies while protecting whistleblowers from retaliation.'
      },
      {
        heading: 'Scope',
        text: 'This policy applies to all employees, directors, vendors, contractors, and other stakeholders of MSPIL.'
      },
      {
        heading: 'Protected Disclosures',
        text: 'The following concerns can be reported under this policy:',
        list: [
          'Financial irregularities or fraud',
          'Corruption, bribery, or theft',
          'Violation of company policies or code of conduct',
          'Deliberate violation of laws/regulations',
          'Misuse of company resources',
          'Breach of IT security or data privacy',
          'Any other unethical behavior'
        ]
      },
      {
        heading: 'Reporting Mechanism',
        sections: [
          {
            subtitle: 'Reporting Channels',
            content: 'Reports can be made through:\n• Direct reporting to the Audit Committee Chairman\n• Dedicated email: whistleblower@mspil.in\n• Written complaints to the registered office\n• Anonymous reporting through the company website'
          },
          {
            subtitle: 'Investigation Process',
            content: 'All reports will be promptly investigated by the Audit Committee or designated personnel. The identity of the whistleblower will be kept confidential to the extent possible.'
          }
        ]
      },
      {
        heading: 'Protection Against Retaliation',
        text: 'The company prohibits retaliation against whistleblowers who make reports in good faith. Any retaliation will result in disciplinary action, including termination.'
      }
    ]
  },
  'related-party-policy': {
    title: 'Related Party Transaction Policy',
    lastUpdated: 'January 1, 2024',
    content: [
      {
        heading: 'Objective',
        text: 'This policy regulates transactions between MSPIL and its related parties to ensure transparency, fairness, and compliance with applicable laws and regulations.'
      },
      {
        heading: 'Definitions',
        sections: [
          {
            subtitle: 'Related Party',
            content: 'Includes directors, key managerial personnel, relatives, entities where such persons have significant influence, and as defined under Companies Act and SEBI regulations.'
          },
          {
            subtitle: 'Related Party Transaction',
            content: 'Any transaction involving transfer of resources, services, or obligations between the company and a related party.'
          }
        ]
      },
      {
        heading: 'Policy Framework',
        text: 'All related party transactions must be:',
        list: [
          'On arms length basis',
          'In the ordinary course of business',
          'Approved by the Audit Committee',
          'Approved by Board/shareholders where required',
          'Properly disclosed in financial statements'
        ]
      },
      {
        heading: 'Approval Process',
        sections: [
          {
            subtitle: 'Audit Committee Approval',
            content: 'All related party transactions require prior approval of the Audit Committee. The Committee will review the nature, material terms, and business rationale.'
          },
          {
            subtitle: 'Board/Shareholder Approval',
            content: 'Transactions exceeding prescribed thresholds require Board approval. Material related party transactions require shareholder approval.'
          }
        ]
      }
    ]
  },
  'insider-trading-policy': {
    title: 'Insider Trading Policy',
    lastUpdated: 'January 1, 2024',
    content: [
      {
        heading: 'Introduction',
        text: 'This policy regulates trading in securities of MSPIL by insiders and ensures compliance with SEBI (Prohibition of Insider Trading) Regulations, 2015.'
      },
      {
        heading: 'Definitions',
        sections: [
          {
            subtitle: 'Insider',
            content: 'Any person who is a connected person or in possession of unpublished price sensitive information (UPSI).'
          },
          {
            subtitle: 'UPSI',
            content: 'Information relating to the company that is not generally available and which upon becoming public is likely to materially affect the price of securities.'
          }
        ]
      },
      {
        heading: 'Trading Restrictions',
        text: 'Insiders are prohibited from:',
        list: [
          'Trading in company securities when in possession of UPSI',
          'Communicating UPSI to any person',
          'Counseling others to trade based on UPSI',
          'Trading during the trading window closure period'
        ]
      },
      {
        heading: 'Trading Window',
        sections: [
          {
            subtitle: 'Closure Period',
            content: 'Trading window shall be closed from the end of every quarter till 48 hours after declaration of financial results.'
          },
          {
            subtitle: 'Pre-clearance',
            content: 'Designated persons must obtain pre-clearance for trades above threshold limits during open trading window.'
          }
        ]
      },
      {
        heading: 'Disclosure Requirements',
        text: 'Designated persons must disclose their holdings and trading in company securities as per prescribed formats and timelines.'
      }
    ]
  },
  'dividend-policy': {
    title: 'Dividend Distribution Policy',
    lastUpdated: 'January 1, 2024',
    content: [
      {
        heading: 'Objective',
        text: 'This policy outlines the framework for dividend declaration and distribution, balancing shareholder returns with business growth requirements.'
      },
      {
        heading: 'Dividend Philosophy',
        text: 'MSPIL aims to maintain a consistent and predictable dividend payout while retaining sufficient funds for growth, debt servicing, and contingencies.'
      },
      {
        heading: 'Factors Considered',
        text: 'The Board considers the following factors when recommending dividends:',
        list: [
          'Current year profits and cash flow',
          'Retained earnings and reserves',
          'Capital expenditure requirements',
          'Debt servicing obligations',
          'Working capital requirements',
          'Economic conditions and business outlook',
          'Statutory requirements and restrictions'
        ]
      },
      {
        heading: 'Types of Dividend',
        sections: [
          {
            subtitle: 'Interim Dividend',
            content: 'The Board may declare interim dividend during the financial year based on interim financial results.'
          },
          {
            subtitle: 'Final Dividend',
            content: 'Final dividend is recommended by the Board and approved by shareholders at the Annual General Meeting.'
          },
          {
            subtitle: 'Special Dividend',
            content: 'Special dividend may be declared in case of exceptional profits or special circumstances.'
          }
        ]
      },
      {
        heading: 'Target Payout',
        text: 'The company endeavors to maintain a dividend payout ratio of 20-30% of consolidated profit after tax, subject to applicable regulations and business requirements.'
      }
    ]
  },
  'csr-policy': {
    title: 'Corporate Social Responsibility Policy',
    lastUpdated: 'January 1, 2024',
    content: [
      {
        heading: 'Vision',
        text: 'To contribute to sustainable development of communities around our operations through impactful social initiatives while conducting business in a socially responsible manner.'
      },
      {
        heading: 'CSR Philosophy',
        text: 'MSPIL believes in giving back to society and creating shared value for all stakeholders. Our CSR initiatives focus on inclusive growth and sustainable development.'
      },
      {
        heading: 'Focus Areas',
        text: 'Our CSR activities are concentrated in the following areas:',
        list: [
          'Education: Promoting education, including special education and vocational skills',
          'Healthcare: Preventive healthcare, sanitation, and providing safe drinking water',
          'Rural Development: Infrastructure development in rural areas',
          'Environmental Sustainability: Ecological balance, conservation of natural resources',
          'Women Empowerment: Programs for women empowerment and gender equality',
          'Skill Development: Enhancing vocational skills and livelihood opportunities'
        ]
      },
      {
        heading: 'Implementation',
        sections: [
          {
            subtitle: 'CSR Committee',
            content: 'The Board has constituted a CSR Committee to formulate and monitor CSR policy and activities.'
          },
          {
            subtitle: 'Annual Action Plan',
            content: 'The Committee prepares an annual action plan detailing projects, budgets, timelines, and implementation mechanisms.'
          },
          {
            subtitle: 'Partners',
            content: 'CSR activities may be undertaken directly or through registered trusts, societies, or Section 8 companies.'
          }
        ]
      },
      {
        heading: 'Budget Allocation',
        text: 'The company shall spend at least 2% of average net profits of preceding three financial years on CSR activities as per Companies Act provisions.'
      }
    ]
  },
  'corporate-governance-policy': {
    title: 'Corporate Governance Policy',
    lastUpdated: 'January 1, 2024',
    content: [
      {
        heading: 'Introduction',
        text: 'MSPIL is committed to maintaining the highest standards of corporate governance to enhance long-term shareholder value while protecting interests of all stakeholders.'
      },
      {
        heading: 'Governance Principles',
        text: 'Our governance framework is built on:',
        list: [
          'Transparency in all dealings',
          'Accountability at all levels',
          'Fair and equitable treatment of stakeholders',
          'Compliance with laws and regulations',
          'Ethical business conduct',
          'Effective risk management'
        ]
      },
      {
        heading: 'Board Structure',
        sections: [
          {
            subtitle: 'Composition',
            content: 'The Board comprises executive, non-executive, and independent directors with diverse skills and experience. At least half the Board consists of independent directors.'
          },
          {
            subtitle: 'Responsibilities',
            content: 'The Board provides strategic guidance, monitors performance, ensures compliance, and protects stakeholder interests.'
          },
          {
            subtitle: 'Board Committees',
            content: 'Specialized committees include Audit Committee, Nomination & Remuneration Committee, Stakeholders Relationship Committee, and Risk Management Committee.'
          }
        ]
      },
      {
        heading: 'Stakeholder Engagement',
        text: 'We actively engage with all stakeholders including shareholders, employees, customers, suppliers, and communities through various channels and forums.'
      },
      {
        heading: 'Disclosure and Transparency',
        text: 'We ensure timely, accurate, and comprehensive disclosure of financial and non-financial information through annual reports, website, stock exchange filings, and investor communications.'
      }
    ]
  }
};

const PolicyViewerPage = () => {
  const { policyId } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Load policy content
    if (policyId && policyContent[policyId]) {
      setPolicy(policyContent[policyId]);
    } else {
      // Redirect to investor relations if policy not found
      navigate('/investor-relations#reports');
    }
  }, [policyId, navigate]);

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      {/* Header with Back Button */}
      <section className="relative pt-24 pb-8 bg-gradient-to-b from-gray-900/50 to-transparent backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={() => navigate('/investor-relations#reports')}
            className="mb-6 bg-gray-800/50 hover:bg-gray-700/50 text-white border border-gray-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Investor Relations
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {policy.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Last Updated: {policy.lastUpdated}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                MSPIL Corporate Policy
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gray-800/60 backdrop-blur-xl border border-gray-700">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                {policy.content.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mb-8 last:mb-0"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
                    
                    {section.text && (
                      <p className="text-gray-300 mb-4 leading-relaxed">{section.text}</p>
                    )}
                    
                    {section.list && (
                      <ul className="list-disc list-inside space-y-2 mb-4">
                        {section.list.map((item, idx) => (
                          <li key={idx} className="text-gray-300">{item}</li>
                        ))}
                      </ul>
                    )}
                    
                    {section.sections && (
                      <div className="space-y-6">
                        {section.sections.map((subsection, subIdx) => (
                          <div key={subIdx} className="ml-4">
                            <h3 className="text-lg font-semibold text-green-400 mb-2">
                              {subsection.subtitle}
                            </h3>
                            <p className="text-gray-300 whitespace-pre-line">{subsection.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-12 pt-8 border-t border-gray-700"
              >
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Official MSPIL Policy Document</span>
                  </div>
                  <div>
                    For queries: <a href="mailto:cs@mspil.in" className="text-green-400 hover:text-green-300">cs@mspil.in</a>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default PolicyViewerPage;