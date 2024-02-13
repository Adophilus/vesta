import { setDoc, listDocs, deleteDoc, ListResults, Doc, User, getDoc } from "@junobuild/core";
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

  type GetSentMailsPayload = {
    profile: SerializedJunoDoc<UserProfileInterface.UserProfile.Fetch>
  }

  export const getSentMails = async ({ profile }: GetSentMailsPayload): Promise<MailInterface.MailReceived.Fetch[]> => {
    const docs: ListResults<MailInterface.MailReceived.Fetch> = await listDocs({
      collection: MAILS_SENT_COLLECTION_KEY,
      filter: {
        matcher: {
          description: `<|senderEmail:${profile.data.email}|>`
        },
        order: {
          desc: true,
          field: "created_at",
        },
      },
    });

    return docs.items
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

  export type CreateMailPayload = Omit<MailInterface.MailSent.Create, "sentAt">

  export const sendMail = async (payload: CreateMailPayload): Promise<MailInterface.MailSent.Fetch> => {
    const mail = await setDoc<MailInterface.MailSent.Create>({
      collection: MAILS_SENT_COLLECTION_KEY,
      doc: {
        key: ulid(),
        description: `<|senderEmail:${payload.sender.email}|>`,
        data: {
          ...payload,
          sentAt: new Date()
        }
      },
    });

    for (const recipient of [payload.recipientEmail, payload.sender.email, ...payload.cc, ...payload.bcc]) {
      const folder = recipient === payload.sender.email ? "SENT" : "INBOX"
      await setDoc<MailInterface.MailReceived.Create>({
        collection: MAILS_RECEIVED_COLLECTION_KEY,
        doc: {
          key: ulid(),
          description: `<|recipientEmail:${recipient}|>`,
          data: {
            folder,
            mailId: mail.key,
            sender: payload.sender,
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

  export const moveReceivedMailToFolder = async (mail: MailInterface.MailReceived.Fetch, folder: MailInterface.MailFolder) => {
    await setDoc<MailInterface.MailReceived.Create>({
      collection: MAILS_RECEIVED_COLLECTION_KEY,
      doc: {
        ...mail,
        data: {
          ...mail.data,
          folder,
        }
      }
    })
  }

  export const removeReceivedMailFromFolder = async (mail: MailInterface.MailReceived.Fetch, folder: MailInterface.MailFolder) => {
    await deleteDoc<MailInterface.MailReceived.Create>({
      collection: MAILS_RECEIVED_COLLECTION_KEY,
      doc: mail
    })
  }


  export const muteReceivedMail = async (mail: MailInterface.MailReceived.Fetch) => {
    await setDoc<MailInterface.MailReceived.Create>({
      collection: MAILS_RECEIVED_COLLECTION_KEY,
      doc: {
        ...mail,
        data: {
          ...mail.data,
          isMuted: true
        }
      }
    })
  }

  export const unMuteReceivedMail = async (mail: MailInterface.MailReceived.Fetch) => {
    await setDoc<MailInterface.MailReceived.Create>({
      collection: MAILS_RECEIVED_COLLECTION_KEY,
      doc: {
        ...mail,
        data: {
          ...mail.data,
          isMuted: false
        }
      }
    })
  }


  export const starReceivedMail = async (mail: MailInterface.MailReceived.Fetch) => {
    await setDoc<MailInterface.MailReceived.Create>({
      collection: MAILS_RECEIVED_COLLECTION_KEY,
      doc: {
        ...mail,
        data: {
          ...mail.data,
          isStarred: true
        }
      }
    })
  }

  export const unStarReceivedMail = async (mail: MailInterface.MailReceived.Fetch) => {
    await setDoc<MailInterface.MailReceived.Create>({
      collection: MAILS_RECEIVED_COLLECTION_KEY,
      doc: {
        ...mail,
        data: {
          ...mail.data,
          isStarred: false
        }
      }
    })
  }
}

export default MailService
