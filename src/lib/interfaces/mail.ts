import { Doc } from "@junobuild/core"

namespace MailInterface {
  export const mailTags = ["MEETING", "WORK", "IMPORTANT"] as const
  export type MailTag = typeof mailTags[number]

  export const mailFolders = ["INBOX", "DRAFT", "SENT", "JUNK", "TRASH", "ARCHIVE"] as const
  export type MailFolder = typeof mailFolders[number]

  export namespace Mail {
    export type Create = {
      organizationId: string
      senderEmail: string
      recipientEmail: string
      cc: string[]
      bcc: string[]
      title: string
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
      replyToMailId?: {
        id: string
        title: string
      }
      isRead: boolean
      isMuted: boolean
      isStarred: boolean
      tags: MailTag[]
    }

    export type Fetch = Doc<Create>
  }
}

export default MailInterface
