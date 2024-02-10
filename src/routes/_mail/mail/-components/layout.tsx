import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/shad/ui/resizable"
import { cn } from "@/lib/shad/utils"
import { ReactNode, useState } from "react"
import { TooltipProvider } from "@/components/shad/ui/tooltip"
import { Sidebar } from "./sidebar"
import { useEffect } from "react"
import { useMailStore } from "./store"

export function Layout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const load = useMailStore(store => store.load)

  useEffect(() => {
    load()
  }, [load])

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="grow items-stretch"
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
