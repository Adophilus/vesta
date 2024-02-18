import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  component: DemoPage
})

const youtubeLink = "https://youtu.be/FHKsPazBrno"

function DemoPage() {
  window.location.href = youtubeLink

  return null
}
