import React, { createContext, useState, ReactNode } from "react";

interface AddGlassCountI {
  addGlassCount: number;
  setAddGlassCount: (val: number) => void;
}

const AddGlassCount = createContext<AddGlassCountI | undefined>(undefined);

type AddGlassCountProviderProps = {
  children: ReactNode;
};

export const AddGlassCountProvider = ({ children }: AddGlassCountProviderProps) => {
  const [addGlassCount, setAddGlassCount] = useState<number>(1); // use a number

  return (
    <AddGlassCount.Provider value={{ addGlassCount, setAddGlassCount }}>
      {children}
    </AddGlassCount.Provider>
  );
};

export default AddGlassCount;
