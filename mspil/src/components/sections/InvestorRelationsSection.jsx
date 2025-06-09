import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Download, TrendingUp, ShieldCheck, HeartHandshake as Handshake, Leaf, FileText, Loader2, AlertTriangle, BarChart } from 'lucide-react'; 
import { useTranslation } from '@/contexts/LanguageContext';

// Animated stock chart component
const AnimatedStockChart = () => {
  const points = [
    { x: 0, y: 60 },
    { x: 20, y: 40 },
    { x: 40, y: 55 },
    { x: 60, y: 30 },
    { x: 80, y: 45 },
    { x: 100, y: 25 },
    { x: 120, y: 35 },
    { x: 140, y: 20 },
    { x: 160, y: 30 },
    { x: 180, y: 15 },
  ];

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <svg viewBox="0 0 200 80" className="w-full h-32">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Grid lines */}
      {[0, 20, 40, 60].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="200"
          y2={y}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeDasharray="2 2"
        />
      ))}
      
      {/* Area under the line */}
      <motion.path
        d={`${pathData} L 180 80 L 0 80 Z`}
        fill="url(#chartGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Line */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="rgb(34, 197, 94)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Animated dots */}
      {points.map((point, index) => (
        <motion.circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="rgb(34, 197, 94)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
        />
      ))}
    </svg>
  );
};

// Floating currency symbol component
const FloatingCurrency = ({ delay = 0 }) => {
  const symbols = ['$', '€', '£', '¥', '₹'];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  
  return (
    <motion.div
      className="absolute text-2xl font-bold text-primary/20 pointer-events-none"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        rotate: 0,
      }}
      animate={{
        y: -100,
        rotate: 360,
        x: Math.random() * window.innerWidth,
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {symbol}
    </motion.div>
  );
};

const InvestorRelationsSection = () => {
  const t = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [documents, setDocuments] = useState([
    { id: 1, file_name: 'Annual Report 2023-24', storage_path: 'annual-reports/Annual_Report_2023-24.pdf', category: 'Annual Reports', upload_date: '2024-03-31' },
    { id: 2, file_name: 'Q3 FY24 Results', storage_path: 'quarterly-results/Q3_FY24_Results.pdf', category: 'Quarterly Results', upload_date: '2024-01-15' },
    { id: 3, file_name: 'Earnings Call Presentation', storage_path: 'presentations/Q3_FY24_Earnings_Call_Presentation.pdf', category: 'Presentations', upload_date: '2024-01-20' },
    { id: 4, file_name: 'Code of Conduct', storage_path: 'policies/Code_of_Conduct.pdf', category: 'Policies', upload_date: '2023-04-01' },
    { id: 5, file_name: 'Shareholding Pattern Q3 FY24', storage_path: 'shareholding/Shareholding_Pattern_Q3_FY24.pdf', category: 'Shareholding', upload_date: '2024-01-10' }
  ]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [errorDocs, setErrorDocs] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredDoc, setHoveredDoc] = useState(null);

  // Define the bucket name here. Change 'website-images' to 'investor-files' or your specific bucket if needed.
  const INVESTOR_FILES_BUCKET_NAME = 'website-images'; 

  // Documents are now static, no need to fetch from database
  
  const documentsByCategory = useMemo(() => {
    return documents.reduce((acc, doc) => {
      const category = doc.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(doc);
      return acc;
    }, {});
  }, [documents]);

  const handleDownload = (storagePath, fileName) => {
    try {
      // Create download link for local files
      const link = document.createElement('a');
      link.href = `/documents/investor-relations/${storagePath}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: t('investorDocsDownloadSuccessTitle') || "Download Started",
        description: `${fileName} ${t('investorDocsDownloadSuccessDesc') || 'is downloading.'}`,
      });
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: t('errorToastTitle') || "Error",
        description: t('investorDocsGenericDownloadError') || `Failed to download ${fileName}.`,
        variant: "destructive",
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id.replace('ir-', '')]: value, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subject = `${t('investorInquirySubject') || 'Investor Inquiry from'} ${formData.name}`;
    const body = `${t('formNameLabel')}: ${formData.name}%0D%0A${t('formEmailLabel')}: ${formData.email}%0D%0A${t('formMessageLabel')}: ${formData.message}`;
    const mailtoLink = `mailto:saif.raza9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      window.location.href = mailtoLink;
      toast({
        title: t('emailClientOpenedTitle') || "Email Client Opened",
        description: t('emailClientOpenedDesc') || "Please send the email from your mail client.",
        variant: "default",
      });
      setFormData({ name: '', email: '', message: '' }); 
    } catch (error) {
      console.error("Failed to open mailto link:", error);
      toast({
        title: t('errorToastTitle') || "Error",
        description: t('emailClientErrorDesc') || "Could not open email client. Please copy the details manually.",
        variant: "destructive",
      });
    }
  };

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5 }
  };

  const highlights = [
    { 
      icon: <TrendingUp className="w-8 h-8" />, 
      titleKey: 'investorHighlight1Title',
      descriptionKey: 'investorHighlight1Desc',
      color: 'from-green-500/20 to-emerald-500/20',
      chart: true
    },
    { 
      icon: <ShieldCheck className="w-8 h-8" />, 
      titleKey: 'investorHighlight2Title',
      descriptionKey: 'investorHighlight2Desc',
      color: 'from-blue-500/20 to-indigo-500/20',
      value: '95%',
      label: 'Compliance Score'
    },
    { 
      icon: <Leaf className="w-8 h-8" />, 
      titleKey: 'investorHighlight3Title',
      descriptionKey: 'investorHighlight3Desc',
      color: 'from-teal-500/20 to-cyan-500/20',
      value: 'A+',
      label: 'ESG Rating'
    },
  ];

  const categories = ['all', ...Object.keys(documentsByCategory)];

  return (
    <section id="investor-relations" className="py-20 bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/10 relative overflow-hidden">
      {/* Floating currency symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <FloatingCurrency key={i} delay={i * 3} />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeInProps} className="text-center mb-16">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-600 dark:from-primary dark:to-green-400"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {t('investorRelationsTitle')}
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('investorRelationsSubtitle')}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <CardHeader className="relative z-10">
                  <motion.div 
                    className="text-primary mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring" }}
                  >
                    {highlight.icon}
                  </motion.div>
                  <CardTitle className="text-xl">{t(highlight.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-muted-foreground mb-4">{t(highlight.descriptionKey)}</p>
                  {highlight.chart && <AnimatedStockChart />}
                  {highlight.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="text-center mt-4"
                    >
                      <p className="text-3xl font-bold text-primary">{highlight.value}</p>
                      <p className="text-xs text-muted-foreground">{highlight.label}</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
          <Card className="mb-16 shadow-xl bg-gradient-to-br from-primary/5 to-green-500/5 dark:from-primary/10 dark:to-green-500/10 border-primary/20">
            <CardHeader className="text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <FileText className="w-12 h-12 text-primary mx-auto mb-3" />
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl">{t('investorDocsTitle')}</CardTitle>
              <CardDescription className="mt-2">{t('investorDocsSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Category filter */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category === 'all' ? t('allCategoriesLabel') || 'All' : t(category) || category}
                  </motion.button>
                ))}
              </div>

              {loadingDocs ? (
                <div className="flex justify-center items-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>
              ) : errorDocs ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
                  <p className="text-muted-foreground">{errorDocs}</p>
                </div>
              ) : Object.keys(documentsByCategory).length === 0 ? (
                <p className="text-center text-muted-foreground py-12">{t('investorNoDocsAvailable')}</p>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Object.entries(documentsByCategory)
                      .filter(([category]) => selectedCategory === 'all' || category === selectedCategory)
                      .map(([category, docs]) => (
                      <div key={category} className="mb-8">
                        <motion.h3 
                          className="text-lg font-semibold mb-4 text-primary flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <BarChart className="w-5 h-5" />
                          {t(category) || category}
                        </motion.h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {docs.map((doc, index) => (
                            <motion.div
                              key={doc.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              onHoverStart={() => setHoveredDoc(doc.id)}
                              onHoverEnd={() => setHoveredDoc(null)}
                              style={{
                                transform: hoveredDoc === doc.id ? 'perspective(1000px) rotateY(-5deg)' : 'perspective(1000px) rotateY(0deg)',
                              }}
                              className="transition-all duration-300"
                            >
                              <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 group border-primary/10 hover:border-primary/30 relative overflow-hidden">
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <CardHeader className="flex-row items-center space-x-4 p-4 relative z-10">
                                  <motion.div 
                                    className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"
                                    animate={{
                                      rotate: hoveredDoc === doc.id ? [0, -10, 10, -10, 0] : 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    <FileText className="w-8 h-8 text-primary" />
                                  </motion.div>
                                  <CardTitle className="text-base font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                                    {t(doc.file_name) || doc.file_name}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow p-4 pt-0 relative z-10">
                                  <p className="text-xs text-muted-foreground mb-1">
                                    {t('investorDocCategoryLabel') || 'Category'}: <span className="font-medium text-foreground/80">{t(doc.category) || doc.category}</span>
                                  </p>
                                  {doc.upload_date && (
                                    <p className="text-xs text-muted-foreground">
                                      {t('investorDocUploadedLabel') || 'Uploaded'}: <span className="font-medium text-foreground/80">{new Date(doc.upload_date).toLocaleDateString()}</span>
                                    </p>
                                  )}
                                </CardContent>
                                <div className="p-4 mt-auto relative z-10">
                                  <Button 
                                    size="sm" 
                                    className="w-full transform transition-all group-hover:scale-105 group-hover:bg-primary/90" 
                                    onClick={() => handleDownload(doc.storage_path, doc.file_name)}
                                  >
                                    <Download className="mr-2 h-4 w-4" /> {t('downloadButtonText') || 'Download'}
                                  </Button>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }}>
          <Card className="max-w-2xl mx-auto shadow-2xl p-6 sm:p-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/50 dark:to-teal-900/50 border-primary/30 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
            <CardHeader className="text-center p-0 mb-6 relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring" }}
              >
                <Handshake className="w-12 h-12 text-primary mx-auto mb-3"/>
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl">{t('investorContactFormTitle')}</CardTitle>
              <CardDescription className="mt-2">{t('investorContactFormSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Label htmlFor="ir-name">{t('formFullNameLabel')}</Label>
                  <Input 
                    id="ir-name" 
                    name="name"
                    type="text" 
                    placeholder={t('formFullNamePlaceholder')} 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="transition-all focus:scale-[1.02]"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Label htmlFor="ir-email">{t('formEmailLabel')}</Label>
                  <Input 
                    id="ir-email" 
                    name="email"
                    type="email" 
                    placeholder={t('formEmailPlaceholder')} 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="transition-all focus:scale-[1.02]"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Label htmlFor="ir-message">{t('formMessageLabel')}</Label>
                  <Textarea 
                    id="ir-message" 
                    name="message"
                    placeholder={t('formMessagePlaceholderInvestors')} 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows={4} 
                    required 
                    className="transition-all focus:scale-[1.02]"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button type="submit" className="w-full" size="lg">
                    {t('formSubmitButton')}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorRelationsSection;