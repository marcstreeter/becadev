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
  console.log('usePixiTicTacToe render');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const gridLayerRef = useRef<PIXI.Container | null>(null);
  const marksLayerRef = useRef<PIXI.Container | null>(null);
  // 2D arrays for persistent X and O graphics
  const xSpritesRef = useRef<PIXI.Graphics[][]>(
    Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
  );
  const oSpritesRef = useRef<PIXI.Graphics[][]>(
    Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
  );
  const pixiReady = useRef(false);

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
    console.log('Pixi Application created');
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
      console.log('Pixi canvas appended');
      app.canvas.style.width = BOARD_PIXEL_SIZE + 'px';
      app.canvas.style.height = BOARD_PIXEL_SIZE + 'px';
      app.canvas.style.border = '2px solid red';

      // Create and add grid layer (static)
      const gridLayer = new PIXI.Container();
      drawGrid(gridLayer);
      gridLayerRef.current = gridLayer;
      app.stage.addChild(gridLayer);

      // Create and add marks layer (dynamic)
      const marksLayer = new PIXI.Container();
      marksLayerRef.current = marksLayer;
      app.stage.addChild(marksLayer);

      // Pre-create all X and O graphics for each cell, add to marksLayer, set invisible
      for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
          // X graphic
          const xG = new PIXI.Graphics();
          xG.setStrokeStyle({ width: 8, color: 0x1976d2 });
          xG.moveTo(x * CELL_SIZE + 20, y * CELL_SIZE + 20)
            .lineTo((x + 1) * CELL_SIZE - 20, (y + 1) * CELL_SIZE - 20)
            .stroke();
          xG.moveTo((x + 1) * CELL_SIZE - 20, y * CELL_SIZE + 20)
            .lineTo(x * CELL_SIZE + 20, (y + 1) * CELL_SIZE - 20)
            .stroke();
          xG.visible = false;
          marksLayer.addChild(xG);
          xSpritesRef.current[y][x] = xG;

          // O graphic
          const oG = new PIXI.Graphics();
          oG.setStrokeStyle({ width: 8, color: 0xd32f2f });
          oG.circle(
            x * CELL_SIZE + CELL_SIZE / 2,
            y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 20
          ).stroke();
          oG.visible = false;
          marksLayer.addChild(oG);
          oSpritesRef.current[y][x] = oG;
        }
      }

      pixiReady.current = true;
      // Initial update
      updateMarksLayer(board, winner, winningCells);

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
      pixiReady.current = false;
      const app = appRef.current;
      if (app && app.canvas) {
        try {
          if (app.canvas.parentNode) {
            app.canvas.parentNode.removeChild(app.canvas);
            console.log('Pixi canvas removed');
          }
          app.destroy(true, { children: true });
          console.log('Pixi Application destroyed');
        } catch (e) {
          // Ignore Pixi destroy errors
        }
        appRef.current = null;
      }
      gridLayerRef.current = null;
      marksLayerRef.current = null;
      xSpritesRef.current = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
      oSpritesRef.current = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pixiReady.current) return;
    updateMarksLayer(board, winner, winningCells);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, winner, winningCells]);

  function updateMarksLayer(
    newBoard: string[][],
    newWinner: string | null,
    newWinningCells: [number, number][]
  ) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const mark = newBoard[y][x];
        const isWinning = newWinner && newWinningCells.some(([wy, wx]) => wy === y && wx === x);
        const xG = xSpritesRef.current[y][x];
        const oG = oSpritesRef.current[y][x];
        if (!xG || !oG) continue;
        if (mark === 'X') {
          xG.visible = true;
          oG.visible = false;
          xG.alpha = isWinning ? 1 : 0.3;
          xG.tint = 0x1976d2;
          console.log(`Cell [${y},${x}] - mark: X, visible: true, alpha: ${xG.alpha}`);
        } else if (mark === 'O') {
          xG.visible = false;
          oG.visible = true;
          oG.alpha = isWinning ? 1 : 0.3;
          oG.tint = 0xd32f2f;
          console.log(`Cell [${y},${x}] - mark: O, visible: true, alpha: ${oG.alpha}`);
        } else {
          xG.visible = false;
          oG.visible = false;
          console.log(`Cell [${y},${x}] - mark: empty, X/O visible: false`);
        }
      }
    }
  }

  return containerRef;
} 