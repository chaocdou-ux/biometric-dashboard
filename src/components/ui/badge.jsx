import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary-100 text-primary-700": variant === "default",
          "bg-gray-100 text-gray-700": variant === "outline",
          "bg-green-100 text-green-700": variant === "success",
          "bg-red-100 text-red-700": variant === "danger",
        },
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
