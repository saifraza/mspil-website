import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-green-600/80 backdrop-blur-md text-white border border-green-500/30 hover:bg-green-500/90 hover:shadow-lg hover:shadow-green-500/25',
				destructive:
          'bg-red-600/80 backdrop-blur-md text-white border border-red-500/30 hover:bg-red-500/90',
				outline:
          'border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/40',
				secondary:
          'bg-gray-600/80 backdrop-blur-md text-white border border-gray-500/30 hover:bg-gray-500/90',
				ghost: 'hover:bg-white/10 backdrop-blur-sm hover:border border-white/20',
				link: 'text-green-400 underline-offset-4 hover:underline hover:text-green-300',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };