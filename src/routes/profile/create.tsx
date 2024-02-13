import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { CreateProfileForm } from './-components/create-profile-form'
import { AuthProvider, useAuthStore } from '@/lib/hooks/auth'
import { Button } from '../-components/button'
import { ArrowLeftIcon, MailIcon, ZapIcon } from 'lucide-react'
import { motion } from "framer-motion"

export const Route = createFileRoute('/profile/create')({
  component: CreateProfilePage,
  beforeLoad: async () => {
    const { isSignedIn, profiles } = useAuthStore.getState()
    if (!isSignedIn) {
      throw redirect({
        to: '/auth/sign-in'
      })
    }

    if (profiles && profiles.length > 0)
      throw redirect({
        to: '/mail/$mailFolder',
        params: {
          mailFolder: "inbox"
        }
      })
  }
})

export default function CreateProfilePage() {
  return (
    <AuthProvider>
      <div className="font-Poppins container relative grow md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex items-center justify-center border-r-[3px] border-r-black">
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 banner-bg" />
          <div className="z-10 flex flex-col items-center justify-center gap-y-10 banner-backed">
            <motion.div
              animate={{
                y: [0, -50],
              }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
              className="relative drop-shadow-lg rounded-full border-[6px] border-black bg-white p-6"
            >
              <div className="absolute p-1 border-[6px] border-black rounded-full top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-white">
                <ZapIcon className="w-8 h-8 stroke-[2px] stroke-black fill-yellow-300" />
              </div>

              <MailIcon className="h-24 w-24 stroke-black" />
            </motion.div>
            <header
              className="banner-txt text-7xl font-bold text-white text-center font-Poppins drop-shadow-md"
              style={{
                WebkitTextStroke: "3px black"
              }}
            >
              Connect like never before
            </header>
          </div>
        </div>
        <div className="h-full w-full flex flex-col justify-between lg:p-8">
          <div className="flex justify-start p-4">
            <Link
              to="/"
            >
              <Button>
                <ArrowLeftIcon className="stroke-[3px] w-4 h-4" />
              </Button>
            </Link>
          </div>
          <CreateProfileForm />
          <div />
        </div>
      </div>
    </AuthProvider>
  )
}
