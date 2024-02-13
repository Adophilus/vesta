import { ListResults, getDoc, listDocs, setDoc } from "@junobuild/core"
import UserProfileInterface from "../interfaces/user-profile"
import { ulid } from "ulidx"
import { Result } from "true-myth"

namespace UserProfileService {
  const COLLECTION_KEY = "users"

  type CreateUserProfilePayload = UserProfileInterface.UserProfile.Create

  export const createProfile = async (payload: CreateUserProfilePayload): Promise<Result<UserProfileInterface.UserProfile.Fetch, string>> => {
    const existingProfile = await getProfileByEmail(payload.email)

    if (existingProfile)
      return Result.err("Email address has been taken!")
    

    const profile = await setDoc<UserProfileInterface.UserProfile.Create>({
      collection: COLLECTION_KEY,
      doc: {
        key: ulid(),
        description: `<|email:${payload.email}|><|userId:${payload.userId}|><|organizationId:${payload.organizationId}|>`,
        data: payload
      }
    })

    return Result.ok(profile)
  }

  export const getProfilesByUserId = async (userId: string): Promise<UserProfileInterface.UserProfile.Fetch[]> => {
    const profiles: ListResults<UserProfileInterface.UserProfile.Fetch> = await listDocs({
      collection: COLLECTION_KEY,
      filter: {
        matcher: {
          description: `<|userId:${userId}|>`
        }
      }
    })

    return profiles.items
      .filter(profile => profile.data.userId === userId)
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

    const profile = profiles.items
      .filter(profile => profile.data.email === email)

    return profile[0]
  }
}

export default UserProfileService
