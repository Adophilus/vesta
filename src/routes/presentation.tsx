import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/presentation')({
  component: PresentationPage
})

const youtubeLink = "https://youtu.be/gyNnu84AEUE"

function PresentationPage() {
  window.location.href = youtubeLink

  return null
}
