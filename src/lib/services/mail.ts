import { setDoc, getManyDocs, listDocs, ListResults, Doc } from "@junobuild/core";

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
    replyTo: string
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

  export const createMail = async () => {
    await setDoc<Mail>({
      collection: "my_collection_key",
      doc: {
        key: "my_document_key",
        data: myExample,
      },
    });


  }
}

export default MailService
