import { setDoc, getManyDocs, listDocs, ListResults, Doc } from "@junobuild/core";
import OrganizationInterface from "../interfaces/organization";
import { ulid } from "ulidx";

namespace OrganizationService {
  const COLLECTION_KEY = "organizations"

  type CreateOrganizationPayload = Omit<OrganizationInterface.Organization, "logo">

  export const createOrganization = async (payload: CreateOrganizationPayload) => {
    return setDoc<OrganizationInterface.Organization>({
      collection: COLLECTION_KEY,
      doc: {
        key: ulid(),
        data: {
          ...payload
        }
      }
    })

  }
}

export default OrganizationService
