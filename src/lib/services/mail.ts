import { setDoc, listDocs, ListResults, Doc } from "@junobuild/core";
import { ulid } from "ulidx";
import MailInterface from "../interfaces/mail";

namespace MailService {
  const MAIL_COLLECTION_KEY = "mails"
  const MAIL_RECEIVED_COLLECTION_KEY = "mails-received"

  export const getMails = async (): Promise<MailInterface.Mail[]> => {
    const docs: ListResults<Doc<MailInterface.Mail>> = await listDocs({
      collection: MAIL_COLLECTION_KEY,
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
          data: {
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
