import { create } from "zustand"
import { combine } from "zustand/middleware"
import MailService from "@/lib/services/mail"

export const userMailStore = create(
  combine(
    {
      inbox: [] as MailService.Mail[],
      draft: [] as MailService.Mail[],
      sent: [] as MailService.Mail[],
      junk: [] as MailService.Mail[],
      trash: [] as MailService.Mail[],
      archive: [] as MailService.Mail[]
    },
    (set) => ({
      refetch: async () => {
        const mails = await MailService.getMails()

        set({
          inbox: mails.filter((mail) => mail.folder === "INBOX"),
          draft: mails.filter((mail) => mail.folder === "DRAFT"),
          sent: mails.filter((mail) => mail.folder === "SENT"),
          junk: mails.filter((mail) => mail.folder === "JUNK"),
          trash: mails.filter((mail) => mail.folder === "TRASH"),
          archive: mails.filter((mail) => mail.folder === "ARCHIVE")
        })
      }
    })
  )
)
