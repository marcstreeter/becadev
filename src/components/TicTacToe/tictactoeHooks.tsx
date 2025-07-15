import { useState, useEffect, useCallback } from 'react';
import { BOARD_SIZE, getWinnerInfo, isDraw, canPlaceMark } from './helpers';

export function useTicTacToeGame() {
  // Use a single state for both board and currentPlayer
  const [gameState, setGameState] = useState(() => ({
    board: Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill('')),
    currentPlayer: 'X' as 'X' | 'O',
  }));
  const [{ winner, cells: winningCells }, setWinnerInfo] = useState<{ winner: string | null, cells: [number, number][] }>({ winner: null, cells: [] });
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const info = getWinnerInfo(gameState.board);
    if (info.winner) {
      setWinnerInfo(info);
      setDraw(false);
    } else if (isDraw(gameState.board)) {
      setWinnerInfo({ winner: null, cells: [] });
      setDraw(true);
    } else {
      setWinnerInfo({ winner: null, cells: [] });
      setDraw(false);
    }
  }, [gameState.board]);

  const handleCellDblClick = useCallback((x: number, y: number) => {
    // Prevent moves if game is over
    if (winner || draw) return;
    setGameState(prev => {
      if (canPlaceMark({ prevBoard: prev.board, x, y, winner, draw })) {
        const newBoard = prev.board.map(row => [...row]);
        newBoard[y][x] = prev.currentPlayer;
        return {
          board: newBoard,
          currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        };
      }
      return prev;
    });
  }, [winner, draw]);

  return {
    board: gameState.board,
    currentPlayer: gameState.currentPlayer,
    winner,
    draw,
    winningCells,
    handleCellDblClick,
    setBoard: (board: string[][]) => setGameState(prev => ({ ...prev, board })),
    setCurrentPlayer: (player: 'X' | 'O') => setGameState(prev => ({ ...prev, currentPlayer: player })),
  };
} 