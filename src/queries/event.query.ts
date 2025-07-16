import { fetchEvents } from "@/services/events.service";
import { queryOptions } from "@tanstack/react-query";

export const eventsQuery = queryOptions({
  queryKey: ['events'],
  queryFn: fetchEvents,
})
