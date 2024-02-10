import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/shad/ui/resizable"
import { FunctionComponent, ReactNode } from "react"

export const Layout: FunctionComponent<{ children: ReactNode, sidepanel: ReactNode }> = ({ children, sidepanel }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="grow items-stretch"
    >
      <ResizablePanel className="flex flex-col grow">
        {children}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="flex flex-col grow">
        {sidepanel}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
