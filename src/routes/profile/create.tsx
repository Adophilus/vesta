import { createFileRoute } from '@tanstack/react-router'
import { CreateProfileForm } from './-components/create-profile-form'

export const Route = createFileRoute('/profile/create')({
  component: CreateProfilePage
})

export default function CreateProfilePage() {
  return (
    <>
      <div className="container relative h-full flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>
        <div className="lg:p-8">
          <CreateProfileForm />
        </div>
      </div>
    </>
  )
}
