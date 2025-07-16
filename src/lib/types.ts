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