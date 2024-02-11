import { Doc } from "@junobuild/core"
import UserProfileInterface from "./user-profile"

namespace MailInterface {
  export const mailTags = ["MEETING", "WORK", "IMPORTANT"] as const
  export type MailTag = typeof mailTags[number]

  export const mailLabels = []
  export type MailLabel = typeof mailLabels[number]

  export const mailFolders = ["INBOX", "DRAFT", "SENT", "SPAM", "TRASH", "ARCHIVE", "IMPORTANT"] as const
  export type MailFolder = typeof mailFolders[number]

  export type Attachment = {
    type: "file"
    url: string
  } | {
    type: "asset"
    assetId: string
  }

  export namespace MailSent {
    export type Create = {
      organizationId: string
      sender: UserProfileInterface.UserProfile.Create
      recipientEmail: string
      cc: string[]
      bcc: string[]
      subject: string
      attachments: Attachment[]
      body: string
      sentAt: Date
    }

    export type Fetch = Doc<Create>
  }

  export namespace MailReceived {
    export type Create = {
      folder: MailFolder
      mailId: string
      recipientEmail: string
      sender: UserProfileInterface.UserProfile.Create
      replyToMailId?: {
        id: string
        subject: string
      }
      isRead: boolean
      isMuted: boolean
      isStarred: boolean
      tags: MailTag[]
      labels: MailLabel[]
    }

    export type Fetch = Doc<Create>
  }
}

export default MailInterface
