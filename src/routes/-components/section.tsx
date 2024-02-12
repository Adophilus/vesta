import { cn } from "@/lib/shad/utils";
import { HTMLAttributes, forwardRef } from "react";

export const Section = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => (
  <div className={cn("max-w-7xl mx-auto px-4", className)} ref={ref} {...props}>
    {children}
  </div>
))
