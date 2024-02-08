import { Outlet, createFileRoute } from "@tanstack/react-router"
import { Layout } from "./_mail/mail/-components/layout"

export const Route = createFileRoute('/_mail')({
  component: MailLayout,
})

function MailLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}


