import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { drawMarks } from '../drawing';

export function usePixiMarks(
  appRef: React.MutableRefObject<PIXI.Application | null>,
  board: string[][],
  winner: string | null,
  winningCells: [number, number][]
) {
  const marksLayerRef = useRef<PIXI.Container | null>(null);

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    // Create marks layer if not present
    let marksLayer = marksLayerRef.current;
    if (!marksLayer) {
      marksLayer = new PIXI.Container();
      marksLayerRef.current = marksLayer;
      app.stage.addChild(marksLayer);
    }
    // Clear previous marks
    marksLayer.removeChildren();
    // Use shared drawMarks function
    drawMarks(marksLayer, board, winner, winningCells);
  }, [appRef, board, winner, winningCells]);

  return marksLayerRef;
} 