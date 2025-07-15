import { useRef, useEffect } from 'react';
import { BOARD_PIXEL_SIZE } from '../drawing';
import { usePixiApp } from './usePixiApp';
import { usePixiGrid } from './usePixiGrid';
import { usePixiMarks } from './usePixiMarks';
import { usePixiDblClick } from './usePixiDblClick';

function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

export function usePixiTicTacToe(
  board: string[][],
  winner: string | null,
  winningCells: [number, number][],
  onCellDblClick: (x: number, y: number) => void
) {
  // Use new hooks for app, grid, marks, latest refs, and dblclick
  const { containerRef, appRef, ready } = usePixiApp(BOARD_PIXEL_SIZE, BOARD_PIXEL_SIZE, 0xffffff);
  usePixiGrid(appRef);
  usePixiMarks(appRef, board, winner, winningCells);
  const winnerRef = useLatestRef(winner);
  const boardRef = useLatestRef(board);
  usePixiDblClick(appRef, ready, winnerRef, boardRef, onCellDblClick, BOARD_PIXEL_SIZE);

  return containerRef;
} 