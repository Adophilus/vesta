import { signIn,authSubscribe, User } from "@junobuild/core";

namespace AuthService {
    export const init = async () => {
        await initJuno({
            satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai",
            workers: {
              auth: true,
            },
          });
        }
       
    export const login = async () => {
        const res = await signIn()
    }

    export const subscribe = (callback: (user: User | null) => void) => {
        return authSubscribe(callback)
    }
}

export default AuthService