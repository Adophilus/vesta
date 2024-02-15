import { useEffect, useState } from "react"

import { Button } from "@/components/shad/ui/button"
import { ArrowLeftIcon, ArrowRightIcon, Loader2Icon } from "lucide-react"
import { useAuthStore } from "@/lib/hooks/auth"
import { Link, useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shad/ui/form"
import { Input } from "@/components/shad/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shad/ui/select"
import { SelectGroup } from "@radix-ui/react-select"
import UserProfileService from "@/lib/services/user-profile"
import { toast } from "sonner"

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9]+$/, { message: "Please enter in the prefix before @" }),
  emailExtension: z.string()
})

const emailExtensions = [
  "@vmail.com"
]

type FormSchema = z.infer<typeof formSchema>

export function CreateProfileForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { user, refetchProfiles } = useAuthStore(store => ({
    user: store.user,
    refetchProfiles: store.refetchProfiles
  }))

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailExtension: emailExtensions[0]
    }
  })

  if (!user) {
    navigate({
      to: "/auth/sign-in"
    })

    return null
  }

  async function onSubmit(data: FormSchema) {
    if (!user) return null

    setIsSubmitting(true)

    toast.promise(
      new Promise<string>((resolve, reject) => UserProfileService.createProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        email: `${data.email}${data.emailExtension}`,
        userId: user.key,
        organizationId: "" // TODO: Add organizationId
      })
        .then(res => res.match({
          Ok: () => resolve("Profile created"),
          Err: (err) => reject(err)

        }))
        .catch(err => {
          console.log(err)
          reject("An error occurred while creating profile")
        })),
      {
        loading: "Creating profile",
        success: (msg) => {
          refetchProfiles()
            .then(() => {
              navigate({
                to: "/mail/$mailFolder",
                params: {
                  mailFolder: "inbox"
                }
              })
              setIsSubmitting(false)
            })
          return msg
        },
        error: (err) => {
          setIsSubmitting(false)
          return err
        }
      })
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
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <Input {...field} />
                      <Select value={emailExtensions[0]} onValueChange={(value) => form.setValue("emailExtension", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an email extension" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {emailExtensions.map((extension) => (
                              <SelectItem
                                key={extension}
                                value={extension}
                              >
                                {extension}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2Icon className="animate-spin w-4 h-4" /> : (
                <>
                  Continue
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </>
              )}
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
      </form>
    </Form>
  )
}

