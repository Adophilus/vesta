import { setDoc, listDocs, ListResults, Doc, User } from "@junobuild/core";
import { ulid } from "ulidx";
import MailInterface from "../interfaces/mail";
import UserProfileInterface from "../interfaces/user-profile";

namespace MailService {
  const MAIL_COLLECTION_KEY = "mails"
  const MAIL_RECEIVED_COLLECTION_KEY = "mails-received"

  type GetMailsPayload = {
    folder: MailInterface.MailFolder,
    profile: UserProfileInterface.UserProfile
  }
  export const getMails = async ({ folder, profile }: GetMailsPayload): Promise<MailInterface.MailReceived[]> => {
    const docs: ListResults<Doc<MailInterface.MailReceived>> = await listDocs({
      collection: MAIL_RECEIVED_COLLECTION_KEY,
      filter: {
        matcher: {
          description: `<|recipientEmail:${profile.email}|>`
        },
        order: {
          desc: true,
          field: "created_at",
        },
      },
    });

    const mails = docs.items.filter(doc => doc.data.folder === folder)

    return mails
      .map(item => item.data)
  }

  type CreateMailPayload = Omit<MailInterface.Mail, "sentAt">

  export const sendMail = async (payload: CreateMailPayload) => {
    const mail = await setDoc<MailInterface.Mail>({
      collection: MAIL_COLLECTION_KEY,
      doc: {
        key: ulid(),
        data: {
          ...payload,
          sentAt: new Date()
        }
      },
    });

    for (const recipient of [payload.recipientEmail, ...payload.cc, ...payload.bcc]) {
      await setDoc<MailInterface.MailReceived>({
        collection: MAIL_RECEIVED_COLLECTION_KEY,
        doc: {
          key: ulid(),
          description: `<|recipientEmail:${recipient}|>`,
          data: {
            folder: "INBOX",
            mailId: mail.key,
            recipientEmail: recipient,
            isRead: false,
            isMuted: false,
            isStarred: false,
            tags: [] // TODO: Add tags
          }
        }
      })
    }

    return mail
  }
}

export default MailService
