import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { BOARD_PIXEL_SIZE } from '../drawing';
import { usePixiApp } from './usePixiApp';
import { usePixiGrid } from './usePixiGrid';
import { usePixiMarks } from './usePixiMarks';

export function usePixiTicTacToe(
  board: string[][],
  winner: string | null,
  winningCells: [number, number][],
  onCellDblClick: (x: number, y: number) => void
) {
  // Use new hooks for app, grid, and marks
  const { containerRef, appRef, ready } = usePixiApp(BOARD_PIXEL_SIZE, BOARD_PIXEL_SIZE, 0xffffff);
  usePixiGrid(appRef);
  usePixiMarks(appRef, board, winner, winningCells);

  // Refs to always have latest winner/board
  const winnerRef = useRef(winner);
  const boardRef = useRef(board);
  useEffect(() => {
    winnerRef.current = winner;
    boardRef.current = board;
  }, [winner, board]);

  useEffect(() => {
    if (!ready) return;
    const appLocal = appRef.current;
    if (!appLocal) return;
    function handleDblClick(event: MouseEvent) {
      if (winnerRef.current || boardRef.current.flat().every(cell => cell)) return;
      const rect = appLocal.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const x = Math.floor(mouseX / BOARD_PIXEL_SIZE * 3);
      const y = Math.floor(mouseY / BOARD_PIXEL_SIZE * 3);
      onCellDblClick(x, y);
    }
    appLocal.canvas.addEventListener('dblclick', handleDblClick as any);
    return () => {
      appLocal.canvas.removeEventListener('dblclick', handleDblClick as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appRef, onCellDblClick, ready]);

  return containerRef;
} 