import { api } from "@/lib/client";
import type { TBooth, TBoothType } from "@/lib/types";

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

export const fetchBoothTypes = async ({ conference }: { conference: string }): Promise<TBoothType[]> => {
  try {
    return await api.get('booth_types', {
      searchParams: {
        conference
      }
    }).json<TBoothType[]>();
  } catch {
    return []
  }
}

