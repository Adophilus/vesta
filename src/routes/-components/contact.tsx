import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shad/ui/form"
import { InputProps } from "@/components/shad/ui/input"
import { cn } from "@/lib/shad/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
  email: z.string().email(),
  subject: z.string(),
  body: z.string()
})

type FormSchema = z.infer<typeof formSchema>

function ContactForm() {

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      body: ""
    }
  })

  const onSubmit = (data: FormSchema) => {

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export function Contact() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl py-36">
        <div className="flex flex-col gap-4">
          <header className="text-4xl font-semibold">
            Get in touch with us
          </header>
          <div className="h-1 w-48 bg-primary" />
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
