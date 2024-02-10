import { setDoc, listDocs, ListResults, Doc, User, getDoc } from "@junobuild/core";
import { ulid } from "ulidx";
import MailInterface from "../interfaces/mail";
import UserProfileInterface from "../interfaces/user-profile";
import { SerializedJunoDoc } from "../utils/serialize";

namespace MailService {
  const MAILS_SENT_COLLECTION_KEY = "mails-sent"
  const MAILS_RECEIVED_COLLECTION_KEY = "mails-received"

  export const getSentMail = async (id: string): Promise<MailInterface.MailSent.Fetch | undefined> => {
    const mail: MailInterface.MailSent.Fetch | undefined = await getDoc({
      collection: MAILS_SENT_COLLECTION_KEY,
      key: id
    });

    return mail
  }

  type GetReceivedMailsPayload = {
    profile: SerializedJunoDoc<UserProfileInterface.UserProfile.Fetch>
  }

  export const getReceivedMails = async ({ profile }: GetReceivedMailsPayload): Promise<MailInterface.MailReceived.Fetch[]> => {
    const docs: ListResults<MailInterface.MailReceived.Fetch> = await listDocs({
      collection: MAILS_RECEIVED_COLLECTION_KEY,
      filter: {
        matcher: {
          description: `<|recipientEmail:${profile.data.email}|>`
        },
        order: {
          desc: true,
          field: "created_at",
        },
      },
    });

    return docs.items
  }

  export const getReceivedMail = async (id: string): Promise<MailInterface.MailReceived.Fetch | undefined> => {
    const doc: MailInterface.MailReceived.Fetch | undefined = await getDoc({
      collection: MAILS_RECEIVED_COLLECTION_KEY,
      key: id
    });

    return doc
  }

  type CreateMailPayload = Omit<MailInterface.MailSent.Create, "sentAt">

  export const sendMail = async (payload: CreateMailPayload): Promise<MailInterface.MailSent.Fetch> => {
    const mail = await setDoc<MailInterface.MailSent.Create>({
      collection: MAILS_SENT_COLLECTION_KEY,
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
        collection: MAILS_RECEIVED_COLLECTION_KEY,
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
            labels: [], // TODO: Add labels
            tags: [] // TODO: Add tags
          }
        }
      })
    }

    return mail
  }

  export const markReceivedMailAsRead = async (mail: MailInterface.MailReceived.Fetch) => {
    await setDoc<MailInterface.MailReceived.Create>({
      collection: MAILS_RECEIVED_COLLECTION_KEY,
      doc: {
        ...mail,
        data: {
          ...mail.data,
          isRead: true
        }
      }
    })
  }
}

export default MailService
