import { Outlet, createFileRoute } from "@tanstack/react-router"
import { Mail } from "./-components/mail"
import { accounts, mails } from "./-components/data"
import { Layout } from "./-components/layout"

export const Route = createFileRoute('/mail/_layout')({
  component: MailLayout,
})

function MailLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

