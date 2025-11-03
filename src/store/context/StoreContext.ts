import  { createContext } from 'react';
import type{ StoreState } from 'store/types';

interface StoreContextType extends StoreState {
  updateConfig: (config: Partial<StoreState['config']>) => void;
  deleteConfig: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export default StoreContext;