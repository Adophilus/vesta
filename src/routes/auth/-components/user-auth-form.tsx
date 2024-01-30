import * as React from "react"

import { cn } from "@/lib/shad/utils"
import { Button } from "@/components/shad/ui/button"
import { DiscIcon, Loader2Icon } from "lucide-react"
import { useAuthStore } from "@/lib/hooks/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const signIn = useAuthStore(store => store.signIn)

  async function onSubmit() {
    setIsLoading(true)

    await signIn()

    setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Button
        onClick={onSubmit}
        variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <DiscIcon className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}

