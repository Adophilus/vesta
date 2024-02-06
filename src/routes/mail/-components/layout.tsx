import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/shad/ui/resizable"
import { cn } from "@/lib/shad/utils"
import { Separator } from "@/components/shad/ui/separator"
import { AccountSwitcher } from "./account-switcher"
import { Nav } from "./nav"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  PenBox,
  PenIcon,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"
import { MailCompose } from "./mail-compose"
import { accounts } from "./data"
import { ReactNode, useState } from "react"
import { TooltipProvider } from "@/components/shad/ui/tooltip"
import { Sidebar } from "./sidebar"
import { Outlet } from "@tanstack/react-router"

export function Layout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={265}
          collapsedSize={4}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(!isCollapsed)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              !isCollapsed
            )}`
          }}
          className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={440}
          minSize={30}
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
