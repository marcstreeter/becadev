import * as PIXI from 'pixi.js';
import { BOARD_SIZE } from './helpers';
export { BOARD_SIZE };

export const CELL_SIZE = 100;
export const LINE_THICKNESS = 12;
export const BOARD_PIXEL_SIZE = CELL_SIZE * BOARD_SIZE;

export function drawGrid(stage: PIXI.Container) {
  for (let i = 1; i < BOARD_SIZE; i++) {
    const lineH = new PIXI.Graphics();
    lineH.setStrokeStyle({ width: LINE_THICKNESS, color: 0x0074D9 });
    lineH.moveTo(0, i * CELL_SIZE).lineTo(BOARD_PIXEL_SIZE, i * CELL_SIZE).stroke();
    stage.addChild(lineH);
    const lineV = new PIXI.Graphics();
    lineV.setStrokeStyle({ width: LINE_THICKNESS, color: 0x0074D9 });
    lineV.moveTo(i * CELL_SIZE, 0).lineTo(i * CELL_SIZE, BOARD_PIXEL_SIZE).stroke();
    stage.addChild(lineV);
  }
}

export function drawMarks(stage: PIXI.Container, board: string[][], winner: string | null, winningCells: [number, number][]) {
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const mark = board[y][x];
      if (!mark) continue;
      let color = mark === 'X' ? 0x1976d2 : 0xd32f2f;
      if (winner && !winningCells.some(([wy, wx]) => wy === y && wx === x)) {
        color = 0x888888;
      }
      drawMark(mark, x, y, stage, color);
    }
  }
}

export function drawMark(mark: string, x: number, y: number, marksLayer: PIXI.Container, color?: number) {
  if (!mark) return;
  let finalColor = color !== undefined ? color : (mark === 'X' ? 0x1976d2 : 0xd32f2f);
  let g = new PIXI.Graphics();
  if (mark === 'X') {
    g.setStrokeStyle({ width: 8, color: finalColor });
    g.moveTo(x * CELL_SIZE + 20, y * CELL_SIZE + 20)
      .lineTo((x + 1) * CELL_SIZE - 20, (y + 1) * CELL_SIZE - 20)
      .stroke();
    g.moveTo((x + 1) * CELL_SIZE - 20, y * CELL_SIZE + 20)
      .lineTo(x * CELL_SIZE + 20, (y + 1) * CELL_SIZE - 20)
      .stroke();
  } else if (mark === 'O') {
    g.setStrokeStyle({ width: 8, color: finalColor });
    g.circle(
      x * CELL_SIZE + CELL_SIZE / 2,
      y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 20
    ).stroke();
  }
  marksLayer.addChild(g);
} 