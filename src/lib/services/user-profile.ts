import { listDocs, setDoc } from "@junobuild/core"
import UserProfileInterface from "../interfaces/user-profile"
import { ulid } from "ulidx"

namespace UserProfileService {
  const COLLECTION_KEY = "users"

  type CreateUserProfilePayload = UserProfileInterface.UserProfile

  export const createProfile = async (payload: CreateUserProfilePayload) => {
    const profile = await setDoc<UserProfileInterface.UserProfile>({
      collection: COLLECTION_KEY,
      doc: {
        key: ulid(),
        description: `<|id:${payload.id}|><|organizationId:${payload.organizationId}|>`,
        data: payload
      }
    })

    return profile
  }

  export const getProfilesById = async (id: string) => {
    const profiles = await listDocs<UserProfileInterface.UserProfile>({
      collection: COLLECTION_KEY,
      filter: {
        matcher: {
          description: `<|id:${id}|>`
        }
      }
    })

    return profiles.items
  }
}

export default UserProfileService
