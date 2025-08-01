import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Users, Sparkles, ChevronRight, ImageOff } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import LazyImage from '@/components/LazyImage';

// Quick fix for getImage function
const getImage = (category, fallback, index) => fallback;

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
    // Set culture image from CMS
    const cultureImageUrl = getImage('career-images', `/images/${cultureImagePath}`, 0);
    setCultureImage(cultureImageUrl);

    // Set testimonial images from CMS
    const updatedTestimonials = initialTestimonials.map((testimonial, index) => {
      const imageUrl = getImage('career-images', `/images/${testimonial.imagePath}`, index + 1);
      return { ...testimonial, imageUrl };
    });
    setTestimonialsWithImages(updatedTestimonials);
  }, [initialTestimonials, cultureImagePath, getImage]);


  return (
    <section id="careers" className="py-16 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInProps} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('careersTitle')}</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('careersSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 items-start">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center"><Sparkles className="mr-3 w-7 h-7 text-primary"/>{t('careersCultureTitle')}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t('careersCultureDesc1')}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {t('careersCultureDesc2')}
            </p>
            {cultureImage ? (
              <LazyImage alt={t(cultureImageAltKey)} className="w-full h-64 object-cover rounded-lg mt-6 shadow-md" src={cultureImage} />
            ) : (
              <div className="w-full h-64 bg-muted rounded-lg mt-6 shadow-md flex items-center justify-center">
                <ImageOff className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center"><Briefcase className="mr-3 w-7 h-7 text-primary"/>{t('careersOpeningsTitle')}</h3>
            <div className="space-y-4">
              {jobOpenings.length > 0 ? jobOpenings.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:bg-gray-800/70 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-4 group-hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-white">{t(job.titleKey)}</p>
                        <p className="text-sm text-gray-300">{t(job.locationKey)} • {t(job.typeKey)}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">{t('careersApplyButton')} <ChevronRight className="w-4 h-4 ml-1"/></Button>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <p className="text-gray-400">{t('careersNoOpenings')}</p>
              )}
            </div>
             <Button variant="link" className="mt-6 text-primary">{t('careersViewAllButton')} <span aria-hidden="true">→</span></Button>
          </motion.div>
        </div>
        
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.5 }} className="mb-12">
          <h3 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">{t('careersTestimonialsTitle')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonialsWithImages.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:bg-gray-800/70 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    {testimonial.imageUrl ? (
                      <LazyImage alt={t(testimonial.imageAltKey)} className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-primary" src={testimonial.imageUrl} />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 border-2 border-primary">
                        <ImageOff className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="text-gray-300 italic">"{t(testimonial.quoteKey)}"</p>
                      <p className="mt-3 font-semibold text-primary">- {t(testimonial.authorKey)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }}>
          <div className="max-w-2xl mx-auto bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:bg-gray-800/70 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-6 sm:p-8">
            <div className="text-center mb-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-3"/>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{t('careersWorkWithUsTitle')}</h3>
              <p className="mt-2 text-gray-300">{t('careersWorkWithUsDesc')}</p>
            </div>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="career-name" className="text-gray-200">{t('formFullNameLabel')}</Label>
                    <Input id="career-name" type="text" placeholder={t('formFullNamePlaceholder')} />
                  </div>
                  <div>
                    <Label htmlFor="career-email" className="text-gray-200">{t('formEmailLabel')}</Label>
                    <Input id="career-email" type="email" placeholder={t('formEmailPlaceholder')} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="career-resume" className="text-gray-200">{t('formResumeLabel')}</Label>
                  <Input id="career-resume" type="file" />
                </div>
                <div>
                  <Label htmlFor="career-message" className="text-gray-200">{t('formMessageLabel')}</Label>
                  <Textarea id="career-message" placeholder={t('formMessagePlaceholderCareers') } rows={4} />
                </div>
                <Button type="submit" className="w-full" size="lg">{t('formSubmitButton')}</Button>
              </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersSection;