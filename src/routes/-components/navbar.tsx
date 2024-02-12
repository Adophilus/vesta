import { Link } from "@tanstack/react-router";
import { Button } from "./button"
import { ArrowRightIcon, DotIcon } from "lucide-react";
import "./navbar.css"

export function Navbar() {
  return (
    <nav className="fixed z-10 py-6 w-full font-Montserrat drop-shadow-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center text-3xl font-semibold backed">
          <Link
            to="/"
            className="flex items-end"
          >
            <span className="text-primary">J</span>
            Mail
            <DotIcon className="-ml-2 -mb-1 stroke-primary h-8 w-8" />
          </Link>
        </div>
        <div className="flex gap-8 font-semibold text-lg">
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
            to="/presentation"
          >
            Presentation
          </Link>
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
        <div>
          <Link
            to="/mail/$mailFolder"
            params={{
              mailFolder: "inbox"
            }}
          >
            <Button className="font-semibold flex items-center gap-2">
              Get Started
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
