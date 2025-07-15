import { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

export function usePixiApp(width: number, height: number, backgroundColor: number = 0xffffff) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let destroyed = false;
    const node = containerRef.current;
    if (!node) return;
    const app = new PIXI.Application();
    appRef.current = app;
    (async () => {
      await app.init({
        width,
        height,
        backgroundColor,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      });
      if (destroyed) return;
      node.appendChild(app.canvas);
      app.canvas.style.width = width + 'px';
      app.canvas.style.height = height + 'px';
      app.canvas.style.border = '2px solid red';
      setReady(true);
    })();
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
      setReady(false);
    };
  }, [width, height, backgroundColor]);

  return { containerRef, appRef, ready };
} 