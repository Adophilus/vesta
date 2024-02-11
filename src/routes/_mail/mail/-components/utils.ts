import { QueryClient } from "@tanstack/react-query"
import { Router } from "@tanstack/react-router"
import MailInterface from "@/lib/interfaces/mail"
import MailService from "@/lib/services/mail"
import groupBy from "lodash/groupBy";
import { toast } from "sonner"
import UserProfileInterface from "@/lib/interfaces/user-profile";
import AssetService from "@/lib/services/asset";

type InvalidateProps = {
  queryClient: QueryClient
  router: Router
  mailReceived: MailInterface.MailReceived.Fetch
  mailSent: MailInterface.MailSent.Fetch
}

export const invalidate = ({
  queryClient,
  router,
  mailReceived,
  mailSent
}: InvalidateProps) => {
  queryClient.invalidateQueries({
    queryKey: ["getMailsReceived"]
  })

  queryClient.invalidateQueries({
    queryKey: ["getMailReceived", mailReceived.key]
  })

  queryClient.invalidateQueries({
    queryKey: ['getMailSent', mailSent.key],
  })

  router.invalidate()
}

type ValidMoveFolder = Omit<MailInterface.MailFolder, "DRAFT" | "SENT">
export const moveMailTo = async (mail: MailInterface.MailReceived.Fetch, folder: ValidMoveFolder) => {
  const msg = {
    loading: "",
    done: ""
  }

  switch (folder) {
    case "INBOX":
      msg.loading = "Moving mail to inbox"
      msg.done = "Done"
      break
    case "SPAM":
      msg.loading = "Moving mail to spam"
      msg.done = "Done"
      break
    case "ARCHIVE":
      msg.loading = "Moving mail to archive"
      msg.done = "Done"
      break
    case "TRASH":
      msg.loading = "Moving mail to trash"
      msg.done = "Done"
      break
  }

  return new Promise<string>((resolve, reject) => {
    toast.promise(
      MailService.moveReceivedMailToFolder(mail, folder as MailInterface.MailFolder),
      {
        loading: msg.loading,
        success: () => {
          resolve(msg.done)
          return msg.done
        },
        error: (err) => {
          console.log(err)
          reject()
          return "Sorry something went wrong"
        }
      })
  })
}

export const sendMail = async (payload: MailService.CreateMailPayload) => {
  return new Promise((resolve, reject) => {
    toast.promise(
      MailService.sendMail(payload),
      {
        loading: "Sending mail",
        success: () => {
          const msg = "Mail sent successfully!"
          resolve(msg)
          return msg
        },
        error: (err) => {
          console.log(err)
          reject()
          return "Sorry something went wrong"
        }
      })
  })
}

export const muteMail = async (mail: MailInterface.MailReceived.Fetch) => {
  await MailService.muteReceivedMail(mail)
}

export const unMuteMail = async (mail: MailInterface.MailReceived.Fetch) => {
  await MailService.unMuteReceivedMail(mail)
}


export const starMail = async (mail: MailInterface.MailReceived.Fetch) => {
  await MailService.starReceivedMail(mail)
}

export const unStarMail = async (mail: MailInterface.MailReceived.Fetch) => {
  await MailService.unStarReceivedMail(mail)
}

export const markMailAsUnread = async (mail: MailInterface.MailReceived.Fetch) => {
  await MailService.markReceivedMailAsRead(mail)
}

export const deleteMail = async (mail: MailInterface.MailReceived.Fetch) => {
  return new Promise((resolve, reject) => {
    toast.promise(
      MailService.removeReceivedMailFromFolder(mail, mail.data.folder),
      {
        loading: "Deleting mail",
        success: () => {
          const msg = "Mail deleted"
          resolve(msg)
          return msg
        },
        error: (err) => {
          console.log(err)
          reject()
          return "Sorry something went wrong"
        }
      })
  })
}

export const filterMailsReceived = (mails: MailInterface.MailReceived.Fetch[], folder: MailInterface.MailFolder) => {
  switch (folder) {
    case "IMPORTANT":
      return mails.filter(mail => mail.data.isStarred)
    default:
      return mails.filter(mail => mail.data.folder === folder)
  }

}
export const groupMailsReceived = (mails: MailInterface.MailReceived.Fetch[]) => {
  const groups: Record<MailInterface.MailFolder, MailInterface.MailReceived.Fetch[]> = {
    INBOX: [],
    DRAFT: [],
    SENT: [],
    SPAM: [],
    ARCHIVE: [],
    IMPORTANT: [],
    TRASH: [],
  }

  for (const mail of mails) {
    groups[mail.data.folder].push(mail)

    if (mail.data.isStarred)
      groups.IMPORTANT.push(mail)
  }

  return groups
}

export const formatMailProfile = (sender: UserProfileInterface.UserProfile.Create) => {
  return `${sender.firstName} ${sender.lastName} <${sender.email}>`
}

export const uploadAssets = async (files: File[]) => {
  return new Promise<MailInterface.MailAttachment[]>((resolve, reject) => {
    toast.promise(
      Promise.all(files.map(file => AssetService.upload(file))),
      {
        loading: "Uploading files",
        success: (assets) => {
          resolve(assets.map(asset => ({
            type: "asset",
            assetId: asset.key
          })))

          return "Uploaded"
        },
        error: () => {
          reject()
          return "Upload failed"
        }
      })
  })
}
