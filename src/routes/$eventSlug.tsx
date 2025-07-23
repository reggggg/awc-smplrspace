import Legend from '@/components/floorplan/legend';
import Viewer from '@/components/floorplan/viewer'
import { EventProvider } from '@/contexts/EventContext';
import type { TBooth, TBoothType, TEvent, TTicket } from '@/lib/types';
import { boothsQuery, boothTypesQuery } from '@/queries/booth.query';
import { eventBySlugQuery } from '@/queries/event.query';
import { createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react';
import SelectedBoothInfo from '@/components/floorplan/selected-booth-info';
import { BoothProvider } from '@/contexts/BoothContext';
import { ticketsQuery } from '@/queries/ticket.query';
import { TicketProvider } from '@/contexts/TicketContext';

type LoaderData = {
  event: TEvent,
  boothTypes: TBoothType[],
  booths: TBooth[],
  tickets: TTicket[]
}

export const Route = createFileRoute('/$eventSlug')({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }): Promise<LoaderData> => {
    const eventSlug = params.eventSlug;

    const event = await queryClient.ensureQueryData(eventBySlugQuery(eventSlug));

    if (!event) throw notFound();


    const [boothTypes, booths, tickets] = await Promise.all([
      queryClient.ensureQueryData(boothTypesQuery(event.id)),
      queryClient.ensureQueryData(boothsQuery(event.id)),
      queryClient.ensureQueryData(ticketsQuery(event.id)),
    ])

    return {
      event,
      boothTypes,
      booths,
      tickets
    }
  },
})

function RouteComponent() {
  const { event, booths, boothTypes, tickets } = Route.useLoaderData();
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);

  const handleClick = (booth: string) => {
    setSelectedBooth(booth);
  }

  return (
    <EventProvider event={event}>
      <BoothProvider booths={booths} boothTypes={boothTypes}>
        <div className="h-screen relative overflow-hidden">
          <div className="rounded-md absolute top-4 left-4 z-50 bg-background p-3 min-w-42">
            <Legend />
          </div>
          <Viewer
            selectEntity={handleClick}
            selectedEntity={selectedBooth}
            booths={booths} 
          />
          <TicketProvider tickets={tickets}>
            <SelectedBoothInfo selectedBooth={selectedBooth} />
          </TicketProvider>
        </div>
      </BoothProvider>
    </EventProvider>
  )
}
