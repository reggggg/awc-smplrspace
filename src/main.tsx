import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import NotFound from './components/not-found';

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient
  },
  defaultNotFoundComponent: () => {
    return <NotFound />
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
}