import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/workspace')({
  component: WorkspacePage
})

function WorkspacePage() {
  return (
    <div className="grow bg-foreground">
    </div>
  )
}
