import { HeartIcon } from "lucide-react";
import { Section } from "./section";

export function Footer() {
  const footerLinkClasses = "duration-250 hover:text-primary transition-colors"

  return (
    <footer className="selection:bg-white selection:text-primary bg-black text-white text-xs md:text-base">
      <Section>
        <div className="flex flex-col lg:flex-row gap-y-4 justify-between py-8 font-semibold font-Montserrat">
          <div className="flex justify-center">
            Powered by Juno
          </div>
          <div className="flex gap-1 items-center justify-center">
            Made with <HeartIcon className="w-4 h-4 stroke-red-600 fill-red-600" /> by <a href="https://github.com/Adophilus" className={footerLinkClasses} target="_blank" rel="noreferrer">@Adophilus</a> & <a href="https://github.com/AustinChris1" className={footerLinkClasses} target="_blank" rel="noreferrer">@AustinChris</a>
          </div>
        </div>
      </Section>
    </footer>
  )
}