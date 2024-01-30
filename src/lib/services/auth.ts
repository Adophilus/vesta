import { signIn, authSubscribe, User, initJuno } from "@junobuild/core";

namespace AuthService {
  export const init = async () => {
    await initJuno({
      satelliteId: "pdurl-fqaaa-aaaal-adlga-cai",
      workers: {
        auth: true,
      },
    });
  }

  export const login = async () => await signIn()

  export const subscribe = (callback: (user: User | null) => void) => {
    return authSubscribe(callback)
  }
}

export default AuthService
