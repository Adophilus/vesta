import { Link, useRouterState } from "@tanstack/react-router"

import { useGetMailsReceived } from "./hooks/mail";
import MailInterface from "@/lib/interfaces/mail";
import groupBy from "lodash/groupBy";
import { cn } from "@/lib/shad/utils"
import { buttonVariants } from "@/components/shad/ui/button"
import { AlertCircleIcon, ArchiveIcon, ArchiveXIcon, FileIcon, InboxIcon, LucideIcon, MessagesSquareIcon, SendIcon, ShoppingCartIcon, Trash2Icon, Users2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shad/ui/tooltip"
import { FunctionComponent } from "react";

interface NavProps {
  isCollapsed: boolean
}

const folders = [
  {
    title: "INBOX",
    icon: InboxIcon
  },
  {
    title: "DRAFT",
    icon: FileIcon
  },
  {
    title: "SENT",
    icon: SendIcon,
  },
  {
    title: "JUNK",
    icon: ArchiveXIcon,
  },
  {
    title: "TRASH",
    icon: Trash2Icon
  },
  {
    title: "ARCHIVE",
    icon: ArchiveIcon
  }
]

const MailFolderLink: FunctionComponent<{
  link: {
    title: string
    label: string
    icon: LucideIcon
  }
}> = ({ link }) => {
  const pathname = useRouterState({ select: state => state.location.pathname })
  const isCollapsed = false
  const isActive = pathname.startsWith(`/mail/${link.title.toLowerCase()}`)
  const variant = isActive ? "default" : "ghost"

  if (isCollapsed)
    return <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to="/mail/inbox"
          className={cn(
            buttonVariants({ variant: variant, size: "icon" }),
            "h-9 w-9"
          )}
        >
          <link.icon className="h-4 w-4" />
          <span className="sr-only">{link.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {link.title}
        {link.label && (
          <span className="ml-auto text-muted-foreground">
            {link.label}
          </span>
        )}
      </TooltipContent>
    </Tooltip>

  return (
    <Link
      to="#"
      className={cn(
        buttonVariants({ variant: variant, size: "sm" }),
        "justify-start"
      )}
    >
      <link.icon className="mr-2 h-4 w-4" />
      {link.title}
      {link.label && (
        <span
          className={cn(
            "ml-auto",
            isActive &&
            "text-background"
          )}
        >
          {link.label}
        </span>
      )}
    </Link>
  )
}


export function Nav({ isCollapsed }: NavProps) {
  const { data } = useGetMailsReceived()

  const count = groupBy(data ?? [], 'data.folder')

  const links = folders.map(folder => {
    let folderCount: string | number = count[folder.title]?.length ?? 0

    if (folderCount === 0)
      folderCount = ""


    return {
      ...folder,
      title: folder.title.charAt(0) + folder.title.slice(1).toLowerCase(),
      label: folderCount.toString(),
      variant: "ghost"
    }
  })

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <MailFolderLink
            key={link.title}
            link={link}
          />
        ))}
      </nav>
    </div>
  )
}

