import { useEffect } from 'react';
import * as PIXI from 'pixi.js';

export function usePixiDblClick(
  appRef: React.MutableRefObject<PIXI.Application | null>,
  ready: boolean,
  winnerRef: React.MutableRefObject<string | null>,
  boardRef: React.MutableRefObject<string[][]>,
  onCellDblClick: (x: number, y: number) => void,
  boardPixelSize: number
) {
  useEffect(() => {
    if (!ready) return;
    const appLocal = appRef.current;
    if (!appLocal) return;
    function handleDblClick(event: MouseEvent) {
      if (winnerRef.current || boardRef.current.flat().every(cell => cell)) return;
      const rect = appLocal.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const x = Math.floor(mouseX / boardPixelSize * 3);
      const y = Math.floor(mouseY / boardPixelSize * 3);
      onCellDblClick(x, y);
    }
    appLocal.canvas.addEventListener('dblclick', handleDblClick as any);
    return () => {
      appLocal.canvas.removeEventListener('dblclick', handleDblClick as any);
    };
  }, [appRef, onCellDblClick, ready, winnerRef, boardRef, boardPixelSize]);
} 