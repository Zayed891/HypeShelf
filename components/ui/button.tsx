import * as React from "react"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            primary: "bg-white text-black hover:bg-neutral-200 h-10 px-4 py-2",
            secondary: "bg-neutral-800 text-white hover:bg-neutral-700 h-10 px-4 py-2",
            ghost: "hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2",
            outline: "border border-neutral-700 bg-transparent hover:bg-neutral-800 text-white h-10 px-4 py-2",
        }

        return (
            <button
                className={`${baseStyles} ${variants[variant]} ${className || ""}`}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
