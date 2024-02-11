import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import "./styles/globals.css"

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import AuthService from './lib/services/auth'
import { Crypto } from "@peculiar/webcrypto"

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


(async () => {
  Object.defineProperty(globalThis, "crypto", {
    value: new Crypto()
  })

  await AuthService.init()

  // Render the app
  const rootElement = document.getElementById('root')!
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    )
  }
})()
