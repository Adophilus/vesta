import { uploadFile, listAssets } from "@junobuild/core";

namespace AssetService {
  const COLLECTION_KEY = "media"

  export const uploadAsset = async (file: File) => {
    const asset = await uploadFile({
      data: file,
      collection: COLLECTION_KEY,
    })

    return asset
  }

  export const getAsset = async (key: string) => {
    const assets = await listAssets({
      collection: COLLECTION_KEY,
      filter: {
        matcher: {
          key
        }
      },
    })

    const asset = assets.assets[0]
    if (!asset)
      return null

    return asset
  }
}

export default AssetService
