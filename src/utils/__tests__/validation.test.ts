import {
  validateBetAmount,
  validateBalance,
  validateBeerState,
  validateBeerId,
  validateBeerValue,
  validateBeerFlag,
  validateBeerObject,
} from '../validation';
import { GAME_CONFIG } from '../../config/constants';

describe('Validation Utils', () => {
  describe('validateBetAmount', () => {
    it('should return true for valid bet amounts', () => {
      expect(validateBetAmount(1, 1000)).toBe(true);
      expect(validateBetAmount(5, 1000)).toBe(true);
      expect(validateBetAmount(100, 1000)).toBe(true);
    });

    it('should return false for bet amounts below minimum', () => {
      expect(validateBetAmount(0, 1000)).toBe(false);
      expect(validateBetAmount(-1, 1000)).toBe(false);
    });

    it('should return false for bet amounts exceeding balance', () => {
      expect(validateBetAmount(100, 50)).toBe(false);
      expect(validateBetAmount(1000, 500)).toBe(false);
    });

    it('should return false for bet amounts exceeding maximum', () => {
      expect(validateBetAmount(GAME_CONFIG.MAX_BET_AMOUNT + 1, 10000)).toBe(false);
    });
  });

  describe('validateBalance', () => {
    it('should return true for valid balances', () => {
      expect(validateBalance(0)).toBe(true);
      expect(validateBalance(1000)).toBe(true);
      expect(validateBalance(5000)).toBe(true);
    });

    it('should return false for negative balances', () => {
      expect(validateBalance(-1)).toBe(false);
      expect(validateBalance(-100)).toBe(false);
    });

    it('should return false for balances exceeding maximum', () => {
      expect(validateBalance(GAME_CONFIG.MAX_BET_AMOUNT * 2 + 1)).toBe(false);
    });
  });

  describe('validateBeerState', () => {
    it('should return true for valid beer states', () => {
      expect(validateBeerState('first')).toBe(true);
      expect(validateBeerState('second')).toBe(true);
      expect(validateBeerState('third')).toBe(true);
      expect(validateBeerState('fourth')).toBe(true);
      expect(validateBeerState('fifth')).toBe(true);
      expect(validateBeerState('zero')).toBe(true);
    });

    it('should return false for invalid beer states', () => {
      expect(validateBeerState('invalid')).toBe(false);
      expect(validateBeerState('')).toBe(false);
      expect(validateBeerState('FIRST')).toBe(false);
    });
  });

  describe('validateBeerId', () => {
    it('should return true for valid beer IDs', () => {
      expect(validateBeerId('a')).toBe(true);
      expect(validateBeerId('beer1')).toBe(true);
      expect(validateBeerId('123')).toBe(true);
    });

    it('should return false for invalid beer IDs', () => {
      expect(validateBeerId('')).toBe(false);
      expect(validateBeerId(null as any)).toBe(false);
      expect(validateBeerId(undefined as any)).toBe(false);
    });
  });

  describe('validateBeerValue', () => {
    it('should return true for valid beer values', () => {
      expect(validateBeerValue(0)).toBe(true);
      expect(validateBeerValue(100)).toBe(true);
      expect(validateBeerValue(GAME_CONFIG.MAX_BET_AMOUNT)).toBe(true);
    });

    it('should return false for invalid beer values', () => {
      expect(validateBeerValue(-1)).toBe(false);
      expect(validateBeerValue(GAME_CONFIG.MAX_BET_AMOUNT + 1)).toBe(false);
    });
  });

  describe('validateBeerFlag', () => {
    it('should return true for valid beer flags', () => {
      expect(validateBeerFlag(true)).toBe(true);
      expect(validateBeerFlag(false)).toBe(true);
    });

    it('should return false for invalid beer flags', () => {
      expect(validateBeerFlag(null as any)).toBe(false);
      expect(validateBeerFlag(undefined as any)).toBe(false);
      expect(validateBeerFlag('true' as any)).toBe(false);
    });
  });

  describe('validateBeerObject', () => {
    it('should return true for valid beer objects', () => {
      const validBeer = {
        id: 'a',
        value: 100,
        state: 'first',
        flag: true,
      };
      expect(validateBeerObject(validBeer)).toBe(true);
    });

    it('should return false for invalid beer objects', () => {
      expect(validateBeerObject({})).toBe(false);
      expect(validateBeerObject({ id: 'a' })).toBe(false);
      expect(validateBeerObject({ id: '', value: 100, state: 'first', flag: true })).toBe(false);
      expect(validateBeerObject({ id: 'a', value: -1, state: 'first', flag: true })).toBe(false);
      expect(validateBeerObject({ id: 'a', value: 100, state: 'invalid', flag: true })).toBe(false);
      expect(validateBeerObject({ id: 'a', value: 100, state: 'first', flag: 'true' })).toBe(false);
    });
  });
});
