import Legend from '@/components/floorplan/legend';
import Viewer from '@/components/floorplan/viewer'
import { EventProvider } from '@/contexts/EventContext';
import type { TBooth, TBoothType, TEvent } from '@/lib/types';
import { boothsQuery, boothTypesQuery } from '@/queries/booth.query';
import { eventBySlugQuery } from '@/queries/event.query';
import { createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/components/ui/button';

type LoaderData = {
  event: TEvent,
  boothTypes: TBoothType[],
  booths: TBooth[],
}

export const Route = createFileRoute('/$eventSlug')({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }): Promise<LoaderData> => {
    const eventSlug = params.eventSlug;

    const event = await queryClient.ensureQueryData(eventBySlugQuery(eventSlug));

    if (!event) throw notFound();


    const [boothTypes, booths] = await Promise.all([
      queryClient.ensureQueryData(boothTypesQuery(event.id)),
      queryClient.ensureQueryData(boothsQuery(event.id))
    ])

    return {
      event,
      boothTypes,
      booths
    }
  },
})

function RouteComponent() {
  const { event, booths } = Route.useLoaderData();
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);

  const handleClick = (booth: string) => {
    setSelectedBooth(booth);
  }

  return (
    <EventProvider event={event}>
      <div className="h-screen relative overflow-hidden">
        <div className="rounded-md absolute top-4 left-4 z-50 bg-background p-3 min-w-42">
          <Legend />
        </div>
        <Viewer
          selectEntity={handleClick}
          selectedEntity={selectedBooth}
          booths={booths} 
        />
        <AnimatePresence mode="wait">
          {!!selectedBooth && (
            <motion.div 
              key={selectedBooth}
              className="
                absolute bottom-0 left-1/2 -translate-1/2 bg-background px-3 py-2 rounded-full min-w-80 shadow-md
                flex justify-between items-center
                border border-neutral-500
              "
              initial={{ y: 50, opacity: 0, scale: 0.80 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.80 }}
              transition={{ duration: 0.2 }}
            >
              <span>Booth: <b>{selectedBooth}</b></span>
              <Button className="rounded-full">Proceed</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </EventProvider>
  )
}
