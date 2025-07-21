import type { TBooth, TBoothType } from '@/lib/types';
import { createContext, useContext, type PropsWithChildren } from 'react';

type ContextType = {
  booths: TBooth[],
  boothTypes: TBoothType[]
}

type Props = {
  booths: TBooth[],
  boothTypes: TBoothType[]
}

const BoothContext = createContext<ContextType | null>(null);

export const BoothProvider = ({ children, booths, boothTypes }: PropsWithChildren<Props>) => {

  return (
    <BoothContext 
      value={{ 
        booths, 
        boothTypes, 
      }}
    >
      {children}
    </BoothContext>
  );
};

export const useBooth = () => {
  const context = useContext(BoothContext);
  if (!context) {
    throw new Error('useBooth must be used within a BoothProvider');
  }
  return context;
};
