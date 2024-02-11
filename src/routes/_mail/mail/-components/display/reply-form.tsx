import { Button } from "@/components/shad/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shad/ui/form"
import { Label } from "@/components/shad/ui/label"
import { Switch } from "@/components/shad/ui/switch"
import { Textarea } from "@/components/shad/ui/textarea"
import MailInterface from "@/lib/interfaces/mail"
import { zodResolver } from "@hookform/resolvers/zod"
import { FunctionComponent, HTMLAttributes, forwardRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import * as utils from "../utils"
import { useAuthStore } from "@/lib/hooks/auth"
import { useProfile } from "@/lib/hooks/profile"
import { Loader2Icon } from "lucide-react"
import AssetService from "@/lib/services/asset"

type ReplyFormProps = HTMLAttributes<HTMLTextAreaElement> & {
  mail: MailInterface.MailSent.Fetch
  mailReceived: MailInterface.MailReceived.Fetch
}

const formSchema = z.object({
  body: z.string().min(1),
  files: z.array(z.instanceof(File))
})

type FormSchema = z.infer<typeof formSchema>

export const ReplyForm = forwardRef<HTMLTextAreaElement, ReplyFormProps>(({ mail, mailReceived }, ref) => {
  const profile = useProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      files: []
    }
  })

  const files = form.watch("files")

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true)

    const subject = mail.data.subject.startsWith("Reply-To: ") ?
      `Reply-To: ${mail.data.subject.slice(10)}` :
      `Reply-To: ${mail.data.subject}`

    const { files, ...payload } = data

    const attachments: MailInterface.MailAttachment[] = await Promise.all(
      files.map(async (file) => {
        const asset = await AssetService.upload(file)
        return {
          type: "asset",
          assetId: asset.key
        }
      })
    )

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
      .then(() => setIsSubmitting(false))
      .catch(() => setIsSubmitting(false))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="body"
            render={() => (
              <FormItem>
                <FormControl>
                  <Textarea
                    ref={ref}
                    className="p-4"
                    placeholder={`Reply ${mail.data.sender.email}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-flow-col gap-4">
            {files.map((file, index) => (
              <FileTile
                key={index}
                file={file}
              />
            ))}
          </div>
          <div className="flex items-center">
            <Label
              htmlFor="mute"
              className="flex items-center gap-2 text-xs font-normal"
            >
              <Switch id="mute" aria-label="Mute thread" /> Mute this
              thread
            </Label>
            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={(e) => e.preventDefault()}
              size="sm"
              className="ml-auto"
            >
              {isSubmitting ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : "Send"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
})

export const FileTile: FunctionComponent<{ file: File }> = ({ file }) => {
  const url = URL.createObjectURL(file)

  return (
    <div
      className="relative w-36 border-2 border-foreground rounded-md aspect-square">
      <div className="w-full h-full absolute hover:bg-white-100/50" />
      <img src={url}
        className="w-full h-full"
        alt={file.name} />
    </div>
  )
}
