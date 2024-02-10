import { create } from "zustand"
import { combine } from "zustand/middleware"
import MailService from "@/lib/services/mail"
import { useAuthStore } from "@/lib/hooks/auth"
import MailInterface from "@/lib/interfaces/mail"

type MailStore = {
  folder: MailInterface.MailFolder
}

export const useMailStore = create(
  combine(
    {
      folder: "INBOX"
    } as MailStore,
    (set) => ({
      setFolder: (folder: MailInterface.MailFolder) => {
        set({
          folder
        })
      }
    })
  )
)
