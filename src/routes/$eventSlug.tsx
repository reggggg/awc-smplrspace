import Viewer from '@/components/floorplan/viewer'
import type { TBooth, TEvent } from '@/lib/types';
import { boothsQuery } from '@/queries/booth.query';
import { eventBySlugQuery } from '@/queries/event.query';
import { createFileRoute, notFound } from '@tanstack/react-router'

type LoaderData = {
  event: TEvent,
  booths: TBooth[]
}

export const Route = createFileRoute('/$eventSlug')({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }): Promise<LoaderData> => {
    const eventSlug = params.eventSlug;

    const event = await queryClient.ensureQueryData(eventBySlugQuery(eventSlug));

    if (!event) throw notFound();

    const booths = await queryClient.ensureQueryData(boothsQuery(event.id));

    return {
      event,
      booths
    }
  },
})

function RouteComponent() {
  const { event, booths } = Route.useLoaderData();

  const handleClick = (booth: string) => {
    console.log('booth: ', booth);
  }

  console.log(event, 'event');
  console.log(booths, 'booths');

  return (
    <div className="h-screen">
      <Viewer onClick={handleClick} />
    </div>
  )
}
