"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const DialogContext = React.createContext<{
  dialogRef: React.RefObject<HTMLDialogElement | null>
  open: () => void
  close: () => void
} | null>(null)

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a Dialog")
  }
  return context
}

interface DialogProps {
  children: React.ReactNode
}

function Dialog({ children }: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)

  const open = React.useCallback(() => {
    dialogRef.current?.showModal()
  }, [])

  const close = React.useCallback(() => {
    dialogRef.current?.close()
  }, [])

  return (
    <DialogContext.Provider value={{ dialogRef, open, close }}>
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, onClick, asChild = false, ...props }, ref) => {
    const { open } = useDialog()
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        type="button"
        className={cn(className)}
        onClick={(e) => {
          open()
          onClick?.(e)
        }}
        {...props}
      />
    )
  }
)
DialogTrigger.displayName = "DialogTrigger"

interface DialogContentProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  className?: string
}

const DialogContent = React.forwardRef<HTMLDialogElement, DialogContentProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { dialogRef, close } = useDialog()

    // Merge refs if needed, but primarily use dialogRef
    const setRef = (node: HTMLDialogElement) => {
      // @ts-ignore
      dialogRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        // @ts-ignore
        ref.current = node
      }
    }

    return (
      <dialog
        suppressHydrationWarning
        ref={setRef}
        className={cn(
          "backdrop:bg-black/50 backdrop:backdrop-blur-sm",
          "open:animate-in open:fade-in-0 open:zoom-in-95",
          "hidden open:grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </dialog>
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, onClick, asChild = false, ...props }, ref) => {
    const { close } = useDialog()
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        type="button"
        className={cn(className)}
        onClick={(e) => {
          e.stopPropagation()
          close()
          onClick?.(e)
        }}
        {...props}
      />
    )
  }
)
DialogClose.displayName = "DialogClose"

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
