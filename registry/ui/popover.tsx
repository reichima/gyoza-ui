import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const popoverVariants = cva(
  "m-0 rounded-lg border bg-popover p-0 text-popover-foreground shadow-md outline-none [&::backdrop]:bg-black/50",
  {
    variants: {
      variant: {
        default: "border-border",
        accent: "border-accent bg-accent/10 backdrop-blur-sm",
      },
      size: {
        default: "max-w-md",
        sm: "max-w-sm",
        lg: "max-w-lg",
        xl: "max-w-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface PopoverProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof popoverVariants> {
  id: string
}

function Popover({ className, variant, size, id, ...props }: PopoverProps) {
  return (
    <div
      id={id}
      popover="auto"
      className={cn(popoverVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const popoverTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof popoverTriggerVariants> {
  target: string
  action?: "toggle" | "show" | "hide"
}

function PopoverTrigger({
  className,
  variant,
  size,
  target,
  action = "toggle",
  ...props
}: PopoverTriggerProps) {
  return (
    <button
      type="button"
      popoverTarget={target}
      popoverTargetAction={action}
      className={cn(popoverTriggerVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const popoverContentVariants = cva("p-4", {
  variants: {
    spacing: {
      default: "p-4",
      sm: "p-3",
      lg: "p-6",
      none: "p-0",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
})

interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof popoverContentVariants> {}

function PopoverContent({
  className,
  spacing,
  ...props
}: PopoverContentProps) {
  return (
    <div
      className={cn(popoverContentVariants({ spacing, className }))}
      {...props}
    />
  )
}

export { Popover, PopoverTrigger, PopoverContent, popoverVariants }
