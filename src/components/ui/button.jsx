import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-primary-600 text-white hover:bg-primary-700": variant === "default",
          "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700": variant === "outline",
          "bg-transparent hover:bg-gray-100 text-gray-700": variant === "ghost",
        },
        {
          "h-10 py-2 px-4": size === "default",
          "h-9 px-3 text-xs": size === "sm",
          "h-11 px-8": size === "lg",
        },
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
