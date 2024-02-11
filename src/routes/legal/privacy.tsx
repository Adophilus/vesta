import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/legal/privacy')({
  component: () => <div>Hello /legal/privacy!</div>
})