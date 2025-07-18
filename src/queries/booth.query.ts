import { fetchBooths } from "@/services/booths.service";
import { queryOptions } from "@tanstack/react-query";

export const boothsQuery = (eventSlug: string) => queryOptions({
  queryKey: ['event', eventSlug],
  queryFn: () => fetchBooths({ conference: eventSlug }),
})
