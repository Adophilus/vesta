import { ArrowRightIcon, RocketIcon } from "lucide-react";
import { Button } from "./button";
import { Link } from "@tanstack/react-router";
import "./hero.css"
import "./navbar.css"

export function Hero() {
  return (
    <section
      className="h-screen relative flex flex-col bg-cover bg-center hero"
    >
      <div
        className="backed grow flex flex-col gap-12 items-center justify-center"
      >
        <header
          className="font-Poppins font-bold text-center text-8xl max-w-6xl"
        >
          Increase <span
            style={{ WebkitTextStroke: "3px black" }}
            className="text-primary"
          >
            productivity
          </span> with our all-in-one <span
            style={{ WebkitTextStroke: "3px black" }}
            className="text-primary"
          >
            Platform
          </span>
        </header>
        <Link
          to="/mail/$mailFolder"
          params={{
            mailFolder: "inbox"
          }}
        >
          <Button className="flex font-Montserrat items-center gap-3 text-2xl font-semibold">
            Launch
            <RocketIcon className="w-6 h-6 stroke-[3px]" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
