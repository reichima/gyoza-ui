"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary",
        outline: "border-border bg-popover text-popover-foreground",
        secondary: "bg-secondary text-secondary-foreground border-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface TooltipContextType {
  open: boolean
  setOpen: (open: boolean) => void
  contentId: string
  triggerRef: React.RefObject<HTMLElement | null>
}

const TooltipContext = React.createContext<TooltipContextType | null>(null)

function useTooltip() {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip provider")
  }
  return context
}

interface TooltipProps {
  children: React.ReactNode
}

function Tooltip({ children }: TooltipProps) {
  const [open, setOpen] = React.useState(false)
  const contentId = React.useId()
  const triggerRef = React.useRef<HTMLElement>(null)

  return (
    <TooltipContext.Provider value={{ open, setOpen, contentId, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  )
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const { setOpen, contentId, triggerRef } = useTooltip()

    const handleMouseEnter = () => setOpen(true)
    const handleMouseLeave = () => setOpen(false)
    const handleFocus = () => setOpen(true)
    const handleBlur = () => setOpen(false)

    const mergedRef = (node: HTMLDivElement) => {
      // @ts-ignore
      triggerRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        // @ts-ignore
        ref.current = node
      }
    }

    return (
      <div
        ref={mergedRef}
        className={cn("inline-block", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-describedby={contentId}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipContentVariants> {
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, variant, side = "top", sideOffset = 4, children, ...props }, ref) => {
    const { open, contentId, triggerRef } = useTooltip()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [position, setPosition] = React.useState({ top: 0, left: 0 })

    React.useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return

      const updatePosition = () => {
        if (!triggerRef.current || !contentRef.current) return

        const triggerRect = triggerRef.current.getBoundingClientRect()
        const contentRect = contentRef.current.getBoundingClientRect()

        let top = 0
        let left = 0

        switch (side) {
          case "top":
            top = triggerRect.top - contentRect.height - sideOffset
            left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
            break
          case "bottom":
            top = triggerRect.bottom + sideOffset
            left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
            break
          case "left":
            top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
            left = triggerRect.left - contentRect.width - sideOffset
            break
          case "right":
            top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
            left = triggerRect.right + sideOffset
            break
        }

        setPosition({ top, left })
      }

      updatePosition()

      window.addEventListener("scroll", updatePosition, true)
      window.addEventListener("resize", updatePosition)

      return () => {
        window.removeEventListener("scroll", updatePosition, true)
        window.removeEventListener("resize", updatePosition)
      }
    }, [open, side, sideOffset])

    const mergedRef = (node: HTMLDivElement) => {
      // @ts-ignore
      contentRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        // @ts-ignore
        ref.current = node
      }
    }

    if (!open) return null

    return (
      <div
        ref={mergedRef}
        id={contentId}
        role="tooltip"
        className={cn(
          tooltipContentVariants({ variant, className }),
          "fixed pointer-events-none"
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, tooltipContentVariants }
