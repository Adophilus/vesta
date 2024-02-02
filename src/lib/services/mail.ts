import { setDoc, getManyDocs, listDocs, ListResults, Doc } from "@junobuild/core";
import { ulid } from "ulidx";
import MailInterface from "../interfaces/mail";

namespace MailService {
  const COLLECTION_KEY = "mails"

  export const getMails = async (): Promise<MailInterface.Mail[]> => {
    const docs: ListResults<Doc<MailInterface.Mail>> = await listDocs({
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

  type CreateMailPayload = Omit<MailInterface.Mail, "sentAt">

  export const sendMail = async (payload: CreateMailPayload) => {
    return setDoc<MailInterface.Mail>({
      collection: COLLECTION_KEY,
      doc: {
        key: ulid(),
        data: {
          ...payload,
          sentAt: new Date()
        }
      },
    });
  }
}

export default MailService
