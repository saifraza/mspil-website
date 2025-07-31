import React from 'react';
import { 
  Skeleton,
  CardSkeleton as EnhancedCardSkeleton,
  TableSkeleton as EnhancedTableSkeleton,
  ChartSkeleton as EnhancedChartSkeleton,
  ListSkeleton,
  FormSkeleton,
  HeroSkeleton,
  GallerySkeleton
} from '@/components/ui/enhanced-skeleton';

// Re-export enhanced skeletons with backward compatibility
export const CardSkeleton = ({ className, ...props }) => (
  <EnhancedCardSkeleton className={className} {...props} />
);

export const TableSkeleton = ({ rows = 4, columns = 4, className }) => (
  <EnhancedTableSkeleton rows={rows} columns={columns} className={className} />
);

export const ChartSkeleton = ({ type = 'line', className }) => (
  <EnhancedChartSkeleton type={type} className={className} />
);

export const ContentSkeleton = ({ className }) => (
  <div className={`space-y-4 ${className || ''}`}>
    <Skeleton variant="title" className="w-1/2" animation="shimmer" />
    <Skeleton className="h-4 w-full" animation="shimmer" />
    <Skeleton className="h-4 w-full" animation="shimmer" />
    <Skeleton className="h-4 w-3/4" animation="shimmer" />
  </div>
);

// Additional skeleton exports
export { 
  ListSkeleton, 
  FormSkeleton, 
  HeroSkeleton, 
  GallerySkeleton,
  Skeleton 
};