import { createFileRoute } from "@tanstack/react-router"
import { Hero } from "./-components/hero"
import { Navbar } from "./-components/navbar"

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  )
}
