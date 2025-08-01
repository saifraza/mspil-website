import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { 
  Mail, Phone, User, Building2, MessageSquare, 
  CheckCircle, AlertCircle, Loader2, Send, 
  Sparkles, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const EnhancedContactForm = ({ className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [focusedField, setFocusedField] = useState(null);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare },
    { value: 'secretary', label: 'Company Secretary / Compliance', icon: Building2 },
    { value: 'finance', label: 'Finance', icon: Building2 },
    { value: 'technical', label: 'Technical / Projects', icon: Building2 },
    { value: 'product', label: 'Product Information', icon: Building2 },
    { value: 'partnership', label: 'Partnerships', icon: Building2 }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Inquiry type validation
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for form
      const form = e.target;
      form.classList.add('animate-shake');
      setTimeout(() => form.classList.remove('animate-shake'), 500);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the data to your backend here
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          inquiryType: '',
          message: ''
        });
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focused: { scale: 1.02 },
    unfocused: { scale: 1 }
  };

  const FormField = ({ 
    name, 
    label, 
    type = 'text', 
    placeholder, 
    icon: Icon, 
    required = false,
    component: Component = Input
  }) => {
    const hasError = errors[name];
    const isFocused = focusedField === name;

    return (
      <motion.div
        animate={isFocused ? "focused" : "unfocused"}
        variants={inputVariants}
        className="relative"
      >
        <Label 
          htmlFor={name} 
          className={cn(
            "flex items-center gap-2 mb-2 transition-colors text-gray-200",
            isFocused && "text-primary",
            hasError && "text-destructive"
          )}
        >
          {Icon && <Icon className="w-4 h-4" />}
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <div className="relative">
          <Component
            id={name}
            type={type}
            value={formData[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            className={cn(
              "transition-all duration-200",
              isFocused && "ring-2 ring-primary ring-offset-2",
              hasError && "border-destructive focus:ring-destructive"
            )}
          />
          <AnimatePresence>
            {hasError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -bottom-6 left-0 flex items-center gap-1 text-sm text-destructive"
              >
                <AlertCircle className="w-4 h-4" />
                {errors[name]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn("space-y-8", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Success/Error State Overlay */}
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              "absolute inset-0 flex items-center justify-center z-10 rounded-lg",
              submitStatus === 'success' ? "bg-green-50/90" : "bg-red-50/90"
            )}
          >
            <div className="text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                {submitStatus === 'success' ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                ) : (
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                )}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">
                {submitStatus === 'success' ? 'Message Sent!' : 'Something went wrong'}
              </h3>
              <p className="text-gray-600">
                {submitStatus === 'success' 
                  ? "We'll get back to you soon." 
                  : "Please try again later."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Fields */}
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
        <FormField
          name="name"
          label="Full Name"
          placeholder="John Doe"
          icon={User}
          required
        />
        
        <FormField
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          icon={Mail}
          required
        />
        
        <FormField
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          icon={Phone}
        />
        
        <FormField
          name="company"
          label="Company Name"
          placeholder="Your Company Ltd."
          icon={Building2}
        />
      </div>

      {/* Inquiry Type */}
      <motion.div
        animate={focusedField === 'inquiryType' ? "focused" : "unfocused"}
        variants={inputVariants}
        className="relative"
      >
        <Label 
          htmlFor="inquiryType" 
          className={cn(
            "flex items-center gap-2 mb-2 text-gray-200",
            focusedField === 'inquiryType' && "text-primary",
            errors.inquiryType && "text-destructive"
          )}
        >
          <MessageSquare className="w-4 h-4" />
          Type of Inquiry
          <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.inquiryType}
          onValueChange={(value) => handleInputChange('inquiryType', value)}
          onOpenChange={(open) => setFocusedField(open ? 'inquiryType' : null)}
        >
          <SelectTrigger 
            className={cn(
              "transition-all duration-200",
              focusedField === 'inquiryType' && "ring-2 ring-primary ring-offset-2",
              errors.inquiryType && "border-destructive"
            )}
          >
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent>
            {inquiryTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center gap-2">
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <AnimatePresence>
          {errors.inquiryType && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 flex items-center gap-1 text-sm text-destructive"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.inquiryType}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message */}
      <motion.div
        animate={focusedField === 'message' ? "focused" : "unfocused"}
        variants={inputVariants}
        className="relative"
      >
        <Label 
          htmlFor="message" 
          className={cn(
            "flex items-center gap-2 mb-2 text-gray-200",
            focusedField === 'message' && "text-primary",
            errors.message && "text-destructive"
          )}
        >
          <MessageSquare className="w-4 h-4" />
          Message
          <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            placeholder="Tell us how we can help you..."
            rows={5}
            className={cn(
              "transition-all duration-200 resize-none",
              focusedField === 'message' && "ring-2 ring-primary ring-offset-2",
              errors.message && "border-destructive focus:ring-destructive"
            )}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {formData.message.length}/500
          </div>
        </div>
        <AnimatePresence>
          {errors.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 flex items-center gap-1 text-sm text-destructive"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          size="lg"
          className="w-full relative overflow-hidden group"
          disabled={isSubmitting}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </Button>
      </motion.div>

      {/* Character count and hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between text-sm text-gray-400"
      >
        <div className="flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          All fields marked with * are required
        </div>
        <div>
          Response time: Within 24 hours
        </div>
      </motion.div>
    </motion.form>
  );
};

export default EnhancedContactForm;