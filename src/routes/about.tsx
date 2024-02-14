import { createFileRoute } from '@tanstack/react-router'
import { Section } from './-components/section'
import { ReactNode, useEffect } from 'react'
import Typography from './-components/typography'
import "./-components/about.css"
import { ScrollIcon } from '@/components/icons'
import { animate, motion, useMotionValueEvent, useScroll } from 'framer-motion'

export const Route = createFileRoute('/about')({
  component: AboutPage
})

function YoutubeVideo({ embedId }: { embedId: string }) {
  return (
    <div>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )
}

function Accent({ children }: { children: ReactNode }) {
  return (
    <Typography.Accent
      style={{
        WebkitTextStroke: "3px #7888ff"
      }}
      className="text-white"
    >
      {children}
    </Typography.Accent>
  )
}

type DisplayFn = (item: "text" | "background") => void

function Hero({ show, hide }: { show?: DisplayFn, hide?: DisplayFn }) {
  return (
    <section className="about-hero text-white font-Poppins h-screen flex flex-col">
      <div
        className="h-full about-backed py-24"
      >
        <Section className="h-full">
          <div className="h-full flex flex-col items-center justify-between">
            <div />
            <header
              className="font-Poppins font-bold text-center text-5xl leading-relaxed lg:leding-noraml lg:text-7xl 2xl:text-8xl max-w-2xl lg:max-w-5xl 2xl:max-w-6xl px-4 lg:px-8"
            >
              <motion.div
                onViewportEnter={(io) => {
                  if (io) {
                    animate(
                      io.target,
                      {
                        y: [-50, 0],
                        opacity: [0, 1]
                      },
                      {
                        duration: 0.5
                      })
                  }
                }}>
                <Accent>
                  What we're all
                  <br />
                  <span
                    className="text-primary"
                    style={{
                      WebkitTextStrokeColor: "white"
                    }}
                  >
                    about
                  </span>
                </Accent>
              </motion.div>
            </header>
            <div>
              <ScrollIcon />
            </div>
          </div>
        </Section>
      </div>
    </section>
  )
}

function AboutPage() {
  const { scrollY } = useScroll()
  const interval = 1000

  const hideHeroText = () => {

  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= interval) {
      hideHeroText()
    }
  })

  return (
    <main className="h-[10000px]">
      <div className="sticky top-0">
        <Hero />
      </div>
    </main>
  )
}
