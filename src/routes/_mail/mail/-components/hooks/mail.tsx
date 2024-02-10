import { useAuthStore } from "@/lib/hooks/auth"
import { useQuery } from "@tanstack/react-query"
import MailService from "@/lib/services/mail"
import { useRouterState } from "@tanstack/react-router"
import { useState } from "react"
import MailInterface from "@/lib/interfaces/mail"
import { combine } from "zustand/middleware"

export function useGetMailsReceived() {
  const { profiles } = useAuthStore(store => ({
    isSignedIn: store.isSignedIn,
    profiles: store.profiles
  }))

  const profile = profiles && profiles.length > 0 ? profiles[0] : null

  return useQuery({
    queryKey: ['getMailsReceived'],
    queryFn: async () => {
      if (!profile)
        throw new Error('Invalid profile!')

      const mails = await MailService.getReceivedMails({
        profile
      })

      return mails
    }
  })
}

export function useGetMailReceived(id: string) {
  const { profiles } = useAuthStore(store => ({
    profiles: store.profiles
  }))

  const profile = profiles && profiles.length > 0 ? profiles[0] : null

  return useQuery({
    queryKey: ['getMailReceived', id],
    queryFn: async () => {
      if (!profile)
        throw new Error('Invalid profile!')

      const mail = await MailService.getReceivedMail(id)

      if (!mail)
        throw new Error("Mail not found!")

      return mail
    }
  })
}

export function useGetMailSent(id: string) {
  const { profiles } = useAuthStore(store => ({
    profiles: store.profiles
  }))

  const profile = profiles && profiles.length > 0 ? profiles[0] : null

  return useQuery({
    queryKey: ['getMailSent', id],
    queryFn: async () => {
      if (!profile)
        throw new Error('Invalid profile!')

      const mail = await MailService.getSentMail(id)

      if (!mail)
        throw new Error("Mail not found!")

      return mail
    }
  })
}

export function useMailFolder(): MailInterface.MailFolder {
  const pathname = useRouterState({ select: s => s.location.pathname })
  const regex = /\/mail\/(.*)?(?:\/|)/
  if (regex.test(pathname)) {
    const match = regex.exec(pathname)
    if (match) {
      const mailFolder = match[1]
      return mailFolder.toUpperCase() as unknown as MailInterface.MailFolder
    }
  }

  return "INBOX"
}
