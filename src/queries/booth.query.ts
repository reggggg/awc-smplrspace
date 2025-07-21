import { fetchBooths, fetchBoothTypes } from "@/services/booths.service";
import { queryOptions } from "@tanstack/react-query";

export const boothsQuery = (eventId: string) => queryOptions({
  queryKey: ['booths', eventId],
  queryFn: () => fetchBooths({ conference: eventId }),
})

export const boothTypesQuery = (eventId: string) => queryOptions({
  queryKey: ['boothTypes', eventId],
  queryFn: () => fetchBoothTypes({ conference: eventId }),
})

