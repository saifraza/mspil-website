import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const CardSkeleton = () => (
  <div className="rounded-lg border bg-card p-6 space-y-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-5/6" />
  </div>
);

export const TableSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
  </div>
);

export const ChartSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-64 w-full" />
  </div>
);

export const ContentSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);