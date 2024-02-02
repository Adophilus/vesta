import { Button } from "@/components/shad/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shad/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shad/ui/form";
import { Input } from "@/components/shad/ui/input";
import { Label } from "@/components/shad/ui/label";
import { Loader2Icon, PenIcon, SendHorizonalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import MailService from "@/lib/services/mail";
import { Textarea } from "@/components/shad/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export function MailCompose() {
  return (
    <div className="p-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">
            <PenIcon className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Compose mail</DialogTitle>
          </DialogHeader>
          <ComposeMailForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const formSchema = z.object({
  recipientEmail: z.string().email(),
  title: z.string(),
  cc: z.array(z.string().email()),
  bcc: z.array(z.string().email()),
  body: z.string(),

})

type FormSchema = z.infer<typeof formSchema>

const ComposeMailForm = () => {
  const [isSending, setIsSending] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Test",
      recipientEmail: "test@localhost.com",
      body: "This is a test email",
      cc: [],
      bcc: []
    }
  })

  const onSubmit = async (data: FormSchema) => {
    setIsSending(true)

    await MailService.sendMail({
      ...data,
      senderEmail: "",
      organizationId: ""
    })

    toast.success("Mail sent successfully!")

    setIsSending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="recipientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  To
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title
                </FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>
                  Body
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button
            disabled={isSending}
            type="submit"
          >
            {isSending ? <Loader2Icon className="w-4 h-4 animate-spin" /> : (
              <>
                Send
                <SendHorizonalIcon className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

