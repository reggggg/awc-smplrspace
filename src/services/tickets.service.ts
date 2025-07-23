import { api } from "@/lib/client";
import type { TTicket } from "@/lib/types";

export const fetchTickets = async ({ conference }: { conference: string }): Promise<TTicket[]> => {
  try {
    return await api.get('tickets', {
      searchParams: {
        conference
      }
    }).json<TTicket[]>();
  } catch {
    return []
  }
}