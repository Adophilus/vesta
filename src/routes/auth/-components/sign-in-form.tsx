import * as React from "react"

// import { Button } from "@/components/shad/ui/button"
import { Button } from "../../-components/button"
import { Loader2Icon } from "lucide-react"
import { useAuthStore } from "@/lib/hooks/auth"
import { InternetComputerIcon } from "@/components/icons"
import { Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"

export function SignInForm() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false)
  const signIn = useAuthStore(store => store.signIn)
  const navigate = useNavigate()

  async function onSubmit() {
    setIsAuthenticating(true)

    await signIn()
      .catch(err => {
        console.log(err)
        if (err === "UserInterrupt")
          toast.error("Sign in cancelled by user")
        else
          toast.error("An error occurred while trying to sign in")
        setIsAuthenticating(false)
      })
      .then(() => {
        setIsAuthenticating(false)
        console.log("You should be redirected now")
        navigate({
          to: "/mail/$mailFolder",
          params: {
            mailFolder: "inbox"
          }
        })
      })
  }

  return (
    <div className="selection:text-primary selection:bg-black mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account<br />or<br />Sign In
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose your preferred method of authentication
        </p>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          className="font-Montserrat flex items-center gap-2 font-semibold"
          type="button"
          disabled={isAuthenticating}>
          {isAuthenticating ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <InternetComputerIcon className="h-4 w-4" />
          )}{" "}
          Intenet ID
        </Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          to="/legal/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to="/legal/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}

