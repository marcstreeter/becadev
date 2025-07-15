import { describe, it, expect, vi } from 'vitest';
import { drawGrid, drawMarks, drawMark, BOARD_SIZE, CELL_SIZE, BOARD_PIXEL_SIZE } from './drawing';

vi.mock('pixi.js', () => {
  class MockGraphics {
    calls: any[][] = [];
    setStrokeStyle(opts: any) { this.calls.push(['setStrokeStyle', opts]); return this; }
    moveTo(x: any, y: any) { this.calls.push(['moveTo', x, y]); return this; }
    lineTo(x: any, y: any) { this.calls.push(['lineTo', x, y]); return this; }
    stroke() { this.calls.push(['stroke']); return this; }
    circle(x: any, y: any, r: any) { this.calls.push(['circle', x, y, r]); return this; }
    addChild() { this.calls.push(['addChild']); return this; }
  }
  class MockContainer {
    children: any[] = [];
    addChild(child: any) { this.children.push(child); }
    removeChild(child: any) { this.children = this.children.filter(c => c !== child); }
    removeChildren() { this.children = []; }
  }
  return {
    Graphics: MockGraphics,
    Container: MockContainer,
  };
});

import { Graphics as MockGraphics, Container as MockContainer } from 'pixi.js';

describe('drawing.ts', () => {
  it('drawGrid adds correct number of lines', () => {
    const stage = new MockContainer();
    drawGrid(stage as any);
    // For 3x3: 2 horizontal + 2 vertical lines
    expect(stage.children.length).toBe(4);
    for (const line of stage.children) {
      expect(line as any).toBeInstanceOf(MockGraphics);
    }
  });

  it('drawMark draws X with correct color', () => {
    const marksLayer = new MockContainer();
    drawMark('X', 1, 2, marksLayer as any, 0x123456);
    expect(marksLayer.children.length).toBe(1);
    const g = marksLayer.children[0] as any;
    expect(g.calls.some(([name, opts]: any[]) => name === 'setStrokeStyle' && opts.color === 0x123456)).toBe(true);
  });

  it('drawMark draws O with default color', () => {
    const marksLayer = new MockContainer();
    drawMark('O', 0, 0, marksLayer as any);
    expect(marksLayer.children.length).toBe(1);
    const g = marksLayer.children[0] as any;
    expect(g.calls.some(([name, opts]: any[]) => name === 'setStrokeStyle' && opts.color === 0xd32f2f)).toBe(true);
  });

  it('drawMarks draws all marks and applies gray-out for non-winners', () => {
    const stage = new MockContainer();
    const board = [
      ['X', '', 'O'],
      ['', 'O', ''],
      ['X', '', 'O'],
    ];
    const winner = 'O';
    const winningCells = [ [0,2], [1,1], [2,2] ] as [number, number][];
    drawMarks(stage as any, board, winner, winningCells);
    // Should add 5 marks
    expect(stage.children.length).toBe(5);
    // Check each mark's color based on its position and winner logic
    const expectedMarks = [
      { x: 0, y: 0, mark: 'X', color: 0x888888 },
      { x: 2, y: 0, mark: 'O', color: 0xd32f2f }, // winner
      { x: 1, y: 1, mark: 'O', color: 0xd32f2f }, // winner
      { x: 0, y: 2, mark: 'X', color: 0x888888 },
      { x: 2, y: 2, mark: 'O', color: 0xd32f2f }, // winner
    ];
    // For each expected mark, find a matching graphic and check color
    for (const { x, y, mark, color } of expectedMarks) {
      // Find a graphic that matches the mark type and position
      const g = stage.children.find((g: any) => {
        if (mark === 'X') {
          // X marks: look for two moveTo/lineTo pairs
          return g.calls.some(([name, opts]: any[]) => name === 'setStrokeStyle' && opts.color === color) &&
            g.calls.filter(([name]: any[]) => name === 'moveTo').length === 2;
        } else if (mark === 'O') {
          // O marks: look for a circle call
          return g.calls.some(([name, opts]: any[]) => name === 'setStrokeStyle' && opts.color === color) &&
            g.calls.some(([name]: any[]) => name === 'circle');
        }
        return false;
      });
      expect(g, `Expected to find ${mark} at (${x},${y}) with color ${color.toString(16)}`).toBeTruthy();
    }
  });
}); 