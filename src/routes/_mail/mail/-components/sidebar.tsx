import { Separator } from "@/components/shad/ui/separator";
import { LogOutIcon } from "lucide-react";
import { Nav } from "./nav";
import { MailCompose } from "./mail-compose";
import { AccountSwitcher } from "./account-switcher";
import { cn } from "@/lib/shad/utils";
import { Button } from "@/components/shad/ui/button";
import { useAuthStore } from "@/lib/hooks/auth"

export function Sidebar({ isCollapsed }: { isCollapsed: boolean, setIsCollapsed: (_: boolean) => void }) {
  const signOut = useAuthStore(store => store.signOut)

  return (
    <div className="flex flex-col grow">
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
      <div className="flex p-2 flex-col grow justify-end">
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
