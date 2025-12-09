"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface ComboboxContextType {
  open: boolean
  setOpen: (open: boolean) => void
  value: string
  setValue: (value: string) => void
  activeIndex: number
  setActiveIndex: (index: number) => void
  items: string[]
  registerItem: (value: string) => void
  unregisterItem: (value: string) => void
  inputId: string
  listboxId: string
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredItems: string[]
}

const ComboboxContext = React.createContext<ComboboxContextType | undefined>(
  undefined
)

function useCombobox() {
  const context = React.useContext(ComboboxContext)
  if (!context) {
    throw new Error("useCombobox must be used within a Combobox")
  }
  return context
}

interface ComboboxProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function Combobox({
  children,
  value: controlledValue,
  onValueChange,
  className,
}: ComboboxProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const [items, setItems] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")

  const value = controlledValue ?? uncontrolledValue
  const setValue = React.useCallback(
    (newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue)
      } else {
        setUncontrolledValue(newValue)
      }
    },
    [onValueChange]
  )

  const registerItem = React.useCallback((itemValue: string) => {
    setItems((prev) => {
      if (prev.includes(itemValue)) return prev
      return [...prev, itemValue]
    })
  }, [])

  const unregisterItem = React.useCallback((itemValue: string) => {
    setItems((prev) => prev.filter((v) => v !== itemValue))
  }, [])

  // Filter items based on search query
  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return items
    return items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [items, searchQuery])

  const inputId = React.useId()
  const listboxId = React.useId()

  return (
    <ComboboxContext.Provider
      value={{
        open,
        setOpen,
        value,
        setValue,
        activeIndex,
        setActiveIndex,
        items,
        registerItem,
        unregisterItem,
        inputId,
        listboxId,
        searchQuery,
        setSearchQuery,
        filteredItems,
      }}
    >
      <div className={cn("relative w-full", className)}>{children}</div>
    </ComboboxContext.Provider>
  )
}

interface ComboboxInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  displayValue?: (value: string) => string
}

export const ComboboxInput = React.forwardRef<
  HTMLInputElement,
  ComboboxInputProps
>(({ className, displayValue, ...props }, ref) => {
  const {
    open,
    setOpen,
    value,
    filteredItems,
    activeIndex,
    setActiveIndex,
    setValue,
    inputId,
    listboxId,
    setSearchQuery,
  } = useCombobox()

  const [inputValue, setInputValue] = React.useState(
    displayValue ? displayValue(value) : value
  )

  React.useEffect(() => {
    setInputValue(displayValue ? displayValue(value) : value)
  }, [value, displayValue])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setOpen(true)
        e.preventDefault()
      }
      return
    }

    switch (e.key) {
      case "Tab":
        // Allow Tab to move through filtered items when open
        e.preventDefault()
        if (e.shiftKey) {
          // Shift+Tab: move backwards
          setActiveIndex((activeIndex - 1 + filteredItems.length) % filteredItems.length)
        } else {
          // Tab: move forward
          setActiveIndex((activeIndex + 1) % filteredItems.length)
        }
        break
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex((activeIndex + 1) % filteredItems.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setActiveIndex((activeIndex - 1 + filteredItems.length) % filteredItems.length)
        break
      case "Enter":
        e.preventDefault()
        if (activeIndex >= 0 && activeIndex < filteredItems.length) {
          setValue(filteredItems[activeIndex])
          setOpen(false)
        }
        break
      case "Escape":
        setOpen(false)
        break
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setSearchQuery(newValue)
    if (!open) setOpen(true)
  }

  const handleFocus = () => {
    // Only open if not already open
    if (!open) setOpen(true)
  }

  return (
    <div className="relative flex items-center">
      <input
        ref={ref}
        id={inputId}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          activeIndex >= 0 ? `${listboxId}-item-${activeIndex}` : undefined
        }
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        {...props}
      />
      <ComboboxTrigger />
    </div>
  )
})
ComboboxInput.displayName = "ComboboxInput"

export function ComboboxTrigger() {
  const { setOpen, open } = useCombobox()
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="absolute right-2 flex h-4 w-4 items-center justify-center opacity-50 hover:opacity-100"
      tabIndex={-1}
    >
      <ChevronsUpDown className="h-4 w-4" />
    </button>
  )
}

interface ComboboxContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ComboboxContent({ className, children, ...props }: ComboboxContentProps) {
  const { open, listboxId, inputId, setOpen } = useCombobox()
  const ref = React.useRef<HTMLDivElement>(null)

  // Position logic (basic fallback for now)
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 })

  React.useLayoutEffect(() => {
    if (open) {
      const input = document.getElementById(inputId)
      if (input) {
        const rect = input.getBoundingClientRect()
        setPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width,
        })
      }

      // Show popover
      if (ref.current?.showPopover) {
        try {
          ref.current.showPopover()
        } catch (e) {
          // popover might already be showing
        }
      }
    } else {
      // Hide popover
      if (ref.current?.hidePopover) {
        try {
          ref.current.hidePopover()
        } catch (e) {
          // popover might already be hidden
        }
      }
    }
  }, [open, inputId])

  // Click outside to close
  React.useEffect(() => {
    if (!open) return
    
    const handleClick = (e: MouseEvent) => {
      const input = document.getElementById(inputId)
      const target = e.target as Node
      
      // Check if click is inside this combobox's content or input
      const isInsideContent = ref.current?.contains(target)
      const isInsideInput = input?.contains(target)
      
      // Close if clicked outside both the input and content
      if (!isInsideContent && !isInsideInput) {
        setOpen(false)
      }
    }
    
    // Use capture phase to handle clicks before they bubble
    document.addEventListener("mousedown", handleClick, true)
    return () => document.removeEventListener("mousedown", handleClick, true)
  }, [open, inputId, setOpen])

  if (!open) return null

  return (
    <div
      ref={ref}
      id={listboxId}
      role="listbox"
      // @ts-ignore - popover API
      popover="manual"
      style={{
        position: "absolute", // popover is fixed/absolute in top layer usually
        top: position.top,
        left: position.left,
        width: position.width,
        margin: 0,
      }}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

interface ComboboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onSelect?: () => void
}

export function ComboboxItem({
  className,
  children,
  value: itemValue,
  onSelect,
  ...props
}: ComboboxItemProps) {
  const {
    value,
    setValue,
    setOpen,
    items,
    registerItem,
    unregisterItem,
    activeIndex,
    setActiveIndex,
    listboxId,
    filteredItems,
  } = useCombobox()

  React.useEffect(() => {
    registerItem(itemValue)
    return () => unregisterItem(itemValue)
  }, [itemValue, registerItem, unregisterItem])

  // Check if this item matches the filter
  const isFiltered = !filteredItems.includes(itemValue)
  
  // Get index in the filtered list (not the full list)
  const index = filteredItems.indexOf(itemValue)
  const isActive = index === activeIndex
  const isSelected = value === itemValue

  const handleSelect = () => {
    setValue(itemValue)
    setOpen(false)
    onSelect?.()
  }

  // Don't render if filtered out
  if (isFiltered) return null

  return (
    <div
      role="option"
      id={`${listboxId}-item-${index}`}
      aria-selected={isSelected}
      data-active={isActive}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
        className
      )}
      onClick={handleSelect}
      onMouseEnter={() => setActiveIndex(index)}
      {...props}
    >
      <span className={cn("mr-2 flex h-3.5 w-3.5 items-center justify-center")}>
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  )
}

export function ComboboxEmpty({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { filteredItems } = useCombobox()
  
  // Only show when there are no filtered items
  if (filteredItems.length > 0) return null
  
  return (
    <div
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ComboboxGroup({
  children,
  className,
  heading,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { heading?: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      {heading && (
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {heading}
        </div>
      )}
      {children}
    </div>
  )
}
