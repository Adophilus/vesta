import { Button } from "@/components/shad/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shad/ui/form"
import { Label } from "@/components/shad/ui/label"
import { Switch } from "@/components/shad/ui/switch"
import { Textarea } from "@/components/shad/ui/textarea"
import MailInterface from "@/lib/interfaces/mail"
import { zodResolver } from "@hookform/resolvers/zod"
import { FunctionComponent, HTMLAttributes, forwardRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import * as utils from "../utils"
import { useAuthStore } from "@/lib/hooks/auth"
import { useProfile } from "@/lib/hooks/profile"
import { Loader2Icon, PaperclipIcon, SendHorizonalIcon, XIcon } from "lucide-react"
import AssetService from "@/lib/services/asset"
import { useRouter } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { FileTile } from "../file-tile"

type ReplyFormProps = HTMLAttributes<HTMLTextAreaElement> & {
  mail: MailInterface.MailSent.Fetch
  mailReceived: MailInterface.MailReceived.Fetch
}

const formSchema = z.object({
  body: z.string().min(1, { message: "Body cannot be empty" }),
  files: z.array(z.instanceof(File))
})

type FormSchema = z.infer<typeof formSchema>

export const ReplyForm = forwardRef<HTMLTextAreaElement, ReplyFormProps>(({ mail, mailReceived }, ref) => {
  const profile = useProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      files: []
    }
  })

  const files = form.watch("files")

  const router = useRouter()
  const queryClient = useQueryClient()

  const invalidate = () => {
    utils.invalidate({
      mailSent: mail,
      mailReceived,
      router,
      queryClient
    })
  }

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true)

    const subject = mail.data.subject.startsWith("Reply-To: ") ?
      `Reply-To: ${mail.data.subject.slice(10)}` :
      `Reply-To: ${mail.data.subject}`

    const { files, ...payload } = data

    const attachments = await utils.uploadAssets(files)

    await utils.sendMail({
      ...payload,
      cc: mail.data.cc,
      bcc: mail.data.bcc,
      recipientEmail: mailReceived.data.sender.email,
      attachments,
      subject,
      sender: profile.data,
      organizationId: "",
    })
      .then(() => {
        invalidate()
        form.reset()
        setIsSubmitting(false)
      })
      .catch(() => setIsSubmitting(false))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="p-4"
                    placeholder={`Reply ${mail.data.sender.email}`}
                    {...field}
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-4">
            {files.map((file, index) => (
              <FileTile
                key={index}
                file={file}
                onRemove={() => {
                  const newFiles = [
                    ...files.slice(0, index)
                      .concat(files.slice(index + 1))
                  ]
                  form.setValue("files", newFiles)
                }}
              />
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="file"
              multiple
              ref={fileRef}
              className="absolute invisible"
              onChange={e => {
                const newFiles = [...files]
                for (const file of e.target.files ?? []) {
                  newFiles.push(file)
                }

                form.setValue("files", newFiles)
              }}
            />
            <Button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="gap-2">
              <PaperclipIcon className="w-4 h-4" />
              Add
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              size="sm"
              className="ml-auto flex gap-2"
            >
              {isSubmitting ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Send
                  <SendHorizonalIcon className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
})
