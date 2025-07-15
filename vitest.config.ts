import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      '**/*.{test,spec}.{ts,tsx,js,jsx}',
    ],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
}); 