import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border-border bg-popover text-popover-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  target: string
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ className, target, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("cursor-default", className)}
        // @ts-expect-error - interesttarget is a new attribute
        interesttarget={target}
        {...props}
      />
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipContentVariants> {
  id: string
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, variant, id, ...props }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        // @ts-expect-error - popover="hint" is a new value
        popover="hint"
        className={cn(tooltipContentVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
TooltipContent.displayName = "TooltipContent"

// Helper component to wrap Trigger and Content if desired, but not strictly necessary with ID linking.
// For consistency with other components, we might want a Root, but the API here is ID-based.
// We'll export the parts.

export { TooltipTrigger, TooltipContent, tooltipContentVariants }
