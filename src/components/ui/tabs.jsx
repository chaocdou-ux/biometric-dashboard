import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext()

const Tabs = ({ defaultValue, value, onValueChange, className, ...props }) => {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue)
  
  const handleValueChange = React.useCallback((newValue) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
  }, [onValueChange])
  
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])
  
  return (
    <TabsContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)} {...props} />
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-start gap-1 rounded-lg bg-gray-100 p-1 w-full overflow-x-auto",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  const isSelected = context.value === value
  
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
        isSelected ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
        className
      )}
      onClick={() => context.onValueChange(value)}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  
  if (context.value !== value) return null
  
  return (
    <div
      ref={ref}
      className={cn("mt-6", className)}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
