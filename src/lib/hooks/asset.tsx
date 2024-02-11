import { useQuery } from "@tanstack/react-query"
import AssetService from "../services/asset"

export const useGetAsset = (id: string) => {
  return useQuery({
    queryKey: ['getAsset', id],
    queryFn: async () => {
      const asset = await AssetService.getAsset(id)
      if (!asset)
        throw new Error("Asset not found!")

      return asset
    }
  })
}
