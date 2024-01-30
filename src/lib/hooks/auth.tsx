import { User } from "@junobuild/core";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import AuthService from "../services/auth";

type AuthStore = {
  isSignedIn: false
  user: null
} | {
  isSignedIn: true
  user: User
}

export const useAuthStore = create(
  combine(
    { user: null } as AuthStore,
    (set) => ({
      signIn: async () => {
        await AuthService.signIn()
      },
      init: () => {
        return AuthService.subscribe(user => {
          if (!user) {
            set({
              user: null,
              isSignedIn: false
            })
            return
          }

          set({
            user,
            isSignedIn: true
          })
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
    const unsubscribe = init()

    return unsubscribe
  }, [init])

  return children
}
