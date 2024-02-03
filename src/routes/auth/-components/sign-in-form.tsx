import * as React from "react"

import { Button } from "@/components/shad/ui/button"
import { Loader2Icon } from "lucide-react"
import { useAuthStore } from "@/lib/hooks/auth"
import { InternetComputerIcon } from "@/components/icons"
import { Link } from "@tanstack/react-router"

export function SignInForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const signIn = useAuthStore(store => store.signIn)

  async function onSubmit() {
    setIsLoading(true)

    await signIn()

    setIsLoading(false)
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account<br />or<br />Sign In
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose your preferred method of authentication
        </p>
      </div>
      <div className="grid gap-6">
        <Button
          onClick={onSubmit}
          variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <InternetComputerIcon className="mr-2 h-4 w-4" />
          )}{" "}
          Intenet ID
        </Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}

