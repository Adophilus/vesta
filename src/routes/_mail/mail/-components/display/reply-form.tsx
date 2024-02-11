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
import { Loader2Icon, PaperclipIcon, XIcon } from "lucide-react"
import AssetService from "@/lib/services/asset"
import { useRouter } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"

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

export const FileTile: FunctionComponent<{ file: File, onRemove: () => void }> = ({ file, onRemove }) => {
  const url = URL.createObjectURL(file)

  return (
    <div
      className="relative inline-flex group w-24 border-[3px] border-foreground rounded-lg aspect-square">
      <button
        type="button"
        onClick={() => onRemove()}
        className="z-10 bg-white rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 p-1 border-[3px] border-foreground"
      >
        <XIcon className="w-4 h-4 stroke-[3px]" />
      </button>
      <div className="w-full h-full absolute group:hover:bg-white-100/50" />
      <img src={url}
        className="rounded-md w-full h-full object-cover"
        alt={file.name} />
    </div>
  )
}
