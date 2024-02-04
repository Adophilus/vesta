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
        description: `<|userId:${payload.userId}|><|organizationId:${payload.organizationId}|>`,
        data: payload
      }
    })

    return profile
  }

  export const getProfilesByUserId = async (id: string) => {
    const profiles = await listDocs<UserProfileInterface.UserProfile>({
      collection: COLLECTION_KEY,
      filter: {
        matcher: {
          description: `<|userId:${id}|>`
        }
      }
    })

    return profiles.items
  }
}

export default UserProfileService
