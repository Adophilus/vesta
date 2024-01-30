import { signIn as junoSignIn, authSubscribe, User, initJuno } from "@junobuild/core";

namespace AuthService {
  export const init = async () => {
    await initJuno({
      satelliteId: "pdurl-fqaaa-aaaal-adlga-cai",
      workers: {
        auth: true,
      },
    });
  }

  export const signIn = async () => await junoSignIn()

  export const subscribe = (callback: (user: User | null) => void) => {
    return authSubscribe(callback)
  }
}

export default AuthService
