import { vi } from 'vitest';
vi.mock('pixi.js', () => {
  return {
    Application: class {
      static async init() { return new this(); }
      async init() { return this; }
      get canvas() { return document.createElement('canvas'); }
      stage = { addChild: () => {}, removeChild: () => {}, removeChildren: () => {} };
      renderer = { resize: () => {} };
      destroy = () => {};
    },
    Graphics: class {
      setStrokeStyle() { return this; }
      moveTo() { return this; }
      lineTo() { return this; }
      stroke() { return this; }
      drawCircle() { return this; }
      drawRect() { return this; }
      beginFill() { return this; }
      endFill() { return this; }
      addChild() { return this; }
      removeChild() { return this; }
    },
    // Add any other mocks if needed
  };
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TicTacToe from './TicTacToe';

describe('TicTacToe component', () => {
  it('renders the board and current player', () => {
    render(<TicTacToe />);
    expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Player:/i)).toBeInTheDocument();
  });
}); 