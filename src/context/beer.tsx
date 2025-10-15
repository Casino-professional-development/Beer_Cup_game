import React, { createContext, useState, ReactNode, useMemo } from "react";
import { BeerI } from "../types";
import { INITIAL_BEERS } from "../config/constants";

export type BeerContextType = {
  beers: BeerI[];
  setBeers: React.Dispatch<React.SetStateAction<BeerI[]>>;
};

export const BeerContext = createContext<BeerContextType | undefined>(
  undefined
);

interface BeerProviderProps {
  children: ReactNode;
}

export const BeerProvider: React.FC<BeerProviderProps> = ({ children }) => {
  const [beers, setBeers] = useState<BeerI[]>(INITIAL_BEERS);

  const value = useMemo(() => ({ beers, setBeers }), [beers]);

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
};
