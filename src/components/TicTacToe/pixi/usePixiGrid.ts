import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { drawGrid } from '../drawing';

export function usePixiGrid(appRef: React.MutableRefObject<PIXI.Application | null>) {
  const gridLayerRef = useRef<PIXI.Container | null>(null);

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    const gridLayer = new PIXI.Container();
    drawGrid(gridLayer);
    gridLayerRef.current = gridLayer;
    app.stage.addChild(gridLayer);
    return () => {
      if (app && gridLayer) {
        app.stage.removeChild(gridLayer);
      }
      gridLayerRef.current = null;
    };
  }, [appRef]);

  return gridLayerRef;
} 