import { create } from "zustand"
import { combine } from "zustand/middleware"
import MailService from "@/lib/services/mail"
import { useAuthStore } from "@/lib/hooks/auth"
import MailInterface from "@/lib/interfaces/mail"

type MailStore = {
  mails: MailInterface.MailReceived.Fetch[]
}

export const useMailStore = create(
  combine(
    {
      mails: [],
    } as MailStore,
    (set) => ({
      load: async () => {
        console.log("loading mails...")

        const profile = useAuthStore.getState().profiles?.[0]
        if (!profile) return

        const mails = await MailService.getReceivedMails({
          profile
        })
        console.log("loaded new mails...")

        set({
          mails
        })
      }
    })
  )
)
