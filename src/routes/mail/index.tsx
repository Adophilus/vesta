import { createFileRoute } from "@tanstack/react-router"
import { Mail } from "./-components/mail"
import { accounts, mails } from "./-components/data"

export const Route = createFileRoute('/mail/')({
  component: Index,
})

function Index() {
  const defaultLayout = undefined
  const defaultCollapsed = undefined

  return (
    <Mail
      accounts={accounts}
      mails={mails}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    />
  )
}

