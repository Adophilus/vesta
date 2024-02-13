import { createFileRoute } from '@tanstack/react-router'
import { Section } from './-components/section'

export const Route = createFileRoute('/about')({
  component: () => AboutPage
})

function AboutPage() {
  return (
    <main>
      <section className="bg-black text-white font-Poppins h-screen flex flex-col">
        <div className="flex flex-col justify-center">
          <header className="text-center text-semibold">
            About Us
          </header>
        </div>
      </section>
      <section>
        What we do
      </section>
    </main>
  )
}
