import * as React from "react"

import { Button } from "@/components/shad/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { useAuthStore } from "@/lib/hooks/auth"
import { Link } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shad/ui/form"
import { Input } from "@/components/shad/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shad/ui/select"

const formSchema = z.object({
  email: z.string()
})

const emailExtensions = [
  "myjunoapp.com"
]

type FormSchema = z.infer<typeof formSchema>

export function CreateProfileForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const signIn = useAuthStore(store => store.signIn)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit() {
    setIsLoading(true)

    await signIn()

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create a profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Create a profile to continue to mail
            </p>
          </div>
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                    <Select value={emailExtensions[0]}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an email extension" />
                      </SelectTrigger>
                      <SelectContent>
                        {emailExtensions.map((extension) => (
                          <SelectItem value={extension}>{extension}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Continue
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/legal/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </form>
    </Form>
  )
}

