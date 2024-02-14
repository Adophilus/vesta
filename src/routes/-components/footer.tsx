import { ArrowUpRightFromSquare, HeartIcon } from "lucide-react";
import { Section } from "./section";
import { cn } from "@/lib/shad/utils";

export function Footer() {
  const footerLinkClasses = "duration-250 hover:text-primary transition-colors"

  return (
    <footer className="selection:bg-white selection:text-primary bg-black text-white text-xs md:text-base">
      <Section>
        <div className="flex flex-col lg:flex-row gap-y-4 justify-between py-8 font-semibold font-Montserrat">
          <div className="flex gap-1 justify-center">
            Powered by <a href="https://juno.build" className={cn("flex items-center gap-1", footerLinkClasses)} target="_blank" rel="noreferrer">Juno <ArrowUpRightFromSquare className="w-4 h-4"/></a>
          </div>
          <div className="flex gap-1 items-center justify-center">
            Made with <HeartIcon className="w-4 h-4 stroke-red-600 fill-red-600" /> by <a href="https://github.com/Adophilus" className={footerLinkClasses} target="_blank" rel="noreferrer">@Adophilus</a> & <a href="https://github.com/AustinChris1" className={footerLinkClasses} target="_blank" rel="noreferrer">@AustinChris</a>
          </div>
        </div>
      </Section>
    </footer>
  )
}
