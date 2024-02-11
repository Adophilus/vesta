import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/legal/terms')({
  component: () => <div>Hello /legal/terms!</div>
})