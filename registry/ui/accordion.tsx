import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  collapsible?: boolean
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type, collapsible, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-1", className)} {...props} />
  )
)
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  HTMLDetailsElement,
  React.DetailsHTMLAttributes<HTMLDetailsElement>
>(({ className, ...props }, ref) => (
  <details
    ref={ref}
    className={cn(
      "group border-b last:border-b-0",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => (
  <summary
    ref={ref}
    className={cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline cursor-pointer [&::-webkit-details-marker]:hidden list-none",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
  </summary>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </div>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
