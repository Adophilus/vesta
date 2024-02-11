import { useAuthStore } from "./auth"

export const useProfile = () => {
  const { isSignedIn, profiles, activeProfileIndex } = useAuthStore(store => ({
    isSignedIn: store.isSignedIn,
    profiles: store.profiles,
    activeProfileIndex: store.activeProfile
  }))

  if (!isSignedIn) throw new Error("User must be signed in!")

  return profiles![activeProfileIndex!]
}
