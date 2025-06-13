import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Heart, 
  Home, 
  Download,
  Users,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Stethoscope,
  Droplets,
  Sprout
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useImages } from '@/contexts/ImageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CSRPage = () => {
  const t = useTranslation();
  const { getImage } = useImages();

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const handleCSRReportDownload = (year) => {
    // In production, these would be actual document URLs
    alert(`CSR Report ${year} will be available soon.`);
  };

  const csrSpendData = [
    { year: '2023-24', amount: '₹2.5 Cr', percentage: '2.1%', status: 'Completed' },
    { year: '2022-23', amount: '₹2.2 Cr', percentage: '2.0%', status: 'Completed' },
    { year: '2021-22', amount: '₹1.8 Cr', percentage: '2.2%', status: 'Completed' }
  ];

  const educationPrograms = [
    {
      title: t('csrEducationProgram1'),
      description: t('csrEducationProgram1Desc'),
      icon: BookOpen,
      beneficiaries: '500+ children',
      image: '/images/csr/education/school-infrastructure.jpg',
      getImageUrl: () => getImage('csr-education-images', '/images/csr/education/school-infrastructure.jpg', 0)
    },
    {
      title: t('csrEducationProgram2'),
      description: t('csrEducationProgram2Desc'),
      icon: Users,
      beneficiaries: '200+ youth',
      image: '/images/csr/education/digital-literacy.jpg',
      getImageUrl: () => getImage('csr-education-images', '/images/csr/education/digital-literacy.jpg', 1)
    },
    {
      title: t('csrEducationProgram3'),
      description: t('csrEducationProgram3Desc'),
      icon: GraduationCap,
      beneficiaries: '300+ adults',
      image: '/images/csr/education/skill-training-center.jpg',
      getImageUrl: () => getImage('csr-education-images', '/images/csr/education/skill-training-center.jpg', 2)
    }
  ];

  const healthcarePrograms = [
    {
      title: t('csrHealthcareProgram1'),
      description: t('csrHealthcareProgram1Desc'),
      icon: Stethoscope,
      beneficiaries: '1000+ patients',
      image: '/images/csr/healthcare/mobile-health-clinic.jpg',
      getImageUrl: () => getImage('csr-healthcare-images', '/images/csr/healthcare/mobile-health-clinic.jpg', 0)
    },
    {
      title: t('csrHealthcareProgram2'),
      description: t('csrHealthcareProgram2Desc'),
      icon: Heart,
      beneficiaries: '2000+ people',
      image: '/images/csr/healthcare/health-camp.jpg',
      getImageUrl: () => getImage('csr-healthcare-images', '/images/csr/healthcare/health-camp.jpg', 1)
    }
  ];

  const ruralDevPrograms = [
    {
      title: t('csrRuralDevProgram1'),
      description: t('csrRuralDevProgram1Desc'),
      icon: Droplets,
      beneficiaries: '15 villages',
      image: '/images/csr/rural-development/water-conservation.jpg',
      getImageUrl: () => getImage('csr-rural-images', '/images/csr/rural-development/water-conservation.jpg', 0)
    },
    {
      title: t('csrRuralDevProgram2'),
      description: t('csrRuralDevProgram2Desc'),
      icon: Sprout,
      beneficiaries: '800+ farmers',
      image: '/images/csr/rural-development/farmers-training.jpg',
      getImageUrl: () => getImage('csr-rural-images', '/images/csr/rural-development/farmers-training.jpg', 1)
    }
  ];

  const galleryImages = [
    { src: '/images/csr/education/school-infrastructure.jpg', alt: 'Education Program', title: 'School Infrastructure Development', getImageUrl: () => getImage('csr-education-images', '/images/csr/education/school-infrastructure.jpg', 0) },
    { src: '/images/csr/healthcare/mobile-health-clinic.jpg', alt: 'Healthcare Camp', title: 'Mobile Health Clinic', getImageUrl: () => getImage('csr-healthcare-images', '/images/csr/healthcare/mobile-health-clinic.jpg', 0) },
    { src: '/images/csr/rural-development/water-conservation.jpg', alt: 'Rural Development', title: 'Water Conservation Project', getImageUrl: () => getImage('csr-rural-images', '/images/csr/rural-development/water-conservation.jpg', 0) },
    { src: '/images/csr/education/skill-training-center.jpg', alt: 'Skill Training', title: 'Vocational Training Center', getImageUrl: () => getImage('csr-education-images', '/images/csr/education/skill-training-center.jpg', 2) },
    { src: '/images/csr/healthcare/health-camp.jpg', alt: 'Health Awareness', title: 'Health Awareness Camp', getImageUrl: () => getImage('csr-healthcare-images', '/images/csr/healthcare/health-camp.jpg', 1) },
    { src: '/images/csr/rural-development/farmers-training.jpg', alt: 'Farmers Training', title: 'Agricultural Training Program', getImageUrl: () => getImage('csr-rural-images', '/images/csr/rural-development/farmers-training.jpg', 1) }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('csrPageTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('csrPageSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CSR Philosophy */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('csrPhilosophyTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('csrPhilosophyDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CSR Spend Overview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('csrSpendTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('csrSpendSubtitle')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">CSR Investment as per Companies Act 2013</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Financial Year</th>
                        <th className="text-left py-3 px-4">CSR Amount</th>
                        <th className="text-left py-3 px-4">% of Net Profit</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csrSpendData.map((item, index) => (
                        <motion.tr
                          key={index}
                          {...fadeInProps}
                          transition={{ ...fadeInProps.transition, delay: index * 0.1 }}
                          className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="py-3 px-4 font-medium">{item.year}</td>
                          <td className="py-3 px-4">{item.amount}</td>
                          <td className="py-3 px-4">{item.percentage}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {item.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Initiatives */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-12">
            <div className="inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('csrEducationTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('csrEducationDesc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {educationPrograms.map((program, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={program.getImageUrl() || program.image}
                      alt={program.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <program.icon className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-semibold">{program.beneficiaries}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Access */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-12">
            <div className="inline-flex p-4 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('csrHealthcareTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('csrHealthcareDesc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {healthcarePrograms.map((program, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={program.getImageUrl() || program.image}
                      alt={program.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <program.icon className="w-6 h-6 text-red-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-semibold">{program.beneficiaries}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rural Development */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-12">
            <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
              <Home className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('csrRuralDevTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('csrRuralDevDesc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {ruralDevPrograms.map((program, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={program.getImageUrl() || program.image}
                      alt={program.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <program.icon className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-semibold">{program.beneficiaries}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('csrGalleryTitle')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={image.getImageUrl() || image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-semibold">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInProps} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('csrReportTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {csrSpendData.map((item, index) => (
              <motion.div
                key={index}
                {...fadeInProps}
                transition={{ ...fadeInProps.transition, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <Download className="w-12 h-12 text-primary mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">CSR Report {item.year}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Investment: {item.amount}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleCSRReportDownload(item.year)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t('csrReportDownload')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CSRPage;