import { ListResults, getDoc, listDocs, setDoc } from "@junobuild/core"
import UserProfileInterface from "../interfaces/user-profile"
import { ulid } from "ulidx"

namespace UserProfileService {
  const COLLECTION_KEY = "users"

  type CreateUserProfilePayload = UserProfileInterface.UserProfile.Create

  export const createProfile = async (payload: CreateUserProfilePayload) => {
    const profile = await setDoc<UserProfileInterface.UserProfile.Create>({
      collection: COLLECTION_KEY,
      doc: {
        key: ulid(),
        description: `<|email:${payload.email}|><|userId:${payload.userId}|><|organizationId:${payload.organizationId}|>`,
        data: payload
      }
    })

    return profile
  }

  export const getProfilesByUserId = async (id: string): Promise<UserProfileInterface.UserProfile.Fetch[]> => {
    const profiles: ListResults<UserProfileInterface.UserProfile.Fetch> = await listDocs({
      collection: COLLECTION_KEY,
      filter: {
        matcher: {
          description: `<|userId:${id}|>`
        }
      }
    })

    return profiles.items
  }

  export const getProfileByEmail = async (email: string): Promise<UserProfileInterface.UserProfile.Fetch | undefined> => {
    const profiles: ListResults<UserProfileInterface.UserProfile.Fetch> = await listDocs({
      collection: COLLECTION_KEY,
      filter: {
        matcher: {
          description: `<|email:${email}|>`
        }
      }
    })
    console.log(profiles)

    return profiles.items[0]
  }
}

export default UserProfileService
