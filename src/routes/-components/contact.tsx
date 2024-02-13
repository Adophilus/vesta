import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shad/ui/form"
import { InputProps } from "@/components/shad/ui/input"
import { TextareaProps } from "@/components/shad/ui/textarea"
import { cn } from "@/lib/shad/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./button"
import { SendHorizonalIcon } from "lucide-react"
import { Section } from "./section"
import { toast } from "sonner"

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const classes = "bg-transparent border-[3px] border-white px-4 py-2 shadow-[6px_4px_0px_1px_rgb(255,255,255)] shadow-primary focus:outline-none focus:border-primary transition-all duration-250"

    return (
      <input
        className={cn(classes, className)}
        ref={ref}
        {...props}
      />
    )
  })

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const classes = "bg-transparent border-[3px] border-white px-4 py-2 shadow-[6px_4px_0px_1px_rgb(255,255,255)] shadow-primary focus:outline-none focus:border-primary transition-all duration-250"

    return (
      <textarea
        className={cn(classes, className)}
        ref={ref}
        {...props}
      />
    )
  })

const formSchema = z.object({
  email: z.string().email(),
  subject: z.string(),
  body: z.string()
})

type FormSchema = z.infer<typeof formSchema>

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      body: ""
    }
  })

  // TODO: Implement form submission
  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true)

    toast.promise(
      new Promise((resolve, reject) => setTimeout(() => reject("Sorry an error occurred, please try again later"), 2000)),
      {
        loading: "Sending...",
        error: (error) => error,
      }
    )

    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Subject"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Feel free to reach us using this form"
                    className="w-full"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="border-white font-semibold flex items-center gap-2"
            >
              Send
              <SendHorizonalIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export function Contact() {
  return (
    <section className="selection:bg-white selection:text-primary bg-black text-white" id="contact">
      <Section>
        <div className="py-36 grid lg:grid-cols-2 gap-x-36 gap-y-10">
          <div className="flex flex-col justify-center items-center gap-4">
            <header className="font-Montserrat text-3xl sm:text-4xl lg:text-6xl text-center font-semibold">
              Get in touch with us
            </header>
            <div className="h-1 w-48 bg-primary" />
          </div>
          <ContactForm />
        </div>
      </Section>
    </section>
  )
}
