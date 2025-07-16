import Viewer from '@/components/floorplan/viewer'
import { fetchEventBySlug } from '@/services/events.service';
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/$eventId')({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }) => {
    const eventId = params.eventId;

    const event = await queryClient.ensureQueryData({
      queryKey: ['event'],
      queryFn: () => fetchEventBySlug(eventId)
    });

    if (!event) {
      throw notFound();
    }

    return event;
  },
})

function RouteComponent() {  
  const handleClick = (booth: string) => {
    console.log('booth: ', booth);
  }

  return (
    <div className="h-screen">
      <Viewer onClick={handleClick} />
    </div>
  )
}
