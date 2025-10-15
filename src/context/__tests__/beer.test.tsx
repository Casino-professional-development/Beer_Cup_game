import React from 'react';
import { render, screen } from '@testing-library/react';
import { BeerProvider, BeerContext } from '../beer';
import { INITIAL_BEERS } from '../../config/constants';

// Test component that uses the BeerContext
const TestComponent = () => {
  const { beers, setBeers } = React.useContext(BeerContext)!;
  
  return (
    <div>
      <div data-testid="beer-count">{beers.length}</div>
      <div data-testid="first-beer-id">{beers[0]?.id}</div>
      <button 
        onClick={() => setBeers([...beers, { id: 'new', value: 0, state: 'first', flag: false }])}
        data-testid="add-beer"
      >
        Add Beer
      </button>
    </div>
  );
};

describe('BeerContext', () => {
  it('provides initial beers from constants', () => {
    render(
      <BeerProvider>
        <TestComponent />
      </BeerProvider>
    );
    
    expect(screen.getByTestId('beer-count')).toHaveTextContent('5');
    expect(screen.getByTestId('first-beer-id')).toHaveTextContent('a');
  });

  it('allows updating beers state', () => {
    render(
      <BeerProvider>
        <TestComponent />
      </BeerProvider>
    );
    
    const addButton = screen.getByTestId('add-beer');
    addButton.click();
    
    expect(screen.getByTestId('beer-count')).toHaveTextContent('6');
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow();
    
    console.error = originalError;
  });
});
