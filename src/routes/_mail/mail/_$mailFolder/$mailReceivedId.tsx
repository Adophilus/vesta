import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useGetMailSent } from "../-components/hooks/mail"
import MailService from "@/lib/services/mail"
import { AlertCircleIcon, Loader2Icon } from "lucide-react"
import { MailDisplay } from "../-components/mail-display"
import { Result } from "true-myth"
import MailInterface from "@/lib/interfaces/mail"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

export const Route = createFileRoute('/_mail/mail/_$mailFolder/$mailReceivedId')({
  component: MailReceivedPage,
  loader: async ({ params: { mailReceivedId } }): Promise<Result<MailInterface.MailReceived.Fetch, string>> => {
    const mailReceived = await MailService.getReceivedMail(mailReceivedId)
    if (!mailReceived)
      return Result.err("Mail not found!")

    return Result.ok(mailReceived)
  }
})

function MailReceivedPage() {
  const queryClient = useQueryClient()
  const mailReceivedResult = Route.useLoaderData()
  if (mailReceivedResult.isErr)
    return (
      <div className="grow gap-4 flex justify-center items-center flex-col">
        <AlertCircleIcon className="h-12 w-12 mx-auto text-muted-foreground" />
        <header className="text-center text-muted-foreground">
          Mail not found
        </header>
      </div>
    )

  const mailReceived = mailReceivedResult.value

  const router = useRouter()

  const markMailAsRead = async () => {
    await MailService.markReceivedMailAsRead(mailReceived)
    router.invalidate()
    queryClient.invalidateQueries({
      queryKey: ["getMailsReceived"]
    })
  }

  useEffect(() => {
    markMailAsRead()
  }, [])

  const { isLoading, error, isError, data: mail } = useGetMailSent(mailReceived.data.mailId)

  if (isLoading)
    return (
      <div className="grow flex items-center justify-center">
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      </div>
    )

  if (isError)
    return (
      <div>
        {error.message}
      </div>
    )

  return (
    <MailDisplay
      mail={mail}
    />
  )
}
