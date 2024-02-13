import { ArrowRightIcon, RocketIcon, SparkleIcon, SparklesIcon } from "lucide-react";
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
        <div className="flex flex-col gap-y-4">
          <Link
            to="/workspace"
            className="border-2 self-start bg-primary font-semibold text-xs border-black rounded-full p-1 px-2 pr-4 inline-flex gap-2 items-center select-none">
            <span className="rounded-full bg-black text-white p-2 px-4 inline-flex items-center gap-1"><SparklesIcon className="fill-white w-3 h-3" /> NEW</span> We're working on some new amazing featured <ArrowRightIcon className="w-4 h-4 stroke-[3px] fill-black stroke-black" />
          </Link>
          <header
            className="font-Poppins font-bold text-center text-5xl leading-relaxed lg:leding-noraml lg:text-8xl max-w-2xl lg:max-w-6xl px-4 lg:px-8"
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
        </div>
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
