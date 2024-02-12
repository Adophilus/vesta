import { ButtonProps } from "@/components/shad/ui/button";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }) => (
    <button type="button" {...props}>
      {children}
    </button>
  )
)
