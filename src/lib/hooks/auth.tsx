import { User } from "@junobuild/core";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import AuthService from "../services/auth";
import UserProfileService from "../services/user-profile";
import UserProfileInterface from "../interfaces/user-profile";
import { useNavigate } from "@tanstack/react-router";

type AuthStore = {
  isSignedIn: false
  user: null
  profiles: null
} | {
  isSignedIn: true
  user: User
  profiles: UserProfileInterface.UserProfile[]
}

export const useAuthStore = create(
  combine(
    {
      user: null,
      isSignedIn: false,
      profiles: null
    } as AuthStore,
    (set, get) => {

      const signIn = async () => {
        await AuthService.signIn()
      }

      const refetchProfiles = async (_userId?: string, update = true) => {
        const userId = _userId ?? get().user?.key
        if (!userId) return []

        const profiles = await UserProfileService.getProfilesByUserId(userId)
        const mappedProfiles = profiles.map((profile) => profile.data)

        if (!update) return mappedProfiles

        set({
          profiles: mappedProfiles
        })

        return mappedProfiles
      }

      const init = (cb: (user: { user: User, profiles: UserProfileInterface.UserProfile[] } | null) => void) => {
        return AuthService.subscribe(async (user) => {
          if (!user) {
            set({
              user: null,
              isSignedIn: false
            })

            cb(null)

            return
          }

          const profiles = await refetchProfiles(user.key, false)

          set({
            user,
            profiles,
            isSignedIn: true
          })

          cb({ user, profiles })
        })
      }

      return { init, signIn, refetchProfiles }
    }))

export const AuthGuard: FunctionComponent<{ fallback?: ReactNode, children: ReactNode }> = ({ fallback, children }) => {
  const isSignedIn = useAuthStore(store => store.isSignedIn)

  if (!isSignedIn)
    return fallback ?? null

  return children
}

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const init = useAuthStore(store => store.init)
  const navigate = useNavigate()

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

      navigate({
        to: "/mail"
      })
      return
    })

    return unsubscribe
  }, [init, navigate])

  return children
}
