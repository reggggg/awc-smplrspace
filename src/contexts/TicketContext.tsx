import type { TTicket } from '@/lib/types';
import { createContext, useContext, type PropsWithChildren } from 'react';

type ContextType = {
  tickets: TTicket[],
}

type Props = {
  tickets: TTicket[],
}

const TicketContext = createContext<ContextType | null>(null);

export const TicketProvider = ({ children, tickets }: PropsWithChildren<Props>) => {

  return (
    <TicketContext 
      value={{ 
        tickets, 
      }}
    >
      {children}
    </TicketContext>
  );
};

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicket must be used within a TicketProvider');
  }
  return context;
};
