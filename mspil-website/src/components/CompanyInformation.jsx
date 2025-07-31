import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, Target, Award } from 'lucide-react';

const CompanyInformation = () => {
  const companyHighlights = [
    {
      icon: Building,
      title: 'Established Excellence',
      description: 'Founded in 2005, Mahakaushal Sugar & Power Industries Ltd. has grown into a leading integrated agri-industrial enterprise.'
    },
    {
      icon: Users,
      title: 'Stakeholder Focus',
      description: 'Committed to creating sustainable value for shareholders, employees, farmers, and communities.'
    },
    {
      icon: Target,
      title: 'Strategic Vision',
      description: 'Focused on operational excellence, technological advancement, and sustainable growth across all business verticals.'
    },
    {
      icon: Award,
      title: 'Industry Leadership',
      description: 'Recognized for innovation in sugar manufacturing, ethanol production, and renewable energy generation.'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {companyHighlights.map((item, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <item.icon className="w-6 h-6 text-primary" />
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CompanyInformation;