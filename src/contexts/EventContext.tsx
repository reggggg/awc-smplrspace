import type { TEvent } from '@/lib/types';
import { createContext, useContext, type PropsWithChildren } from 'react';

type ContextType = {
  event: TEvent
}

type Props = {
  event: TEvent
}

const EventContext = createContext<ContextType | null>(null);

export const EventProvider = ({ children, event }: PropsWithChildren<Props>) => {

  return (
    <EventContext 
      value={{ 
        event, 
      }}
    >
      {children}
    </EventContext>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within a EventProvider');
  }
  return context;
};
