import { User as JunoUser } from "@junobuild/core";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import AuthService from "../services/auth";
import UserProfileService from "../services/user-profile";
import UserProfileInterface from "../interfaces/user-profile";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { SerializedJunoDoc, serializeJunoDoc } from "../utils/serialize";

type User = SerializedJunoDoc<JunoUser>

type SignedInState = {
  isSignedIn: false
  user: null
  profiles: null
  activeProfile: null
}

type SignedOutState = {
  isSignedIn: true
  user: User
  profiles: UserProfileInterface.UserProfile.Fetch[]
  activeProfile: number
}

export type AuthStore = SignedInState | SignedOutState

export const useAuthStore = create(
  persist(
    combine(
      {
        isSignedIn: false,
        user: null,
        profiles: null,
        activeProfile: null,
      } as AuthStore,
      (set, get) => {

        const signIn = async () => {
          await AuthService.signIn()
        }

        const setActiveProfile = async (index: number) => {
          const { profiles, isSignedIn } = get()

          if (!isSignedIn) return

          if (index >= profiles.length) return

          set({
            activeProfile: index
          })
        }

        const fetchProfiles = async (_userId: string) => {
          const userId = _userId ?? get().user?.key
          if (!userId) return []

          return UserProfileService.getProfilesByUserId(userId)
        }

        const refetchProfiles = async () => {
          const { user } = get()

          if (!user) return

          const profiles = await fetchProfiles(user.key)

          set({
            profiles
          })
        }

        const init = (cb: (user: { user: User, profiles: UserProfileInterface.UserProfile.Fetch[] } | null) => void) => {
          return AuthService.subscribe(async (user) => {
            if (!user) {
              set({
                user: null,
                isSignedIn: false
              })

              cb(null)

              return
            }

            const processedUser = {
              ...user,
              created_at: new Date(Number(user?.created_at)),
              updated_at: new Date(Number(user?.updated_at))
            }

            const profiles = await fetchProfiles(processedUser.key)
              .then(profiles => profiles.map(profile => serializeJunoDoc(profile)))

            set({
              user: processedUser,
              profiles,
              activeProfile: 0,
              isSignedIn: true
            })

            cb({ user: processedUser, profiles })
          })
        }

        return {
          init,
          signIn,
          fetchProfiles,
          refetchProfiles,
          setActiveProfile
        }
      }),
    {
      name: "juno-auth"
    }
  )
)

export const AuthGuard: FunctionComponent<{ fallback?: ReactNode, children: ReactNode }> = ({ fallback, children }) => {
  const isSignedIn = useAuthStore(store => store.isSignedIn)

  if (!isSignedIn)
    return fallback ?? null

  return children
}

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const init = useAuthStore(store => store.init)
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname });


  useEffect(() => {
    const unsubscribe = init((user) => {

      if (!user) {
        navigate({
          to: "/auth/sign-in"
        })
        return
      }

      if (user.profiles.length === 0) {
        navigate({
          to: "/profile/create"
        })
        return
      }

      if (pathname === "/auth/sign-in") {
        navigate({
          to: "/mail/inbox"
        })
        return
      }
    })

    return unsubscribe
  }, [init, navigate, pathname])

  return children
}
