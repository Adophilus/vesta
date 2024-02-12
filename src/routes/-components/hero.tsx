import { ArrowRightIcon } from "lucide-react";
import { Button } from "./button";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="h-screen flex items-center justify-center flex-col gap-12">
      <header className="font-Poppins font-bold text-center text-8xl max-w-6xl">
        Increase <span className="text-primary">productivity</span> with our all-in-one <span className="text-primary">Platform</span>
      </header>
      <Link
        to="/mail/$mailFolder"
        params={{
          mailFolder: "inbox"
        }}
      >
        <Button className="flex items-center gap-3 text-2xl font-semibold">
          Get Started
          <ArrowRightIcon className="w-6 h-6 stroke-[3px]" />
        </Button>
      </Link>
    </section>
  )
}
