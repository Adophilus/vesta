import { Button, buttonVariants } from "@/components/shad/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shad/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shad/ui/form";
import { Input } from "@/components/shad/ui/input";
import { Loader2Icon, PaperclipIcon, PenIcon, SendHorizonalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import * as utils from "./utils"
import MailService from "@/lib/services/mail";
import { Textarea } from "@/components/shad/ui/textarea";
import { FunctionComponent, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/hooks/auth";
import { useMailStore } from "./store";
import { useGetMailsReceived, useInvalidate } from "./hooks/mail";
import { useProfile } from "@/lib/hooks/profile";
import { FileTile } from "./file-tile";
import { DialogClose } from "@radix-ui/react-dialog";
import { cn } from "@/lib/shad/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shad/ui/tooltip";

export function MailCompose({ isCollapsed }: { isCollapsed: boolean }) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  if (isCollapsed)
    return (
      <div className="p-2">
        <Dialog>
          <DialogTrigger className="w-full" asChild>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "default", size: "icon" }),
                    "h-9 w-9",
                  )}
                >
                  <PenIcon className="h-4 w-4" />
                  <span className="sr-only">Compose mail</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                <span className="ml-auto text-muted-foreground">
                  Compose
                </span>
              </TooltipContent>
            </Tooltip>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-4">
            <DialogHeader>
              <DialogTitle>Compose mail</DialogTitle>
            </DialogHeader>
            <ComposeMailForm onSend={() => dialogCloseRef.current?.click()} />
            <DialogClose ref={dialogCloseRef} />
          </DialogContent>
        </Dialog>
      </div>
    )

  return (
    <div className="p-2">
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="flex items-center w-full" variant="default">
            <PenIcon className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] p-4">
          <DialogHeader>
            <DialogTitle>Compose mail</DialogTitle>
          </DialogHeader>
          <ComposeMailForm onSend={() => dialogCloseRef.current?.click()} />
          <DialogClose ref={dialogCloseRef} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const formSchema = z.object({
  files: z.array(z.instanceof(File)),
  recipientEmail: z.string().email(),
  subject: z.string(),
  cc: z.array(z.string().email()),
  bcc: z.array(z.string().email()),
  body: z.string().min(1, { message: "Please enter a message" }),
})

type FormSchema = z.infer<typeof formSchema>

const ComposeMailForm: FunctionComponent<{ onSend: () => void }> = ({ onSend }) => {
  const [isSending, setIsSending] = useState(false)
  const profile = useProfile()

  const invalidate = useInvalidate()

  const fileRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
      subject: "",
      recipientEmail: "",
      body: "",
      cc: [],
      bcc: []
    }
  })

  const files = form.watch("files")

  const onSubmit = async (data: FormSchema) => {
    setIsSending(true)

    const { files, ...payload } = data

    const attachments = await utils.uploadAssets(files)

    await utils.sendMail({
      ...payload,
      sender: profile.data,
      attachments,
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
        </div>
        <DialogFooter>
          <div className="flex justify-between grow">
            <div>
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
            </div>
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
          </div>
        </DialogFooter>
      </form>
    </Form>
  )
}

