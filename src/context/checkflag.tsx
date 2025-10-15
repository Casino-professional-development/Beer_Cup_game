import React, { createContext, useState, ReactNode, useMemo } from "react";

export type CheckFlagContextType = {
  checkFlag: boolean;
  beerCheck: boolean;
  allBeerValue: number;
  buttonsDisabled: boolean;
  setCheckFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setBeerFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setAllBeerValue: React.Dispatch<React.SetStateAction<number>>;
  setButtonsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CheckFlagContext = createContext<CheckFlagContextType | undefined>(
  undefined
);

interface CheckFlagProviderProps {
  children: ReactNode;
}

export const CheckFlagProvider: React.FC<CheckFlagProviderProps> = ({
  children,
}) => {
  const [checkFlag, setCheckFlag] = useState<boolean>(false);
  const [beerCheck, setBeerFlag] = useState<boolean>(false);
  const [allBeerValue, setAllBeerValue] = useState<number>(0);
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      checkFlag,
      beerCheck,
      allBeerValue,
      buttonsDisabled,
      setCheckFlag,
      setBeerFlag,
      setAllBeerValue,
      setButtonsDisabled,
    }),
    [checkFlag, beerCheck, allBeerValue, buttonsDisabled]
  );

  return (
    <CheckFlagContext.Provider value={value}>
      {children}
    </CheckFlagContext.Provider>
  );
};
