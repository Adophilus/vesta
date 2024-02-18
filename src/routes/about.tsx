import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage
})

const youtubeLink = "https://youtu.be/qagF1Yo__M0"

function AboutPage() {
  window.location.href = youtubeLink

  return null
}
