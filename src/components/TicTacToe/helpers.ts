export const BOARD_SIZE = 3;

export function checkRowWin(board: string[][]): { winner: string | null, cells: [number, number][] } {
  for (let y = 0; y < BOARD_SIZE; y++) {
    if (board[y][0] && board[y][0] === board[y][1] && board[y][1] === board[y][2]) {
      return { winner: board[y][0], cells: [[y, 0], [y, 1], [y, 2]] };
    }
  }
  return { winner: null, cells: [] };
}

export function checkColWin(board: string[][]): { winner: string | null, cells: [number, number][] } {
  for (let x = 0; x < BOARD_SIZE; x++) {
    if (board[0][x] && board[0][x] === board[1][x] && board[1][x] === board[2][x]) {
      return { winner: board[0][x], cells: [[0, x], [1, x], [2, x]] };
    }
  }
  return { winner: null, cells: [] };
}

export function checkDiagWin(board: string[][]): { winner: string | null, cells: [number, number][] } {
  // TL-BR
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return { winner: board[0][0], cells: [[0, 0], [1, 1], [2, 2]] };
  }
  // TR-BL
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return { winner: board[0][2], cells: [[0, 2], [1, 1], [2, 0]] };
  }
  return { winner: null, cells: [] };
}

export function getWinnerInfo(board: string[][]): { winner: string | null, cells: [number, number][] } {
  const row = checkRowWin(board);
  if (row.winner) return row;
  const col = checkColWin(board);
  if (col.winner) return col;
  const diag = checkDiagWin(board);
  if (diag.winner) return diag;
  return { winner: null, cells: [] };
}

export function isDraw(board: string[][]): boolean {
  return board.flat().every(cell => cell);
}

export function canPlaceMark({
  prevBoard,
  x,
  y,
  winner,
  draw
}: {
  prevBoard: string[][],
  x: number,
  y: number,
  winner: string | null,
  draw: boolean
}): boolean {
  return (
    !winner &&
    !draw &&
    x >= 0 && x < BOARD_SIZE &&
    y >= 0 && y < BOARD_SIZE &&
    !prevBoard[y][x]
  );
} 