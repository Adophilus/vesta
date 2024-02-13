import { useEffect, useState } from "react"

import { Button } from "@/components/shad/ui/button"
import { ArrowRightIcon, Loader2Icon } from "lucide-react"
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
  email: z.string(),
  emailExtension: z.string()
})

const emailExtensions = [
  "jmail.com"
]

type FormSchema = z.infer<typeof formSchema>

export function CreateProfileForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { user, profiles, refetchProfiles } = useAuthStore(store => ({
    user: store.user,
    profiles: store.profiles,
    refetchProfiles: store.refetchProfiles
  }))

  useEffect(() => {
    if (profiles && profiles.length > 0)
      navigate({
        to: "/mail/$mailFolder",
        params: {
          mailFolder: "inbox"
        }
      })
  }, [profiles, navigate])

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailExtension: emailExtensions[0]
    }
  })

  if (!user) return null

  async function onSubmit(data: FormSchema) {
    if (!user) return null

    setIsSubmitting(true)

    await UserProfileService.createProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      email: `${data.email}@${data.emailExtension}`,
      userId: user.key,
      organizationId: "" // TODO: Add organizationId
    })
      .then(async () => {
        await refetchProfiles()
        setIsSubmitting(false)
      })
      .catch(err => {
        console.log(err)
        toast.error("An error occurred while creating profile")
        setIsSubmitting(false)
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
                              <SelectItem value={extension}>{extension}</SelectItem>
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

