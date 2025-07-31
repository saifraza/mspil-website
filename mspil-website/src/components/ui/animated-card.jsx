import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card as BaseCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cardBackgrounds } from '@/utils/backgroundStyles';

// Enhanced Card with multiple animation variants
export const AnimatedCard = React.forwardRef(({ 
  className, 
  variant = 'default', 
  hoverEffect = true,
  clickEffect = true,
  children,
  delay = 0,
  ...props 
}, ref) => {
  const variants = {
    default: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      hover: hoverEffect ? { y: -5, scale: 1.02 } : {},
      tap: clickEffect ? { scale: 0.98 } : {},
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      hover: hoverEffect ? { scale: 1.05 } : {},
      tap: clickEffect ? { scale: 0.95 } : {},
    },
    slide: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      hover: hoverEffect ? { x: 10 } : {},
      tap: clickEffect ? { x: -5 } : {},
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      hover: hoverEffect ? { scale: 1.1 } : {},
      tap: clickEffect ? { scale: 0.9 } : {},
    },
    flip: {
      initial: { opacity: 0, rotateY: -90 },
      animate: { opacity: 1, rotateY: 0 },
      hover: hoverEffect ? { rotateY: 10 } : {},
      tap: clickEffect ? { rotateY: -5 } : {},
    },
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <motion.div
      ref={ref}
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      whileHover={selectedVariant.hover}
      whileTap={selectedVariant.tap}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className={cn("relative", className)}
      {...props}
    >
      <BaseCard className="h-full">
        {children}
      </BaseCard>
    </motion.div>
  );
});
AnimatedCard.displayName = 'AnimatedCard';

// Glass Morphism Card
export const GlassCard = React.forwardRef(({ 
  className, 
  children,
  blur = 'md',
  opacity = '10',
  ...props 
}, ref) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 200,
      }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        blurClasses[blur],
        className
      )}
      {...props}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent",
        `bg-white/${opacity}`
      )} />
      <BaseCard className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/40 shadow-xl hover:bg-white/70 dark:hover:bg-gray-800/70">
        {children}
      </BaseCard>
    </motion.div>
  );
});
GlassCard.displayName = 'GlassCard';

// 3D Card with Tilt Effect
export const Card3D = React.forwardRef(({ 
  className, 
  children,
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  ...props 
}, ref) => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -maxTilt;
    const rotateYValue = ((x - centerX) / centerX) * maxTilt;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      className={cn("relative", className)}
      {...props}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <BaseCard className="relative overflow-hidden shadow-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:bg-white/70 dark:hover:bg-gray-800/70">
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0"
            animate={{
              opacity: [0, 0.5, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {children}
        </BaseCard>
      </motion.div>
    </motion.div>
  );
});
Card3D.displayName = 'Card3D';

// Gradient Border Card
export const GradientCard = React.forwardRef(({ 
  className, 
  children,
  gradient = 'from-primary via-secondary to-primary',
  borderWidth = 2,
  animateGradient = true,
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={cn("relative p-[2px] rounded-xl", className)}
      {...props}
    >
      <motion.div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-r",
          gradient
        )}
        animate={animateGradient ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : {}}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      <BaseCard className="relative bg-background">
        {children}
      </BaseCard>
    </motion.div>
  );
});
GradientCard.displayName = 'GradientCard';

// Interactive Feature Card
export const FeatureCard = React.forwardRef(({ 
  className,
  title,
  description,
  icon,
  iconBg = 'bg-primary/10',
  iconColor = 'text-primary',
  children,
  ...props 
}, ref) => {
  return (
    <AnimatedCard
      ref={ref}
      variant="default"
      className={cn("group", className)}
      {...props}
    >
      <CardHeader className="space-y-4">
        {icon && (
          <motion.div
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center",
              iconBg
            )}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <div className={cn("w-8 h-8", iconColor)}>
              {icon}
            </div>
          </motion.div>
        )}
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </AnimatedCard>
  );
});
FeatureCard.displayName = 'FeatureCard';

// Hover Reveal Card
export const HoverRevealCard = React.forwardRef(({ 
  className,
  frontContent,
  backContent,
  ...props 
}, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      className={cn("relative h-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
      {...props}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="h-full"
          >
            <BaseCard className="h-full">
              {frontContent}
            </BaseCard>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="h-full"
          >
            <BaseCard className="h-full bg-primary text-primary-foreground">
              {backContent}
            </BaseCard>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
HoverRevealCard.displayName = 'HoverRevealCard';

// Export all card components
export {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};