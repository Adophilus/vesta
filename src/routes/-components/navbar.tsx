import { Link } from "@tanstack/react-router";
import { Button } from "./button"
import { ArrowRightIcon, DotIcon, MenuIcon, RocketIcon } from "lucide-react";
import "./navbar.css"
import { Section } from "./section";
import { useScroll, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/shad/ui/sheet"

export function Navbar() {
  const [showBackground, setShowBackground] = useState(false)
  const { scrollY } = useScroll()

  const navClasses = showBackground ? "bg-white" : ""

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setShowBackground(true)
    } else {
      setShowBackground(false)
    }
  })

  return (
    <nav className={`${navClasses} fixed z-10 py-6 w-full font-Montserrat drop-shadow-white`}>
      <Section>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-3xl font-semibold backed">
            <Link
              to="/"
              className="flex items-center select-none"
            >
              <img
                src="/images/vesta-500x500.png"
                className="w-8 h-8 -mr-1"
                alt="logo"
              />
              esta
              <DotIcon className="-ml-2 -mb-1 stroke-primary h-8 w-8" />
            </Link>
          </div>
          <div className="hidden lg:flex gap-8 font-semibold text-lg">
            <Link
              className="hover:text-primary transition-colors duration-250 nav-link"
              to="/about"
            >
              About
            </Link>
            <a
              className="hover:text-primary transition-colors duration-250"
              href="/#contact"
            >
              Contact
            </a>
            <Link
              className="hover:text-primary transition-colors duration-250"
              to="/demo"
            >
              Demo
            </Link>
            <a
              href="https://youtu.be/YpHuPJu1V20"
              className="hover:text-primary transition-colors duration-250"
            >
              Presentation
            </a>
            <Link
              className="hover:text-primary transition-colors duration-250"
              to="/mail/$mailFolder"
              params={{
                mailFolder: "inbox"
              }}
            >
              Mail
            </Link>
          </div>
          <div className="hidden lg:block">
            <Link
              to="/mail/$mailFolder"
              params={{
                mailFolder: "inbox"
              }}
            >
              <Button className="bg-white font-semibold flex items-center gap-2">
                Launch
                <RocketIcon className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </Section>
    </nav>
  )
}

function MobileNav() {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const onClose = () => {
    closeBtnRef.current?.click()
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="bg-white font-semibold flex items-center gap-2">
          <MenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="py-8 flex flex-col justify-between grow">
          <div className="flex flex-col gap-4 text-xl font-medium">
            <Link
              className="hover:text-primary transition-colors duration-250 nav-link"
              to="/about"
              onClick={onClose}
            >
              About
            </Link>
            <Link
              className="hover:text-primary transition-colors duration-250"
              to="/"
              hash="contact"
              onClick={onClose}
            >
              Contact
            </Link>
            <Link
              className="hover:text-primary transition-colors duration-250"
              to="/demo"
              onClick={onClose}
            >
              Demo
            </Link>
            <a
              className="hover:text-primary transition-colors duration-250"
              href="https://youtu.be/YpHuPJu1V20"
            >
              <button
                type="button"
                onClick={onClose}
              >
                Presentation
              </button>
            </a>
            <Link
              className="hover:text-primary transition-colors duration-250"
              to="/mail/$mailFolder"
              params={{
                mailFolder: "inbox"
              }}
              onClick={onClose}
            >
              Mail
            </Link>
          </div>
        </div>
        <SheetFooter>
          <Link
            to="/mail/$mailFolder"
            params={{
              mailFolder: "inbox"
            }}
            onClick={onClose}
          >
            <Button className="w-full flex justify-between bg-white font-semibold items-center gap-2">
              Launch
              <RocketIcon className="w-5 h-5" />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )

}
