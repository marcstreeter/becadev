import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { BOARD_PIXEL_SIZE, BOARD_SIZE, CELL_SIZE, LINE_THICKNESS } from './drawing';
import { drawGrid } from './drawing';

export function usePixiTicTacToe(
  board: string[][],
  winner: string | null,
  winningCells: [number, number][],
  onCellDblClick: (x: number, y: number) => void
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const gridLayerRef = useRef<PIXI.Container | null>(null);
  const marksLayerRef = useRef<PIXI.Container | null>(null);
  // Refs to always have latest winner/board
  const winnerRef = useRef(winner);
  const boardRef = useRef(board);
  useEffect(() => {
    winnerRef.current = winner;
    boardRef.current = board;
  }, [winner, board]);

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

      // Draw grid ONCE
      const gridLayer = new PIXI.Container();
      drawGrid(gridLayer);
      gridLayerRef.current = gridLayer;
      app.stage.addChild(gridLayer);

      // Create marks layer
      const marksLayer = new PIXI.Container();
      marksLayerRef.current = marksLayer;
      app.stage.addChild(marksLayer);

      // Initial draw of marks
      drawMarks(board, marksLayer);

      app.canvas.addEventListener('dblclick', handleDblClick as any);
    })();

    function handleDblClick(event: MouseEvent) {
      // Prevent moves if game is over (use refs for latest state)
      if (winnerRef.current || boardRef.current.flat().every(cell => cell)) return;
      const rect = app.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const x = Math.floor(mouseX / BOARD_PIXEL_SIZE * 3);
      const y = Math.floor(mouseY / BOARD_PIXEL_SIZE * 3);
      onCellDblClick(x, y);
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
      gridLayerRef.current = null;
      marksLayerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const marksLayer = marksLayerRef.current;
    if (!marksLayer) return;
    // Just draw new marks for all non-empty cells (no overlays, no removal)
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const mark = board[y][x];
        if (mark) {
          let color = mark === 'X' ? 0x1976d2 : 0xd32f2f;
          let g = new PIXI.Graphics();
          if (mark === 'X') {
            g.setStrokeStyle({ width: 8, color });
            g.moveTo(x * CELL_SIZE + 20, y * CELL_SIZE + 20)
              .lineTo((x + 1) * CELL_SIZE - 20, (y + 1) * CELL_SIZE - 20)
              .stroke();
            g.moveTo((x + 1) * CELL_SIZE - 20, y * CELL_SIZE + 20)
              .lineTo(x * CELL_SIZE + 20, (y + 1) * CELL_SIZE - 20)
              .stroke();
          } else if (mark === 'O') {
            g.setStrokeStyle({ width: 8, color });
            g.circle(
              x * CELL_SIZE + CELL_SIZE / 2,
              y * CELL_SIZE + CELL_SIZE / 2,
              CELL_SIZE / 2 - 20
            ).stroke();
          }
          marksLayer.addChild(g);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  function drawMarks(board: string[][], marksLayer: PIXI.Container) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const mark = board[y][x];
        if (mark) {
          let color = mark === 'X' ? 0x1976d2 : 0xd32f2f;
          let g = new PIXI.Graphics();
          if (mark === 'X') {
            g.setStrokeStyle({ width: 8, color });
            g.moveTo(x * CELL_SIZE + 20, y * CELL_SIZE + 20)
              .lineTo((x + 1) * CELL_SIZE - 20, (y + 1) * CELL_SIZE - 20)
              .stroke();
            g.moveTo((x + 1) * CELL_SIZE - 20, y * CELL_SIZE + 20)
              .lineTo(x * CELL_SIZE + 20, (y + 1) * CELL_SIZE - 20)
              .stroke();
          } else if (mark === 'O') {
            g.setStrokeStyle({ width: 8, color });
            g.circle(
              x * CELL_SIZE + CELL_SIZE / 2,
              y * CELL_SIZE + CELL_SIZE / 2,
              CELL_SIZE / 2 - 20
            ).stroke();
          }
          marksLayer.addChild(g);
        }
      }
    }
  }

  return containerRef;
} 