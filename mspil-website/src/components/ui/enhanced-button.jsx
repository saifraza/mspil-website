import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';
import { motion } from 'framer-motion';
import { useRippleEffect } from '@/hooks/useMicroInteractions';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg',
        glow: 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-14 rounded-lg px-10 text-base',
        icon: 'h-10 w-10',
      },
      animation: {
        none: '',
        bounce: 'hover:animate-bounce',
        pulse: 'animate-pulse',
        shake: 'hover:animate-shake',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none',
    },
  },
);

const EnhancedButton = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  animation,
  asChild = false, 
  enableRipple = true,
  enableHoverEffect = true,
  enableMagnetic = false,
  glowColor,
  children,
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { ripples, createRipple } = useRippleEffect();
  const [isHovered, setIsHovered] = React.useState(false);
  const [magneticPosition, setMagneticPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!enableMagnetic) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setMagneticPosition({
      x: x * 0.2,
      y: y * 0.2
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (enableMagnetic) {
      setMagneticPosition({ x: 0, y: 0 });
    }
  };

  const handleClick = (e) => {
    if (enableRipple && variant !== 'link') {
      createRipple(e);
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <motion.div
      className="relative inline-block"
      animate={{
        x: magneticPosition.x,
        y: magneticPosition.y,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple effects */}
        {enableRipple && ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}

        {/* Hover gradient overlay */}
        {enableHoverEffect && variant !== 'link' && variant !== 'ghost' && (
          <motion.div
            className="absolute inset-0 opacity-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 pointer-events-none"
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? ['-100%', '100%'] : '-100%',
            }}
            transition={{
              opacity: { duration: 0.2 },
              x: { duration: 0.8, ease: "easeInOut" },
            }}
          />
        )}

        {/* Glow effect for glow variant */}
        {variant === 'glow' && (
          <motion.div
            className="absolute inset-0 rounded-md pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${glowColor || 'rgba(34, 197, 94, 0.3)'} 0%, transparent 70%)`,
            }}
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Content wrapper for better z-index management */}
        <span className="relative z-10">
          {children}
        </span>
      </Comp>
    </motion.div>
  );
});

EnhancedButton.displayName = 'EnhancedButton';

// Export both the enhanced button and original button for backward compatibility
export { EnhancedButton as Button, buttonVariants };

// Also export a simpler version that matches the original API
export const SimpleButton = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
SimpleButton.displayName = 'SimpleButton';