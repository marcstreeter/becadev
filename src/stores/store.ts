import { create } from "zustand";

export const useSlider = create((set) => ({
  seconds: 0,
  setSeconds: (newSeconds: number) => set(() => ({ seconds: newSeconds })),
}));
