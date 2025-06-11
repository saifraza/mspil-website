import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Users, Sparkles, ChevronRight, ImageOff } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
// Removed supabaseImages dependency

const CareersSection = () => {
  const t = useTranslation();
  const [cultureImage, setCultureImage] = useState('');
  const [testimonialsWithImages, setTestimonialsWithImages] = useState([]);

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const jobOpenings = useMemo(() => [
    { titleKey: "careerJob1Title", locationKey: "careerJob1Location", typeKey: "careerJob1Type" },
    { titleKey: "careerJob2Title", locationKey: "careerJob2Location", typeKey: "careerJob2Type" },
    { titleKey: "careerJob3Title", locationKey: "careerJob3Location", typeKey: "careerJob3Type" },
  ], []);
  
  const initialTestimonials = useMemo(() => [
    { quoteKey: "careerTestimonial1Quote", authorKey: "careerTestimonial1Author", imagePath: "careers/testimonial_priya.jpg", imageAltKey: "careerTestimonial1ImgAlt" },
    { quoteKey: "careerTestimonial2Quote", authorKey: "careerTestimonial2Author", imagePath: "careers/testimonial_rajesh.jpg", imageAltKey: "careerTestimonial2ImgAlt" },
  ], []);

  const cultureImagePath = 'careers/culture_collaboration.jpg';
  const cultureImageAltKey = 'careerCultureImgAlt';

  useEffect(() => {
    // Set culture image from local path
    if (cultureImagePath) {
      setCultureImage(`/images/${cultureImagePath}`);
    }

    // Set testimonial images from local paths
    const updatedTestimonials = initialTestimonials.map((testimonial) => {
      if (testimonial.imagePath) {
        return { ...testimonial, imageUrl: `/images/${testimonial.imagePath}` };
      }
      return testimonial;
    });
    setTestimonialsWithImages(updatedTestimonials);
  }, [initialTestimonials, cultureImagePath]);


  return (
    <section id="careers" className="section-padding bg-background dark:bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInProps} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('careersTitle')}</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {t('careersSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center"><Sparkles className="mr-3 w-7 h-7 text-primary"/>{t('careersCultureTitle')}</h3>
            <p className="text-foreground/70 mb-4 leading-relaxed">
              {t('careersCultureDesc1')}
            </p>
            <p className="text-foreground/70 leading-relaxed">
              {t('careersCultureDesc2')}
            </p>
            {cultureImage ? (
              <img  alt={t(cultureImageAltKey)} className="w-full h-64 object-cover rounded-lg mt-6 shadow-md" src={cultureImage} />
            ) : (
              <div className="w-full h-64 bg-muted rounded-lg mt-6 shadow-md flex items-center justify-center">
                <ImageOff className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center"><Briefcase className="mr-3 w-7 h-7 text-primary"/>{t('careersOpeningsTitle')}</h3>
            <div className="space-y-4">
              {jobOpenings.length > 0 ? jobOpenings.map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{t(job.titleKey)}</p>
                        <p className="text-sm text-muted-foreground">{t(job.locationKey)} • {t(job.typeKey)}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">{t('careersApplyButton')} <ChevronRight className="w-4 h-4 ml-1"/></Button>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <p className="text-muted-foreground">{t('careersNoOpenings')}</p>
              )}
            </div>
             <Button variant="link" className="mt-6 text-primary">{t('careersViewAllButton')} <span aria-hidden="true">→</span></Button>
          </motion.div>
        </div>
        
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.5 }} className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">{t('careersTestimonialsTitle')}</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonialsWithImages.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 border-primary/20">
                  <CardContent className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-0">
                    {testimonial.imageUrl ? (
                      <img  alt={t(testimonial.imageAltKey)} className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-primary" src={testimonial.imageUrl} />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center flex-shrink-0 border-2 border-primary">
                        <ImageOff className="w-10 h-10 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="text-foreground/80 italic">"{t(testimonial.quoteKey)}"</p>
                      <p className="mt-3 font-semibold text-primary">- {t(testimonial.authorKey)}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }}>
          <Card className="max-w-2xl mx-auto shadow-xl p-6 sm:p-8">
            <CardHeader className="text-center p-0 mb-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-3"/>
              <CardTitle className="text-2xl md:text-3xl">{t('careersWorkWithUsTitle')}</CardTitle>
              <CardDescription className="mt-2">{t('careersWorkWithUsDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="career-name">{t('formFullNameLabel')}</Label>
                    <Input id="career-name" type="text" placeholder={t('formFullNamePlaceholder')} />
                  </div>
                  <div>
                    <Label htmlFor="career-email">{t('formEmailLabel')}</Label>
                    <Input id="career-email" type="email" placeholder={t('formEmailPlaceholder')} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="career-resume">{t('formResumeLabel')}</Label>
                  <Input id="career-resume" type="file" />
                </div>
                <div>
                  <Label htmlFor="career-message">{t('formMessageLabel')}</Label>
                  <Textarea id="career-message" placeholder={t('formMessagePlaceholderCareers') } rows={4} />
                </div>
                <Button type="submit" className="w-full" size="lg">{t('formSubmitButton')}</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersSection;