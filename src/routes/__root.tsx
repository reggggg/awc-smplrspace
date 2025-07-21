import { Fragment } from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import type { RouterContext } from '@/lib/types'
import { Toaster } from 'sonner'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="flex flex-col justify-center items-center space-y-2 py-4 px-2">
        <p>This is the notFoundComponent configured on root route</p>
        <Button asChild>
          <Link to=".">Start Over</Link>
        </Button>
      </div>
    )
  },
})

function RootComponent() {
  return (
    <Fragment>
      <Toaster richColors />
      <Outlet />
    </Fragment>
  )
}
