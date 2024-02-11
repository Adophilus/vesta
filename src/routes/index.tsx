import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return "This is the index page"
}
