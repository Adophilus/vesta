import { Separator } from "@/components/shad/ui/separator";
import { AlertCircleIcon, ArchiveIcon, ArchiveXIcon, FileIcon, InboxIcon, MessagesSquareIcon, SendIcon, ShoppingCartIcon, Trash2Icon, Users2Icon } from "lucide-react";
import { Nav } from "./nav";
import { MailCompose } from "./mail-compose";
import { AccountSwitcher } from "./account-switcher";
import { accounts } from "./data";
import { useState } from "react";
import { cn } from "@/lib/shad/utils";

export function Sidebar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (_: boolean) => void }) {
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
            label: "128",
            icon: InboxIcon,
            variant: "default",
          },
          {
            title: "Drafts",
            label: "9",
            icon: FileIcon,
            variant: "ghost",
          },
          {
            title: "Sent",
            label: "",
            icon: SendIcon,
            variant: "ghost",
          },
          {
            title: "Junk",
            label: "23",
            icon: ArchiveXIcon,
            variant: "ghost",
          },
          {
            title: "Trash",
            label: "",
            icon: Trash2Icon,
            variant: "ghost",
          },
          {
            title: "Archive",
            label: "",
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
