import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Base Skeleton component with shimmer animation
export const Skeleton = React.forwardRef(({ 
  className, 
  variant = 'default',
  animation = 'shimmer',
  ...props 
}, ref) => {
  const baseClasses = "relative overflow-hidden bg-muted/50";
  
  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-none",
    text: "rounded h-4",
    title: "rounded h-8",
  };

  const shimmerClasses = animation === 'shimmer' ? "animate-shimmer" : "";

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        shimmerClasses,
        className
      )}
      {...props}
    >
      {animation === 'shimmer' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      )}
      {animation === 'pulse' && (
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
});
Skeleton.displayName = 'Skeleton';

// Card Skeleton
export const CardSkeleton = ({ className, showImage = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-4 p-6 bg-card rounded-lg border", className)}
    >
      {showImage && (
        <Skeleton className="h-48 w-full" />
      )}
      <div className="space-y-2">
        <Skeleton variant="title" className="w-3/4" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>
    </motion.div>
  );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4, className }) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="flex gap-4 p-4 border-b bg-muted/30">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-5 flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <motion.div
          key={`row-${rowIndex}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: rowIndex * 0.05 }}
          className="flex gap-4 p-4 border-b"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              className="h-4 flex-1"
              style={{
                width: `${Math.random() * 40 + 60}%`,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// List Skeleton
export const ListSkeleton = ({ items = 3, className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: items }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-4 p-4 bg-card rounded-lg border"
        >
          <Skeleton variant="circular" className="h-12 w-12 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
        </motion.div>
      ))}
    </div>
  );
};

// Chart Skeleton
export const ChartSkeleton = ({ className, type = 'line' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("relative h-[300px] w-full", className)}
    >
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full w-8 flex flex-col justify-between py-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={`y-${i}`} className="h-3 w-8" />
        ))}
      </div>
      
      {/* Chart area */}
      <div className="ml-12 h-full relative">
        {type === 'line' ? (
          <svg className="absolute inset-0 w-full h-full">
            <motion.path
              d="M0,150 Q100,100 200,120 T400,80 T600,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted-foreground/20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        ) : (
          <div className="flex items-end justify-around h-full pb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`bar-${i}`}
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 60 + 20}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-12 bg-muted rounded-t"
              />
            ))}
          </div>
        )}
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={`x-${i}`} className="h-3 w-12" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Form Skeleton
export const FormSkeleton = ({ fields = 4, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("space-y-6", className)}
    >
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-20" /> {/* Label */}
            <Skeleton className="h-10 w-full" /> {/* Input */}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" /> {/* Label */}
        <Skeleton className="h-24 w-full" /> {/* Textarea */}
      </div>
      <Skeleton className="h-10 w-full" /> {/* Submit button */}
    </motion.div>
  );
};

// Hero Section Skeleton
export const HeroSkeleton = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("relative min-h-screen flex items-center justify-center", className)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Skeleton variant="title" className="h-16 w-3/4 mx-auto" />
          <Skeleton variant="title" className="h-12 w-1/2 mx-auto" />
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
          <div className="flex gap-4 justify-center pt-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </motion.div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-card/50 backdrop-blur p-6 rounded-lg"
            >
              <Skeleton variant="circular" className="h-12 w-12 mx-auto mb-4" />
              <Skeleton className="h-8 w-20 mx-auto mb-2" />
              <Skeleton className="h-3 w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Gallery Skeleton
export const GallerySkeleton = ({ items = 6, className }) => {
  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      {Array.from({ length: items }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Skeleton className="aspect-square rounded-lg" />
        </motion.div>
      ))}
    </div>
  );
};

// Add shimmer animation to global styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
    .animate-shimmer {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
    }
  `;
  document.head.appendChild(style);
}

export default Skeleton;