// Game Configuration Constants
export const GAME_CONFIG = {
  // Initial balance
  INITIAL_BALANCE: 5000,
  
  // Bet configuration
  MIN_BET: 1,
  MAX_BET: 10,
  BET_INCREMENT_PATTERNS: {
    // Pattern: current -> next
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 10,
    10: 50,
    50: 75,
    75: 100,
    100: 500,
    500: 750,
    750: 1000,
  },
  
  // Timer configuration
  CLOCK_UPDATE_INTERVAL: 6000, // 6 seconds
  
  // Beer states
  BEER_STATES: {
    FIRST: 'first',
    SECOND: 'second', 
    THIRD: 'third',
    FOURTH: 'fourth',
    FIFTH: 'fifth',
    ZERO: 'zero'
  },
  
  // Currency
  CURRENCY: 'DEM',
  
  // Game limits
  MAX_BEER_GLASSES: 5,
  MAX_BET_AMOUNT: 10000,
} as const;

// Initial beer data
export const INITIAL_BEERS = [
  { id: "a", value: 0, state: GAME_CONFIG.BEER_STATES.FIRST, flag: false, checkAddBeer: false },
  { id: "b", value: 0, state: GAME_CONFIG.BEER_STATES.FIRST, flag: false, checkAddBeer: false },
  { id: "c", value: 0, state: GAME_CONFIG.BEER_STATES.SECOND, flag: true, checkAddBeer: false },
  { id: "d", value: 0, state: GAME_CONFIG.BEER_STATES.FIRST, flag: false, checkAddBeer: false },
  { id: "e", value: 0, state: GAME_CONFIG.BEER_STATES.FIRST, flag: false, checkAddBeer: false },
];
