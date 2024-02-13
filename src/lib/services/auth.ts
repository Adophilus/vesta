import { signIn as junoSignIn, signOut as junoSignOut, authSubscribe, User, initJuno } from "@junobuild/core";

namespace AuthService {
  export const init = async () => {
    const satelliteId = import.meta.env.VITE_SATELLITE_ID as string

    await initJuno({
      satelliteId,
      workers: {
        auth: true,
      },
    })
      // .catch(err => {
      //   console.log(err)
      //   alert("Please check your internet connection and try again")
      // });
  }

  export const signIn = async () => await junoSignIn()

  export const signOut = async () => await junoSignOut()

  export const subscribe = (callback: (user: User | null) => void) => {
    return authSubscribe(callback)
  }
}

export default AuthService
