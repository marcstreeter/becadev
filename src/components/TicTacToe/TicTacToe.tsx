import React from 'react';
import { BOARD_SIZE } from './helpers';
import { usePixiTicTacToe } from './pixi';
import { useTicTacToeGame } from './tictactoeHooks';

export default function TicTacToe() {
  const {
    board,
    currentPlayer,
    winner,
    draw,
    winningCells,
    handleCellDblClick
  } = useTicTacToeGame();

  const containerRef = usePixiTicTacToe(board, winner, winningCells, handleCellDblClick);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Tic Tac Toe (Pixi.js + React)</h2>
      <div
        ref={containerRef}
        style={{
          margin: '0 auto',
          width: 100 * BOARD_SIZE,
          height: 100 * BOARD_SIZE
        }}
      />
      <div style={{ marginTop: 16 }}>
        {winner ? (
          <strong>Winner: {winner}</strong>
        ) : draw ? (
          <strong>It's a draw!</strong>
        ) : (
          <span>Current Player: {currentPlayer}</span>
        )}
      </div>
    </div>
  );
} 