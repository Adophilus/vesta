import { ComponentProps } from "react"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

import { cn } from "@/lib/shad/utils"
import { Badge } from "@/components/shad/ui/badge"
import { ScrollArea } from "@/components/shad/ui/scroll-area"
import { Separator } from "@/components/shad/ui/separator"
import { Mail } from "./data"
import { useMail } from "./use-mail"
import { Link, useRouter } from "@tanstack/react-router"
import { FunctionComponent } from "react"
import MailInterface from "@/lib/interfaces/mail"

const MailListItem: FunctionComponent<{ mail: MailInterface.MailReceived.Fetch }> = ({ mail }) => {
  const router = useRouter()
  console.log(router.basepath)

  return (
    <Link
      href={`/mail/inbox/${mail.key}`}
      key={mail.key}
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
      activeProps={{ className: "bg-muted" }}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{mail.name}</div>
            {!mail.data.isRead && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div
            className={cn(
              "ml-auto text-xs",
              mail.selected === mail.id
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {/*formatDistanceToNow(new Date(mail.data), {
              addSuffix: true,
            })*/}
          </div>
        </div>
        <div className="text-xs font-medium">{mail.subject}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {mail.text.substring(0, 300)}
      </div>
      {mail.labels.length ? (
        <div className="flex items-center gap-2">
          {mail.labels.map((label) => (
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
  console.log(mails)

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

