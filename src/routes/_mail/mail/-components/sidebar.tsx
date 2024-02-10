import { Separator } from "@/components/shad/ui/separator";
import { AlertCircleIcon, ArchiveIcon, ArchiveXIcon, FileIcon, InboxIcon, MessagesSquareIcon, SendIcon, ShoppingCartIcon, Trash2Icon, Users2Icon } from "lucide-react";
import { Nav } from "./nav";
import { MailCompose } from "./mail-compose";
import { AccountSwitcher } from "./account-switcher";
import { accounts } from "./data";
import { useState } from "react";
import { cn } from "@/lib/shad/utils";
import { useGetMailsReceived } from "./hooks/mail";
import MailInterface from "@/lib/interfaces/mail";
import { groupBy } from "lodash/groupBy";

function countMailFolder(mails?: MailInterface.MailReceived.Fetch[]) {
  if (mails) {
    const groups = groupBy(mails, "folder")
    console.log(groups)
  }
}

export function Sidebar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (_: boolean) => void }) {
  const { data } = useGetMailsReceived()

  const count = countMailFolder(data)

  return (
    <>
      <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]' : 'px-2')}>
        <AccountSwitcher />
      </div>
      <Separator />
      <MailCompose />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Inbox",
            label: count.inbox,
            icon: InboxIcon,
            variant: "default",
          },
          {
            title: "Drafts",
            label: count.drafts,
            icon: FileIcon,
            variant: "ghost",
          },
          {
            title: "Sent",
            label: count.sent,
            icon: SendIcon,
            variant: "ghost",
          },
          {
            title: "Junk",
            label: count.junk,
            icon: ArchiveXIcon,
            variant: "ghost",
          },
          {
            title: "Trash",
            label: count.trash,
            icon: Trash2Icon,
            variant: "ghost",
          },
          {
            title: "Archive",
            label: count.archive,
            icon: ArchiveIcon,
            variant: "ghost",
          },
        ]}
      />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Social",
            label: "972",
            icon: Users2Icon,
            variant: "ghost",
          },
          {
            title: "Updates",
            label: "342",
            icon: AlertCircleIcon,
            variant: "ghost",
          },
          {
            title: "Forums",
            label: "128",
            icon: MessagesSquareIcon,
            variant: "ghost",
          },
          {
            title: "Shopping",
            label: "8",
            icon: ShoppingCartIcon,
            variant: "ghost",
          },
          {
            title: "Promotions",
            label: "21",
            icon: ArchiveIcon,
            variant: "ghost",
          },
        ]}
      />
    </>
  )
}
