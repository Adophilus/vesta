import { Link } from "@tanstack/react-router";
import { Button } from "./button"
import { ArrowRightIcon } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white py-6 fixed w-full font-Montserrat">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div />
        <div className="flex gap-8 font-semibold">
          <Link
            className="hover:text-primary transition-colors duration-250"
            to="/about"
          >
            About
          </Link>
          <Link
            className="hover:text-primary transition-colors duration-250"
            to="/contact"
          >
            Contact
          </Link>
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
