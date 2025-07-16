import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { eventsQuery } from '@/queries/event.query'

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(eventsQuery)
  },
  component: RouteComponent,
})

function RouteComponent() {
  const events = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto py-0 sm:py-10">
      <Card className="pt-0 overflow-hidden">
        <CardContent className="divide-y px-0">
          {events.map((event) => (
            <div 
              key={event.id} 
              onClick={() => navigate({ to: event.slug })}
              className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-muted-foreground">{event.slug}</p>
              </div>
              <Badge variant="outline" className="capitalize">
                {event.state}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
