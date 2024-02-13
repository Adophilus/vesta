import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { useAuthStore } from "@/lib/hooks/auth"
import { Layout } from "./_mail/mail/-components/layout"
import { MobileNoticeBanner } from "./_mail/mail/-components/mobile-banner"

export const Route = createFileRoute('/_mail')({
  component: MailLayout,
  beforeLoad: () => {
    const { isSignedIn } = useAuthStore.getState()

    if (!isSignedIn)
      throw redirect({
        to: "/auth/sign-in"
      })
  }
})

function MailLayout() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <MobileNoticeBanner />
    </>
  )
}
