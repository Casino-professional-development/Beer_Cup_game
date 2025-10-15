import React, { useState, useEffect } from 'react';
import './AnimatedCupCell.scss';

interface AnimatedCupCellProps {
  children: React.ReactNode;
  state: string;
  isActive?: boolean;
}

const AnimatedCupCell: React.FC<AnimatedCupCellProps> = ({ 
  children, 
  state, 
  isActive = false 
}) => {
  const [animationClass, setAnimationClass] = useState('');
  const [prevState, setPrevState] = useState(state);

  useEffect(() => {
    if (state !== prevState) {
      // Trigger state change animation
      setAnimationClass('cup-cell--state-changing');
      
      const timer = setTimeout(() => {
        setAnimationClass(`cup-cell--${state}`);
        setPrevState(state);
      }, 150);

      return () => clearTimeout(timer);
    } else {
      setAnimationClass(`cup-cell--${state}`);
    }
  }, [state, prevState]);

  return (
    <div 
      className={`cup-cell-animated ${animationClass} ${isActive ? 'cup-cell--active' : ''}`}
      data-state={state}
    >
      {children}
    </div>
  );
};

export default AnimatedCupCell;
