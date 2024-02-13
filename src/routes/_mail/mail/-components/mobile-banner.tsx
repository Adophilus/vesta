import { InfoIcon, XIcon } from "lucide-react";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

export const useMobileBanner = create(
  persist(
    combine(
      {
        isAcknowledged: false,
      },
      (set) => ({
        setIsAcknowledged: (isAcknowledged: boolean) => set({ isAcknowledged }),
      })
    ),
    {
      name: "juno-mobile-banner",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export const MobileNoticeBanner = () => {
  const { isAcknowledged, setIsAcknowledged } = useMobileBanner()

  if (isAcknowledged) return null

  return (
    <div className="fixed text-xs top-0 w-full bg-black text-primary p-4 flex justify-between gap-4 md:hidden">
      <InfoIcon className="w-4 h-4" />
      Please switch to a larger screen for a better experience
      <button
        type="button"
        onClick={() => setIsAcknowledged(true)}
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

