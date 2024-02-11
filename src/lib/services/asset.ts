import { uploadFile, setDoc, getDoc } from "@junobuild/core";
import { ulid } from "ulidx";
import AssetInterface from "../interfaces/asset";

namespace AssetService {
  const RAW_ASSET_COLLECTION_KEY = "raw-assets"
  const COLLECTION_KEY = "raw-assets"

  export const rawUpload = async (file: File) => {
    const asset = await uploadFile({
      data: file,
      collection: RAW_ASSET_COLLECTION_KEY,
    })

    return asset
  }

  export const upload = async (file: File) => {
    const rawAsset = await AssetService.rawUpload(file)

    const assetDoc = await setDoc<AssetInterface.Asset.Create>({
      collection: COLLECTION_KEY,
      doc: {
        key: ulid(),
        data: {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadUrl: rawAsset.downloadUrl
        }
      }
    })

    return assetDoc
  }

  export const getAsset = async (id: string) => {
    const asset: AssetInterface.Asset.Fetch | undefined = await getDoc({
      collection: COLLECTION_KEY,
      key: id
    })

    return asset
  }
}

export default AssetService
