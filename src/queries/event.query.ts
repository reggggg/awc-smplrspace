import { fetchEventBySlug, fetchEvents } from "@/services/events.service";
import { queryOptions } from "@tanstack/react-query";

export const eventsQuery = queryOptions({
  queryKey: ['events'],
  queryFn: fetchEvents,
})

export const eventBySlugQuery = (eventSlug: string) => queryOptions({
  queryKey: ['event', eventSlug],
  queryFn: () => fetchEventBySlug(eventSlug),
})
