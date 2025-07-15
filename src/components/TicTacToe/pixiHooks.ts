import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { BOARD_PIXEL_SIZE } from './drawing';
import { drawGrid, drawMarks } from './drawing';

export function usePixiTicTacToe(
  board: string[][],
  winner: string | null,
  winningCells: [number, number][],
  onCellDblClick: (x: number, y: number) => void
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    let destroyed = false;
    const node = containerRef.current;
    if (!node) return;
    const app = new PIXI.Application();
    appRef.current = app;
    (async () => {
      await app.init({
        width: BOARD_PIXEL_SIZE,
        height: BOARD_PIXEL_SIZE,
        backgroundColor: 0xffffff,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      });
      if (destroyed) return;
      node.appendChild(app.canvas);
      app.canvas.style.width = BOARD_PIXEL_SIZE + 'px';
      app.canvas.style.height = BOARD_PIXEL_SIZE + 'px';
      app.canvas.style.border = '2px solid red';
      redraw();
      app.canvas.addEventListener('dblclick', handleDblClick as any);
    })();
    function handleDblClick(event: MouseEvent) {
      const rect = app.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const x = Math.floor(mouseX / BOARD_PIXEL_SIZE * 3);
      const y = Math.floor(mouseY / BOARD_PIXEL_SIZE * 3);
      onCellDblClick(x, y);
    }
    function redraw() {
      app.stage.removeChildren();
      drawGrid(app.stage);
      drawMarks(app.stage, board, winner, winningCells);
    }
    return () => {
      destroyed = true;
      const app = appRef.current;
      if (app && app.canvas) {
        try {
          if (app.canvas.parentNode) {
            app.canvas.parentNode.removeChild(app.canvas);
          }
          app.destroy(true, { children: true });
        } catch (e) {
          // Ignore Pixi destroy errors
        }
        appRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    app.stage.removeChildren();
    drawGrid(app.stage);
    drawMarks(app.stage, board, winner, winningCells);
  }, [board, winner, winningCells]);

  return containerRef;
} 