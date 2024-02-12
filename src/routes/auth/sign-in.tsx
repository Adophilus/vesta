import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from './-components/sign-in-form'

export const Route = createFileRoute('/auth/sign-in')({
  component: SignInPage
})

export default function SignInPage() {
  return (
    <>
      <div className="container relative h-full flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-primary" />
        </div>
        <div className="lg:p-8">
          <SignInForm />
        </div>
      </div>
    </>
  )
}
