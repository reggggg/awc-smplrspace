import type { QueryClient } from '@tanstack/react-query';

export interface RouterContext {
  queryClient: QueryClient;
}

export type TEvent = {
  id: string,
  name: string,
  slug: string,
  state: string
}

export type TBooth = {
  id: number,
  name: string,
  booth_type: number,
  slug: string
}