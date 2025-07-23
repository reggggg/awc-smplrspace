import { fetchTickets } from "@/services/tickets.service";
import { queryOptions } from "@tanstack/react-query";

export const ticketsQuery = (eventId: string) => queryOptions({
  queryKey: ['tickets', eventId],
  queryFn: () => fetchTickets({ conference: eventId }),
})
