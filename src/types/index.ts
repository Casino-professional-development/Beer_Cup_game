import React from 'react';

export interface BeerI {
  id: string;
  value: number;
  state: string;
  checkAddBeer: boolean;
  flag: boolean;
}

export interface CupCellPropsI {
  activate: BeerI;
  bet: number;
  balance: number;
  setTotalWin: React.Dispatch<React.SetStateAction<number>>;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  onLoseRound?: () => void;
  onInsufficientBalance?: () => void;
}

export interface FirstStatePropsI {
  id: string;
}

export interface SecondStatePropsI {
  id: string;
  value: number;
  balance: number;
  bet: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  onLoseRound?: () => void;
  onInsufficientBalance?: () => void;
}

export interface ThirdStatePropsI {
  id: string;
  value: number;
  balance: number;
  bet: number;
  checkAddBeer: boolean;
  setTotalWin: React.Dispatch<React.SetStateAction<number>>;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  onLoseRound?: () => void;
  onInsufficientBalance?: () => void;
}

export interface FifthStatePropsI {
  value: number;
  bet?: number;
}
