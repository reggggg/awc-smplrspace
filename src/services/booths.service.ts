import { api } from "@/lib/client";
import type { TBooth } from "@/lib/types";

export const fetchBooths = async ({ conference }: { conference: string }): Promise<TBooth[]> => {
  try {
    return await api.get('booths', {
      searchParams: {
        conference
      }
    }).json<TBooth[]>();
  } catch {
    return []
  }
}