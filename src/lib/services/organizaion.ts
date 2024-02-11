import { setDoc, getManyDocs, listDocs, ListResults, Doc } from "@junobuild/core";
import OrganizationInterface from "../interfaces/organization";
import { ulid } from "ulidx";
import AssetService from "./asset";

namespace OrganizationService {
  const COLLECTION_KEY = "organizations"

  type CreateOrganizationPayload = Omit<OrganizationInterface.Organization, "logo"> & {
    logo: File
  }

  export const createOrganization = async ({ logo, ...payload }: CreateOrganizationPayload) => {
    const uploadedLogo = await AssetService.rawUpload(logo)

    return setDoc<OrganizationInterface.Organization>({
      collection: COLLECTION_KEY,
      doc: {
        key: ulid(),
        data: {
          ...payload,
          logo: uploadedLogo.downloadUrl
        }
      }
    })

  }
}

export default OrganizationService
