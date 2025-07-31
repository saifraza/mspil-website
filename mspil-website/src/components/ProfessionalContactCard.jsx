import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ProfessionalContactCard = ({ 
  title, 
  icon: Icon, 
  address, 
  phone, 
  email, 
  hours,
  additional = []
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {address && (
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <p className="font-medium text-sm">Address:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{address}</p>
            </div>
          </div>
        )}
        
        {phone && (
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary" />
            <div>
              <p className="font-medium text-sm">Phone:</p>
              <a 
                href={`tel:${phone}`} 
                className="text-sm text-primary hover:underline"
              >
                {phone}
              </a>
            </div>
          </div>
        )}
        
        {email && (
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary" />
            <div>
              <p className="font-medium text-sm">Email:</p>
              <a 
                href={`mailto:${email}`} 
                className="text-sm text-primary hover:underline"
              >
                {email}
              </a>
            </div>
          </div>
        )}
        
        {hours && (
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 mt-1 text-primary" />
            <div>
              <p className="font-medium text-sm">Hours:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{hours}</p>
            </div>
          </div>
        )}
        
        {additional.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <item.icon className="w-4 h-4 mt-1 text-primary" />
            <div>
              <p className="font-medium text-sm">{item.label}:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProfessionalContactCard;