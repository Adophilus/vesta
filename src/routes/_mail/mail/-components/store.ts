import { create } from "zustand"
import { combine } from "zustand/middleware"
import MailService from "@/lib/services/mail"
import { useAuthStore } from "@/lib/hooks/auth"
import MailInterface from "@/lib/interfaces/mail"

type MailStore = {
  mails: MailInterface.MailReceived.Fetch[]
}

export const userMailStore = create(
  combine(
    {
      mails: [],
    } as MailStore,
    (set) => ({
      load: async () => {
        const profile = useAuthStore.getState().profiles?.[0]
        if (!profile) return

        const mails = await MailService.getMails({
          profile
        })

        set({
          mails
        })
      }
    })
  )
)
