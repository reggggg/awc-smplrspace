import { api } from "@/lib/client";
import type { TEvent } from "@/lib/types";

export const fetchEvents = async (): Promise<TEvent[]> => {
  try {
    return await api.get('conferences').json<TEvent[]>();
  } catch {
    return []
  }
}

export const fetchEventBySlug = async (slug: string): Promise<TEvent | null> => {
  try {
    return await api.get(`conferences/${slug}/`).json<TEvent>();
  } catch {
    return null;
  }
}