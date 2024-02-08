import { setDoc, listDocs, ListResults, Doc, User } from "@junobuild/core";
import { ulid } from "ulidx";
import MailInterface from "../interfaces/mail";
import UserProfileInterface from "../interfaces/user-profile";

namespace MailService {
  const MAIL_COLLECTION_KEY = "mails"
  const MAIL_RECEIVED_COLLECTION_KEY = "mails-received"

  type GetMailsPayload = {
    profile: UserProfileInterface.UserProfile
  }
  export const getMails = async ({ profile }: GetMailsPayload): Promise<MailInterface.MailReceived.Fetch[]> => {
    const docs: ListResults<MailInterface.MailReceived.Fetch> = await listDocs({
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

    return docs.items
  }

  type CreateMailPayload = Omit<MailInterface.Mail.Create, "sentAt">

  export const sendMail = async (payload: CreateMailPayload): Promise<MailInterface.Mail.Fetch> => {
    const mail = await setDoc<MailInterface.Mail.Create>({
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
      await setDoc<MailInterface.MailReceived.Create>({
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
