import * as React from "react"
import { cn } from "../../lib/utils"

function Badge({ className, variant = "default", ...props }) {
    const variants = {
        default: "border-transparent bg-blue-600 text-white shadow hover:bg-blue-700",
        secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
        destructive: "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
        outline: "text-gray-900 border-gray-200",
        success: "border-transparent bg-green-500/15 text-green-700 hover:bg-green-500/25",
        warning: "border-transparent bg-yellow-500/15 text-yellow-700 hover:bg-yellow-500/25",
        danger: "border-transparent bg-red-500/15 text-red-700 hover:bg-red-500/25",
    }

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    )
}

export { Badge }
