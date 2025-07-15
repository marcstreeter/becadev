import { useState, useEffect, useCallback } from 'react';
import { BOARD_SIZE, getWinnerInfo, isDraw, canPlaceMark } from './helpers';

export function useTicTacToeGame() {
  const [board, setBoard] = useState<string[][]>(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill('')));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [{ winner, cells: winningCells }, setWinnerInfo] = useState<{ winner: string | null, cells: [number, number][] }>({ winner: null, cells: [] });
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const info = getWinnerInfo(board);
    if (info.winner) {
      setWinnerInfo(info);
      setDraw(false);
    } else if (isDraw(board)) {
      setWinnerInfo({ winner: null, cells: [] });
      setDraw(true);
    } else {
      setWinnerInfo({ winner: null, cells: [] });
      setDraw(false);
    }
  }, [board]);

  const handleCellDblClick = useCallback((x: number, y: number) => {
    setBoard(prevBoard => {
      if (canPlaceMark({ prevBoard, x, y, winner, draw })) {
        const newBoard = prevBoard.map(row => [...row]);
        newBoard[y][x] = currentPlayer;
        setCurrentPlayer(cp => (cp === 'X' ? 'O' : 'X'));
        return newBoard;
      }
      return prevBoard;
    });
  }, [winner, draw, currentPlayer]);

  return {
    board,
    currentPlayer,
    winner,
    draw,
    winningCells,
    handleCellDblClick,
    setBoard,
    setCurrentPlayer
  };
} 