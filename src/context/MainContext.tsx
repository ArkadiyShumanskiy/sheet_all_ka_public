import { createContext } from "react";

type MainContextType = {
  setPrice: (productId: string, price: number) => void;
  setWeight: (productId: string, weight: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  setVolume: (productId: string, volume: number) => void;
  clearProductProperties: (productId: string) => void;
};

export const MainContext = createContext<MainContextType>(undefined as any);
