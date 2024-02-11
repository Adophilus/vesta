import { Button } from "@/components/shad/ui/button"
import MailInterface from "@/lib/interfaces/mail"
import { FunctionComponent } from "react"
import { moveMailTo } from "../utils"
import { ArchiveIcon, ArchiveXIcon, ClockIcon, InboxIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shad/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shad/ui/popover"
import { Calendar } from "@/components/shad/ui/calendar"
import { addDays } from "date-fns/addDays"
import { addHours } from "date-fns/addHours"
import { format } from "date-fns/format"
import { nextSaturday } from "date-fns/nextSaturday"

namespace MailTooltip {
  export const Inbox: FunctionComponent<{
    mail: MailInterface.MailSent.Fetch
    mailReceived: MailInterface.MailReceived.Fetch
    invalidate: () => void
  }> = ({ mail, mailReceived, invalidate }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost"
            onClick={() => {
              moveMailTo(mailReceived, "INBOX")
              invalidate()
            }}
            size="icon" disabled={!mail}>
            <InboxIcon className="h-4 w-4" />
            <span className="sr-only">Move to inbox</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Move to inbox</TooltipContent>
      </Tooltip>
    )
  }
  export const Archive: FunctionComponent<{
    mail: MailInterface.MailSent.Fetch
    mailReceived: MailInterface.MailReceived.Fetch
    invalidate: () => void
  }> = ({ mail, mailReceived, invalidate }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost"
            onClick={() => {
              moveMailTo(mailReceived, "ARCHIVE")
              invalidate()
            }}
            size="icon" disabled={!mail}>
            <ArchiveIcon className="h-4 w-4" />
            <span className="sr-only">Archive</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Archive</TooltipContent>
      </Tooltip>
    )
  }

  export const Spam: FunctionComponent<{
    mail: MailInterface.MailSent.Fetch
    mailReceived: MailInterface.MailReceived.Fetch
    invalidate: () => void
  }> = ({ mail, mailReceived, invalidate }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost"
            onClick={() => {
              moveMailTo(mailReceived, "SPAM")
              invalidate()
            }}
            size="icon" disabled={!mail}>
            <ArchiveXIcon className="h-4 w-4" />
            <span className="sr-only">Move to spam</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Move to spam</TooltipContent>
      </Tooltip>
    )
  }

  export const Trash: FunctionComponent<{
    mail: MailInterface.MailSent.Fetch
    mailReceived: MailInterface.MailReceived.Fetch
    invalidate: () => void
  }> = ({ mail, mailReceived, invalidate }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost"
            onClick={() => {
              moveMailTo(mailReceived, "TRASH")
              invalidate()
            }}
            size="icon" disabled={!mail}>
            <ArchiveXIcon className="h-4 w-4" />
            <span className="sr-only">Move to trash</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Move to Trash</TooltipContent>
      </Tooltip>
    )
  }

  export const Snooze: FunctionComponent<{
    mail: MailInterface.MailSent.Fetch
    mailReceived: MailInterface.MailReceived.Fetch
    invalidate: () => void
  }> = ({ mail, mailReceived, invalidate }) => {
    const today = new Date()

    return (
      <Tooltip>
        <Popover>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ClockIcon className="h-4 w-4" />
                <span className="sr-only">Snooze</span>
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <PopoverContent className="flex w-[535px] p-0">
            <div className="flex flex-col gap-2 border-r px-2 py-4">
              <div className="px-4 text-sm font-medium">Snooze until</div>
              <div className="grid min-w-[250px] gap-1">
                <Button
                  variant="ghost"
                  className="justify-start font-normal"
                >
                  Later today{" "}
                  <span className="ml-auto text-muted-foreground">
                    {format(addHours(today, 4), "E, h:m b")}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-normal"
                >
                  Tomorrow
                  <span className="ml-auto text-muted-foreground">
                    {format(addDays(today, 1), "E, h:m b")}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-normal"
                >
                  This weekend
                  <span className="ml-auto text-muted-foreground">
                    {format(nextSaturday(today), "E, h:m b")}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-normal"
                >
                  Next week
                  <span className="ml-auto text-muted-foreground">
                    {format(addDays(today, 7), "E, h:m b")}
                  </span>
                </Button>
              </div>
            </div>
            <div className="p-2">
              <Calendar />
            </div>
          </PopoverContent>
        </Popover>
        <TooltipContent>Snooze</TooltipContent>
      </Tooltip>
    )
  }

}

export default MailTooltip
