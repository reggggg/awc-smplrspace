import type { QueryClient } from '@tanstack/react-query';
import type { BoothStatus } from './constants';

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
  status: (typeof BoothStatus)[keyof typeof BoothStatus]
  slug: string,
  sponsorship_item: number,
}

export type TBoothType = {
  id: number,
  name: string,
  slug: string,
  price: number,
  description: string
}
