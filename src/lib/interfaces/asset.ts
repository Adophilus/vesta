import { Doc } from "@junobuild/core"

namespace AssetInterface {
  export namespace Asset {
    export type Create = {
      name: string
      size: number
      type: string
      downloadUrl: string
    }

    export type Fetch = Doc<Create>
  }
}

export default AssetInterface
