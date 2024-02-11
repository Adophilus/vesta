import { Doc } from "@junobuild/core"

namespace UserProfileInterface {
  export namespace UserProfile {
    export type Create = {
      firstName: string
      lastName: string
      userId: string
      email: string
      organizationId?: string
    }

    export type Fetch = Doc<Create>
  }
}

export default UserProfileInterface
