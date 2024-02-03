import { User } from "@junobuild/core";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import AuthService from "../services/auth";
import UserProfileService from "../services/user-profile";
import UserProfileInterface from "../interfaces/user-profile";
import { redirect } from "@tanstack/react-router";

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
    { user: null } as AuthStore,
    (set) => ({
      signIn: async () => {
        await AuthService.signIn()
      },
      init: (cb: (user: { user: User, profiles: UserProfileInterface.UserProfile[] } | null) => void) => {
        return AuthService.subscribe(async (user) => {
          if (!user) {
            set({
              user: null,
              isSignedIn: false
            })

            cb(null)

            return
          }

          const profiles = await UserProfileService.getProfilesById(user.key)
          const mappedProfiles = profiles.map((profile) => profile.data)

          set({
            user,
            profiles: mappedProfiles,
            isSignedIn: true
          })

          cb({ user, profiles: mappedProfiles })
        })
      }
    })
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

  useEffect(() => {
    const unsubscribe = init((user) => {
      console.log("user", user)
      if (!user) {
        throw redirect({
          to: "/auth/sign-in"
        })
      }

      console.log(user.profiles)
      if (user.profiles.length === 0) {
        console.log("redirecting to /profile/create")
        throw redirect({
          to: "/profile/create"
        })
      }

      throw redirect({
        to: "/mail"
      })
    })

    return unsubscribe
  }, [init])

  return children
}
