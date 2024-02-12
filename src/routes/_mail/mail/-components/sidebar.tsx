import { Separator } from "@/components/shad/ui/separator";
import { ComponentIcon, LogOutIcon } from "lucide-react";
import { Nav } from "./nav";
import { MailCompose } from "./mail-compose";
import { AccountSwitcher } from "./account-switcher";
import { cn } from "@/lib/shad/utils";
import { Button } from "@/components/shad/ui/button";
import { useAuthStore } from "@/lib/hooks/auth"
import { Link } from "@tanstack/react-router"
import { combine } from "zustand/middleware";
import { create } from "zustand";

type SidebarStore = {
  isCollapsed: boolean
}

export const useSidebar = create(
  combine(
    {
      isCollapsed: false,
    } as SidebarStore,
    (set, get) => ({
      setIsCollapsed: (cb: (prev: SidebarStore["isCollapsed"]) => SidebarStore["isCollapsed"]) => {
        set({
          isCollapsed: cb(get().isCollapsed)
        })
      }
    })
  )
)

export function Sidebar() {
  const signOut = useAuthStore(store => store.signOut)
  const isCollapsed = useSidebar(store => store.isCollapsed)

  return (
    <div className="flex flex-col grow">
      <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]' : 'px-2')}>
        <AccountSwitcher />
      </div>
      <Separator />
      <MailCompose isCollapsed={isCollapsed} />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
      />
      <Separator />
      <div className="flex p-2 gap-2 flex-col grow justify-end">
        <Link
          to="/workspace"
          className="flex w-full"
        >
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-2"
          >
            <ComponentIcon className="w-4 h-4" />
            Workspace
          </Button>
        </Link>
        <Button
          onClick={() => signOut()}
          variant="ghost"
          className="flex justify-start gap-2">
          <LogOutIcon className="w-4 h-4" />
          Sign out
        </Button>
      </div>
    </div >
  )
}
