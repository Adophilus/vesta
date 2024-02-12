import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/presentation')({
  component: () => <div>Hello /presentation!</div>
})