import { Separator } from "@/components/shad/ui/separator";
import { AlertCircleIcon, ArchiveIcon, ArchiveXIcon, FileIcon, InboxIcon, LucideIcon, MessagesSquareIcon, SendIcon, ShoppingCartIcon, Trash2Icon, Users2Icon } from "lucide-react";
import { Nav } from "./nav";
import { MailCompose } from "./mail-compose";
import { AccountSwitcher } from "./account-switcher";
import { cn } from "@/lib/shad/utils";

export function Sidebar({ isCollapsed }: { isCollapsed: boolean, setIsCollapsed: (_: boolean) => void }) {
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
      />
      <Separator />
      {/*<Nav
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
      />*/}
    </>
  )
}
