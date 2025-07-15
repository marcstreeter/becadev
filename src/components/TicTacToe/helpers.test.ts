import { describe, it, expect } from 'vitest';
import { getWinnerInfo, isDraw, canPlaceMark, checkRowWin, checkColWin, checkDiagWin, BOARD_SIZE } from './helpers';

describe('TicTacToe helpers', () => {
  it('detects row win', () => {
    const board = [
      ['X', 'X', 'X'],
      ['', '', ''],
      ['', '', '']
    ];
    expect(checkRowWin(board)).toEqual({ winner: 'X', cells: [[0,0],[0,1],[0,2]] });
    expect(getWinnerInfo(board).winner).toBe('X');
  });

  it('detects column win', () => {
    const board = [
      ['O', '', ''],
      ['O', '', ''],
      ['O', '', '']
    ];
    expect(checkColWin(board)).toEqual({ winner: 'O', cells: [[0,0],[1,0],[2,0]] });
    expect(getWinnerInfo(board).winner).toBe('O');
  });

  it('detects diagonal win (TL-BR)', () => {
    const board = [
      ['X', '', ''],
      ['', 'X', ''],
      ['', '', 'X']
    ];
    expect(checkDiagWin(board)).toEqual({ winner: 'X', cells: [[0,0],[1,1],[2,2]] });
    expect(getWinnerInfo(board).winner).toBe('X');
  });

  it('detects diagonal win (TR-BL)', () => {
    const board = [
      ['', '', 'O'],
      ['', 'O', ''],
      ['O', '', '']
    ];
    expect(checkDiagWin(board)).toEqual({ winner: 'O', cells: [[0,2],[1,1],[2,0]] });
    expect(getWinnerInfo(board).winner).toBe('O');
  });

  it('detects draw', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O']
    ];
    expect(isDraw(board)).toBe(true);
    expect(getWinnerInfo(board).winner).toBe(null);
  });

  it('canPlaceMark returns true for empty cell and no winner/draw', () => {
    const board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    expect(canPlaceMark({ prevBoard: board, x: 1, y: 1, winner: null, draw: false })).toBe(true);
  });

  it('canPlaceMark returns false for filled cell', () => {
    const board = [
      ['', '', ''],
      ['', 'X', ''],
      ['', '', '']
    ];
    expect(canPlaceMark({ prevBoard: board, x: 1, y: 1, winner: null, draw: false })).toBe(false);
  });

  it('canPlaceMark returns false if winner exists', () => {
    const board = [
      ['X', 'X', 'X'],
      ['', '', ''],
      ['', '', '']
    ];
    expect(canPlaceMark({ prevBoard: board, x: 2, y: 0, winner: 'X', draw: false })).toBe(false);
  });

  it('canPlaceMark returns false if draw', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O']
    ];
    expect(canPlaceMark({ prevBoard: board, x: 0, y: 0, winner: null, draw: true })).toBe(false);
  });
}); 