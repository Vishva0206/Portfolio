import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] min-h-11 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-18px_rgba(33,30,26,0.45)]",
  {
    variants: {
      variant: {
        primary: "bg-accent text-card hover:bg-accent/90",
        sage: "bg-sage text-card hover:bg-sage/90",
        outline: "border border-border bg-transparent text-fg hover:bg-card",
        ghost: "text-muted hover:text-fg hover:bg-card",
      },
      size: {
        md: "px-5 py-2.5",
        lg: "px-6 py-3 text-base",
        sm: "px-3 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
