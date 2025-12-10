import * as React from "react"

import { cn } from "@/lib/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          // Base select appearance for customization
          "appearance-none", 
          // Note: 'appearance: base-select' is experimental and might need specific browser flags or versions.
          // We use a class that would apply this if supported, or inline style if needed.
          // For now, we'll use a custom class 'appearance-base-select' which users can define or we can add to global css if needed,
          // but for this component we'll assume the user's environment supports it or it falls back.
          // However, to make it work as a "Customizable Select" as per the article, we need `appearance: base-select`.
          // Since tailwind might not have this utility yet, we can use arbitrary values or style prop.
          "[appearance:base-select]",
          className
        )}
        {...props}
      />
    )
  }
)
Select.displayName = "Select"

const SelectOption = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => {
  return (
    <option
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
})
SelectOption.displayName = "SelectOption"

export { Select, SelectOption }
