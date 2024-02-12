import { ArrowRightIcon, LaptopIcon } from "lucide-react";
import { Button } from "@/components/shad/ui/button"

export function Navbar() {
  return (
    <nav className="fixed w-full h-20">
      <div className="relative w-full h-full">
        <div className="grid grid-cols-2">
          <div className="bg-white" />
          <div className="bg-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
            <div className="p-4 bg-white">
              JMail
            </div>
            <Button
              className="flex gap-2 font-semibold text-xl py-6 px-4">
              Get Started
              <ArrowRightIcon className="w-6 h-6 stroke-[3px]" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
