namespace MailInterface {
  export type MailTag = "MEETING" | "WORK" | "IMPORTANT"
  type MailFolder = "INBOX" | "DRAFT" | "SENT" | "JUNK" | "TRASH" | "ARCHIVE"

  export type Mail = {
    organizationId: string
    senderEmail: string
    recipientEmail: string
    cc: string[]
    bcc: string[]
    title: string
    body: string
    sentAt: Date
  }
}

export default MailInterface
