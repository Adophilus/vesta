import { Button } from "@/components/shad/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shad/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shad/ui/form";
import { Input } from "@/components/shad/ui/input";
import { Loader2Icon, PenIcon, SendHorizonalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import * as utils from "./utils"
import MailService from "@/lib/services/mail";
import { Textarea } from "@/components/shad/ui/textarea";
import { FunctionComponent, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/hooks/auth";
import { useMailStore } from "./store";
import { useGetMailsReceived, useInvalidate } from "./hooks/mail";

export function MailCompose() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-2">
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)} className="w-full" variant="outline">
            <PenIcon className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Compose mail</DialogTitle>
          </DialogHeader>
          <ComposeMailForm onSend={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const formSchema = z.object({
  recipientEmail: z.string().email(),
  subject: z.string(),
  cc: z.array(z.string().email()),
  bcc: z.array(z.string().email()),
  body: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

const ComposeMailForm: FunctionComponent<{ onSend: () => void }> = ({ onSend }) => {
  const [isSending, setIsSending] = useState(false)
  const { isSignedIn, profiles, activeProfileIndex } = useAuthStore(store => ({
    isSignedIn: store.isSignedIn,
    profiles: store.profiles,
    activeProfileIndex: store.activeProfile
  }))

  const invalidate = useInvalidate()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "Test",
      recipientEmail: "adophilus@myjunoapp.com",
      body: "This is a test email",
      cc: [],
      bcc: []
    }
  })

  if (!isSignedIn || activeProfileIndex === null) return null
  const profile = profiles![activeProfileIndex]
  if (!profile) return null

  const onSubmit = async (data: FormSchema) => {
    setIsSending(true)

    await utils.sendMail({
      ...data,
      sender: profile.data,
      attachments: [],
      organizationId: ""
    })
      .then(() => setIsSending(false))
      .catch(() => setIsSending(false))

    invalidate.getMailsReceived()
    invalidate.getMailsSent()

    onSend()
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
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Subject
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

