'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-[#103a7b] text-white hover:bg-[#0b2d60] focus-visible:outline-[#0b2d60] shadow-sm',
        secondary:
          'bg-white text-[#103a7b] border border-slate-200 hover:border-[#103a7b] hover:text-[#0b2d60] focus-visible:outline-[#103a7b] shadow-sm',
        ghost:
          'bg-transparent text-[#103a7b] hover:bg-slate-100 focus-visible:outline-slate-300',
        outline:
          'border border-slate-200 bg-white text-[#0c1427] hover:border-[#00b5e2] hover:text-[#103a7b] focus-visible:outline-[#00b5e2]',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

