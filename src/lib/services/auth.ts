import { signIn as junoSignIn, signOut as junoSignOut, authSubscribe, User, initJuno } from "@junobuild/core";

namespace AuthService {
  export const init = async () => {
    await initJuno({
      satelliteId: import.meta.env.VITE_SATELLITE_ID as string,
      workers: {
        auth: true,
      },
    });
  }

  export const signIn = async () => await junoSignIn()

  export const signOut = async () => await junoSignOut()

  export const subscribe = (callback: (user: User | null) => void) => {
    return authSubscribe(callback)
  }
}

export default AuthService
