import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

const BOARD_SIZE = 3;
const CELL_SIZE = 100;
const LINE_THICKNESS = 12; // Thicker for visibility
const BOARD_PIXEL_SIZE = CELL_SIZE * BOARD_SIZE;

// Returns {winner, cells} where cells is an array of [y, x] for the winning streak
function getWinnerInfo(board: string[][]): { winner: string | null, cells: [number, number][] } {
  // Rows
  for (let y = 0; y < BOARD_SIZE; y++) {
    if (
      board[y][0] &&
      board[y][0] === board[y][1] &&
      board[y][1] === board[y][2]
    ) {
      return { winner: board[y][0], cells: [[y, 0], [y, 1], [y, 2]] };
    }
  }
  // Columns
  for (let x = 0; x < BOARD_SIZE; x++) {
    if (
      board[0][x] &&
      board[0][x] === board[1][x] &&
      board[1][x] === board[2][x]
    ) {
      return { winner: board[0][x], cells: [[0, x], [1, x], [2, x]] };
    }
  }
  // Diagonal TL-BR
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return { winner: board[0][0], cells: [[0, 0], [1, 1], [2, 2]] };
  }
  // Diagonal TR-BL
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return { winner: board[0][2], cells: [[0, 2], [1, 1], [2, 0]] };
  }
  return { winner: null, cells: [] };
}

const TicTacToe: React.FC = () => {
  const appRef = useRef<PIXI.Application | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [board, setBoard] = useState<string[][]>(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill('')));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);

  // Draw the board and pieces
  const drawBoard = () => {
    const app = appRef.current;
    if (!app) return;
    app.stage.removeChildren();
    // Draw grid lines
    for (let i = 1; i < BOARD_SIZE; i++) {
      const lineH = new PIXI.Graphics();
      lineH.setStrokeStyle({
        width: LINE_THICKNESS,
        color: 0x0074D9, // Bright blue
      });
      lineH.moveTo(0, i * CELL_SIZE)
        .lineTo(BOARD_PIXEL_SIZE, i * CELL_SIZE)
        .stroke();
      app.stage.addChild(lineH);
      const lineV = new PIXI.Graphics();
      lineV.setStrokeStyle({
        width: LINE_THICKNESS,
        color: 0x0074D9, // Bright blue
      });
      lineV.moveTo(i * CELL_SIZE, 0)
        .lineTo(i * CELL_SIZE, BOARD_PIXEL_SIZE)
        .stroke();
      app.stage.addChild(lineV);
    }
    // Draw X and O
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const mark = board[y][x];
        if (!mark) continue;
        let color = mark === 'X' ? 0x1976d2 : 0xd32f2f;
        if (winner && !winningCells.some(([wy, wx]) => wy === y && wx === x)) {
          color = 0x888888; // Gray for non-winning
        }
        if (mark === 'X') {
          const xMark = new PIXI.Graphics();
          xMark.setStrokeStyle({ width: 8, color });
          xMark.moveTo(x * CELL_SIZE + 20, y * CELL_SIZE + 20)
            .lineTo((x + 1) * CELL_SIZE - 20, (y + 1) * CELL_SIZE - 20)
            .stroke();
          xMark.moveTo((x + 1) * CELL_SIZE - 20, y * CELL_SIZE + 20)
            .lineTo(x * CELL_SIZE + 20, (y + 1) * CELL_SIZE - 20)
            .stroke();
          app.stage.addChild(xMark);
        } else if (mark === 'O') {
          const oMark = new PIXI.Graphics();
          oMark.setStrokeStyle({ width: 8, color });
          oMark.circle(
            x * CELL_SIZE + CELL_SIZE / 2,
            y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 20
          ).stroke();
          app.stage.addChild(oMark);
        }
      }
    }
  };

  // Redraw board on board/currentPlayer/winner change
  useEffect(() => {
    drawBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, currentPlayer, winner, winningCells]);

  // Check for winner or draw after every move
  useEffect(() => {
    const { winner: win, cells } = getWinnerInfo(board);
    if (win) {
      setWinner(win);
      setWinningCells(cells);
      setIsDraw(false);
    } else if (board.flat().every(cell => cell)) {
      setWinner(null);
      setWinningCells([]);
      setIsDraw(true);
    } else {
      setWinner(null);
      setWinningCells([]);
      setIsDraw(false);
    }
  }, [board]);

  // Pixi app setup and double-click handling
  useEffect(() => {
    let destroyed = false;
    const node = containerRef.current;
    if (!node) {
      console.log('Pixi container div not found');
      return;
    }
    const app = new PIXI.Application();
    appRef.current = app;
    (async () => {
      try {
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
        app.canvas.style.border = '2px solid red'; // Add border to canvas
        drawBoard();
        // Double-click handler
        const onDblClick = (event: MouseEvent) => {
          const rect = app.canvas.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;
          const x = Math.floor(mouseX / CELL_SIZE);
          const y = Math.floor(mouseY / CELL_SIZE);
          setBoard(prevBoard => {
            if (
              !winner &&
              !isDraw &&
              x >= 0 && x < BOARD_SIZE &&
              y >= 0 && y < BOARD_SIZE &&
              !prevBoard[y][x]
            ) {
              const newBoard = prevBoard.map(row => [...row]);
              newBoard[y][x] = currentPlayer;
              setCurrentPlayer(cp => (cp === 'X' ? 'O' : 'X'));
              return newBoard;
            }
            return prevBoard;
          });
        };
        app.canvas.addEventListener('dblclick', onDblClick as any);
      } catch (err) {
        console.error('PixiJS failed to initialize:', err);
      }
    })();
    return () => {
      destroyed = true;
      const app = appRef.current;
      if (app) {
        try {
          if (app.canvas && app.canvas.parentNode) {
            app.canvas.parentNode.removeChild(app.canvas);
          }
          app.destroy(true, { children: true });
        } catch (e) {
          console.warn('Pixi destroy error (ignored):', e);
        }
        appRef.current = null;
        console.log('Pixi app destroyed');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, winner, isDraw]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Tic Tac Toe (Pixi.js + React)</h2>
      <div
        ref={containerRef}
        style={{
          margin: '0 auto',
          width: BOARD_PIXEL_SIZE,
          height: BOARD_PIXEL_SIZE
        }}
      />
      <div style={{ marginTop: 16 }}>
        {winner ? (
          <strong>Winner: {winner}</strong>
        ) : isDraw ? (
          <strong>It's a draw!</strong>
        ) : (
          <span>Current Player: {currentPlayer}</span>
        )}
      </div>
    </div>
  );
};

export default TicTacToe; 