import { Link } from "@tanstack/react-router";
import { Button } from "./button"

export function Navbar() {
  return (
    <nav className="bg-white py-4">
      <div className="max-w-7xl mx-auto">
        <div />
        <div>
          <Link
            to="/about"
          >
            About
          </Link>
          <Link
            to="/contact"
          >
            Contact
          </Link>
          <Link
            to="/presentation"
          >
            Presentation
          </Link>
          <Link
            to="/mail/$mailFolder"
            params={{
              mailFolder: "inbox"
            }}
          >
            Mail
          </Link>
        </div>
        <div>
          <Button>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}
