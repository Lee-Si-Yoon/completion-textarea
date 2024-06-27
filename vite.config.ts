import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ['test/**/*.spec.ts'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['stories/**/*'],
      provider: 'v8',
    },
  },
});
