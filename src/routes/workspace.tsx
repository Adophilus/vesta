import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon, BriefcaseIcon } from "lucide-react";

export const Route = createFileRoute('/workspace')({
  component: WorkspacePage
})

function WorkspacePage() {
  const navigate = useNavigate()

  return (
    <div className="grow flex flex-col gap-8 bg-primary text-white justify-center items-center">
    <div className="flex flex-col gap-4 items-center justify-center">
      <BriefcaseIcon className="w-36 h-36" />
      <header className="text-5xl md:text-6xl lg:text-7xl text-center font-bold">
        Coming Soon
      </header>
      </div>
      <button type="button"
      className="text-lg font-medium flex items-center gap-2"
        onClick={() => {
          navigate({
            to: "/mail/$mailFolder",
            params: {
              mailFolder: "inbox"
            }
          })
        }}
      >
        <ArrowLeftIcon className="w-6 h-6" />
        Back
      </button>
    </div>
  )
}
