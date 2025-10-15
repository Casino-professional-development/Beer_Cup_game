import { GAME_CONFIG } from '../config/constants';

export const validateBetAmount = (bet: number, balance: number): boolean => {
  return bet >= GAME_CONFIG.MIN_BET && 
         bet <= balance && 
         bet <= GAME_CONFIG.MAX_BET_AMOUNT;
};

export const validateBalance = (balance: number): boolean => {
  return balance >= 0 && balance <= GAME_CONFIG.MAX_BET_AMOUNT * 2;
};

export const validateBeerState = (state: string): boolean => {
  return Object.values(GAME_CONFIG.BEER_STATES).includes(state as any);
};

export const validateBeerId = (id: string): boolean => {
  return typeof id === 'string' && id.length > 0;
};

export const validateBeerValue = (value: number): boolean => {
  return value >= 0 && value <= GAME_CONFIG.MAX_BET_AMOUNT;
};

export const validateBeerFlag = (flag: boolean): boolean => {
  return typeof flag === 'boolean';
};

export const validateBeerObject = (beer: any): boolean => {
  return (
    validateBeerId(beer.id) &&
    validateBeerValue(beer.value) &&
    validateBeerState(beer.state) &&
    validateBeerFlag(beer.flag)
  );
};
