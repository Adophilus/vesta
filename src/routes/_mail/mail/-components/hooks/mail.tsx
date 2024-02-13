import { useAuthStore } from "@/lib/hooks/auth"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import MailService from "@/lib/services/mail"
import { useRouterState } from "@tanstack/react-router"
import { useState } from "react"
import MailInterface from "@/lib/interfaces/mail"
import { combine } from "zustand/middleware"
import UserProfileService from "@/lib/services/user-profile"

export function useGetMailsReceived() {
  const { profiles } = useAuthStore(store => ({
    isSignedIn: store.isSignedIn,
    profiles: store.profiles
  }))

  const profile = profiles && profiles.length > 0 ? profiles[0] : null

  return useQuery({
    queryKey: ['getMailsReceived'],
    refetchInterval: 5000,
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

export function useGetMailSenderProfile(mail: MailInterface.MailSent.Fetch) {
  return useQuery({
    queryKey: ['getMailSender', mail.data.sender.email],
    queryFn: async () => {
      const profile = await UserProfileService.getProfileByEmail(mail.data.sender.email)

      if (!profile)
        throw new Error("Profile not found!")

      return profile
    }
  })
}

export function useMailFolder(): MailInterface.MailFolder {
  const pathname = useRouterState({ select: s => s.location.pathname })
  const regex = /\/mail\/(\w+)/
  if (regex.test(pathname)) {
    const match = regex.exec(pathname)
    if (match) {
      const mailFolder = match[1]
      return mailFolder.toUpperCase() as unknown as MailInterface.MailFolder
    }
  }

  return "INBOX"
}

export const useInvalidate = () => {
  const queryClient = useQueryClient()

  return {
    getMailSent: (id: string) => {
      queryClient.invalidateQueries({
        queryKey: ['getMailSent', id],
      })
    },
    getMailsSent: () => {
      queryClient.invalidateQueries({
        queryKey: ['getMailSent'],
      })
    },
    getMailsReceived: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMailsReceived"]
      })
    },
    getMailReceived: (id: string) => {
      queryClient.invalidateQueries({
        queryKey: ["getMailReceived", id]
      })
    }
  }
}
