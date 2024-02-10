import { Doc } from "@junobuild/core"
import { SerializedJunoDoc } from "@/lib/utils/serialize"

namespace UserProfileInterface {
  export namespace UserProfile {
    export type Create = {
      firstName: string
      lastName: string
      userId: string
      email: string
      organizationId?: string
    }

    export type Fetch = SerializedJunoDoc<Doc<Create>>
  }
}

export default UserProfileInterface
