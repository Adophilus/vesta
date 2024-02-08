import { ComponentProps } from "react"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

import { cn } from "@/lib/shad/utils"
import { Badge } from "@/components/shad/ui/badge"
import { ScrollArea } from "@/components/shad/ui/scroll-area"
import { Separator } from "@/components/shad/ui/separator"
import { Mail } from "./data"
import { useMail } from "./use-mail"
import { Link, useRouter, useRouterState } from "@tanstack/react-router"
import { FunctionComponent } from "react"
import MailInterface from "@/lib/interfaces/mail"
import MailService from "@/lib/services/mail"
import { useEffect } from "react"
import { useState } from "react"

type State = {
  isLoading: true
  mail: null
} | {
  isLoading: false
  mail: null | MailInterface.Mail.Fetch
}

const MailListItem: FunctionComponent<{ mail: MailInterface.MailReceived.Fetch }> = ({ mail: mailReceived }) => {
  const [state, setState] = useState<State>({ isLoading: true, mail: null })

  const pathname = useRouterState({ select: state => state.location.pathname })
  const mailLink = `/mail/inbox/${mailReceived.key}`
  const isSelected = pathname === mailLink

  const fetchMail = async () => {
    const mail = await MailService.getSentMail(mailReceived.data.mailId)

    if (!mail) {
      setState({
        isLoading: false,
        mail: null
      })
      return
    }

    setState({
      isLoading: false,
      mail
    })
  }

  useEffect(() => {
    fetchMail()
  }, [fetchMail])

  const { mail, isLoading } = state

  if (isLoading)
    return null

  if (!mail)
    return null

  return (
    <Link
      href={mailLink}
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
      activeProps={{ className: "bg-muted" }}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              {mail.data.title}
            </div>
            {!mailReceived.data.isRead && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div
            className={cn(
              "ml-auto text-xs",
              isSelected
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {/*formatDistanceToNow(new Date(mail.data), {
              addSuffix: true,
            })*/}
          </div>
        </div>
        <div className="text-xs font-medium">{mail.data.title}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {mail.data.body.substring(0, 300)}
      </div>
      {mailReceived.data.labels.length ? (
        <div className="flex items-center gap-2">
          {mailReceived
            .data
            .labels
            .map((label) => (
              <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                {label}
              </Badge>
            ))}
        </div>
      ) : null}
    </Link>
  )
}

export const MailList: FunctionComponent<{ mails: MailInterface.MailReceived.Fetch[] }> = ({ mails }) => {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {mails.map((mail) => (
          <MailListItem key={mail.key} mail={mail} />
        ))}
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default"
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline"
  }

  return "secondary"
}

