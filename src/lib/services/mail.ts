import { setDoc, getManyDocs, listDocs, ListResults, Doc } from "@junobuild/core";
import { ulid } from "ulidx";

namespace MailService {
  const COLLECTION_KEY = "mails"

  export type MailTag = "MEETING" | "WORK" | "IMPORTANT"

  export type Mail = {
    organizationId: string
    folder: "INBOX" | "DRAFT" | "SENT" | "JUNK" | "TRASH" | "ARCHIVE"
    senderId: string
    cc: string[]
    bcc: string[]
    sentAt: Date
    replyToMailId: string
    title: string
    body: string
    isRead: boolean
    isStarred: boolean
    labels: string[]
    isMuted: boolean
    tags: MailTag[]
  }

  export const getMails = async (): Promise<Mail[]> => {
    const docs: ListResults<Doc<Mail>> = await listDocs({
      collection: COLLECTION_KEY,
      filter: {
        order: {
          desc: true,
          field: "created_at",
        },
      },
    });

    return docs
      .items
      .map(item => item.data)
  }

  type CreateMailPayload = Mail

  export const createMail = async (payload: CreateMailPayload) => {
    await setDoc<Mail>({
      collection: COLLECTION_KEY,
      doc: {
        key: ulid(),
        data: payload,
      },
    });
  }
}

export default MailService
