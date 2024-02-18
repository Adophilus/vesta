import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  component: DemoPage
})

const youtubeLink = "https://youtu.be/qagF1Yo__M0"

function DemoPage() {
  window.location.href = youtubeLink

  return null
}
