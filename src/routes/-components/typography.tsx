import { cn } from "@/lib/shad/utils";
import { HTMLAttributes, forwardRef } from "react";

export namespace Typography {
  export const Accent = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(({ className, children, ...props }, ref) => (
    <span
      style={{ WebkitTextStroke: "3px black" }}
      className={cn("text-primary", className)}
      {...props}
      ref={ref}
    >
      {children}
    </span>
  ))
}

export default Typography
