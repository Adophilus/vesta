import { ComponentProps } from "react"
import { cn } from "@/lib/shad/utils"
import { useGetMailSent, useInvalidate, useMailFolder } from "../hooks/mail"
import { Link, useRouterState } from "@tanstack/react-router"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import * as utils from "../utils"
import MailInterface from "@/lib/interfaces/mail"
import { FunctionComponent } from "react"
import { Badge } from "@/components/shad/ui/badge"
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/shad/ui/context-menu"
import { ArchiveIcon, ArchiveXIcon, ArrowRightIcon, BellIcon, BellOffIcon, ClockIcon, EyeOffIcon, InboxIcon, RefreshCwIcon, StarIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"
import { Skeleton } from "@/components/shad/ui/skeleton"
import { Route } from "../../_$mailFolder"

export const Item: FunctionComponent<{
  mail: MailInterface.MailReceived.Fetch
}> = ({ mail: mailReceived }) => {
  return (
    <ItemWithContextMenu
      mail={mailReceived}
    />
  )
}

const ItemWithContextMenu: FunctionComponent<{
  mail: MailInterface.MailReceived.Fetch
}> = ({ mail: mailReceived }) => {
  const pathname = useRouterState({ select: state => state.location.pathname })
  const mailFolder = useMailFolder()
  const mailLink = `/mail/${mailFolder.toLowerCase()}/${mailReceived.key}`
  const { isLoading, error, isError, data: mail } = useGetMailSent(mailReceived.data.mailId)
  const isSelected = pathname === mailLink
  const queryClient = useQueryClient()
  const router = useRouter()

  // console.log("render")
  // isError = true

  if (isLoading)
    return <ItemBody.Loading />

  if (isError) {
    console.log(error)
    return <ItemBody.Error
      mailId={mailReceived.data.mailId}
    />
  }

  if (!mail) return null

  const invalidate = () => {
    utils.invalidate({
      mailSent: mail,
      mailReceived,
      router,
      queryClient
    })
  }

  const moveMailTo = (folder: MailInterface.MailFolder) => {
    utils.moveMailTo(mailReceived, folder)
    invalidate()
  }

  const muteMail = async () => {
    await utils.muteMail(mailReceived)
    invalidate()
  }


  const starMail = async () => {
    await utils.starMail(mailReceived)
    invalidate()
  }

  const unStarMail = async () => {
    await utils.unStarMail(mailReceived)
    invalidate()
  }

  const deleteMail = async () => {
    toast('Are you sure you want to delete this mail?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          await utils.deleteMail(mailReceived)
          invalidate()
        }
      },
    });
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ItemBody
          mailLink={mailLink}
          mailReceived={mailReceived}
          mail={mail}
          isSelected={isSelected}
        />
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {mailReceived.data.isRead && (
          <ContextMenuItem
            onClick={() => muteMail()}
            className="gap-2">
            <EyeOffIcon className="h-4 w-4" />
            Mark as unread
          </ContextMenuItem>
        )}
        <ContextMenuItem
          onClick={() => muteMail()}
          className={cn("gap-2", !mailReceived.data.isMuted && "text-muted-foreground")}>
          {mailReceived.data.isMuted ? (
            <>
              <BellIcon className="h-4 w-4" />
              Unmute
            </>
          ) : (
            <>
              <BellOffIcon className="h-4 w-4" />
              Mute
            </>
          )}
        </ContextMenuItem>
        <ContextMenuItem className="gap-2">
          <ClockIcon className="h-4 w-4" />
          Snooze
        </ContextMenuItem>
        {["INBOX", "IMPORTANT"] && (
          <ContextMenuItem
            onClick={() => {
              if (mailReceived.data.isStarred)
                unStarMail()
              else
                starMail()
            }}
            className="gap-2">
            {mailReceived.data.isStarred ? (
              <>
                <StarIcon className="h-4 w-4" />
                Unstar
              </>
            ) : (
              <>
                <StarIcon
                  onClick={() => utils.unStarMail(mailReceived)}
                  className="fill-foreground h-4 w-4" />
                Star
              </>
            )}
          </ContextMenuItem>
        )}
        {["INBOX", "SPAM", "ARCHIVE", "TRASH"].includes(mailReceived.data.folder) && (
          <ContextMenuSub>
            <ContextMenuSubTrigger className="gap-2">
              <ArrowRightIcon className="h-4 w-4" />
              Move To
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              {mailReceived.data.folder === "INBOX" && (
                <>
                  <ContextMenuItem
                    onClick={() => moveMailTo("ARCHIVE")}
                    className="gap-2">
                    <ArchiveIcon className="h-4 w-4" />
                    Archive
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => moveMailTo("SPAM")}
                    className="gap-2">
                    <ArchiveXIcon className="h-4 w-4" />
                    Spam
                  </ContextMenuItem>
                </>
              )}
              {mailReceived.data.folder === "ARCHIVE" && (
                <>
                  <ContextMenuItem
                    onClick={() => moveMailTo("INBOX")}
                    className="gap-2">
                    <InboxIcon className="h-4 w-4" />
                    Inbox
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => moveMailTo("SPAM")}
                    className="gap-2">
                    <ArchiveXIcon className="h-4 w-4" />
                    Spam
                  </ContextMenuItem>
                </>
              )}
              {mailReceived.data.folder === "SPAM" && (
                <>
                  <ContextMenuItem
                    onClick={() => moveMailTo("INBOX")}
                    className="gap-2">
                    <InboxIcon className="h-4 w-4" />
                    Inbox
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => moveMailTo("ARCHIVE")}
                    className="gap-2">
                    <ArchiveIcon className="h-4 w-4" />
                    Archive
                  </ContextMenuItem>
                </>
              )}
              {mailReceived.data.folder === "TRASH" && (
                <>
                  <ContextMenuItem
                    onClick={() => moveMailTo("INBOX")}
                    className="gap-2">
                    <InboxIcon className="h-4 w-4" />
                    Inbox
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => moveMailTo("ARCHIVE")}
                    className="gap-2">
                    <ArchiveIcon className="h-4 w-4" />
                    Archive
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => moveMailTo("SPAM")}
                    className="gap-2">
                    <ArchiveXIcon className="h-4 w-4" />
                    Spam
                  </ContextMenuItem>
                </>
              )}
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
        {mailReceived.data.folder === "TRASH" && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => deleteMail()}
              className="gap-2 text-red-700">
              <Trash2Icon className="h-4 w-4" />
              Delete permanently
            </ContextMenuItem>
          </>
        )}
        {["INBOX", "SPAM", "ARCHIVE", "IMPORTANT"].includes(mailReceived.data.folder) && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => moveMailTo("TRASH")}
              className="gap-2 text-red-700">
              <Trash2Icon className="h-4 w-4" />
              Trash
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu >
  )
}

type ItemBodyProps = {
  mailReceived: MailInterface.MailReceived.Fetch
  mail: MailInterface.MailSent.Fetch
  mailLink: string
  isSelected: boolean
}

function ItemBody({ mail, mailReceived, mailLink }: ItemBodyProps) {
  const { filter } = Route.useSearch()
  if (filter && !utils.filterMailBySearch(mail, filter))
    return null

  return (
    <Link
      to={mailLink}
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
      activeProps={{ className: "bg-muted" }}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn("font-semibold", mailReceived.data.isRead && "text-muted-foreground")}>
              {mail.data.subject}
            </div>
            {!mailReceived.data.isRead && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div
            className={cn(
              "ml-auto text-xs flex items-center gap-2",
              !mailReceived.data.isRead
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {mailReceived.data.isStarred && (
              <StarIcon className="fill-foreground h-4 w-4" />
            )}
            {formatDistanceToNow(new Date(mail.data.sentAt), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div
          className={cn("text-xs font-medium", mailReceived.data.isRead && "text-muted-foreground")}
        >
          {utils.formatMailProfile(mailReceived.data.sender)}
        </div>
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

ItemBody.Loading = () => {
  return (
    <button
      type="button"
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="w-20 h-6" />
          </div>
          <div
            className="ml-auto text-xs flex items-center gap-2"
          >
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <div
          className="text-xs font-medium"
        >
          <Skeleton className="w-16 h-3" />
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        <Skeleton className="w-64 h-2" />
      </div>
    </button>
  )
}

ItemBody.Error = ({ mailId }: { mailId: string }) => {
  const { getMailSent } = useInvalidate()

  const invalidate = () => getMailSent(mailId)

  return (
    <button
      type="button"
      onClick={() => invalidate()}
      className="flex items-start gap-2 rounded-lg border-2 border-red-600 bg-red-100 text-red-700 p-3 text-left text-sm transition-all hover:bg-red-100/50"
    >
      <span className="grow flex gap-2 items-center justify-center flex-col">
        Opps... Something went wrong
        <span
          className="flex gap-2 items-center bg-red-600 text-white px-2 py-1 rounded-md "
        >
          <RefreshCwIcon className="w-6 h-6" /> Retry
        </span>
      </span>
    </button>
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
