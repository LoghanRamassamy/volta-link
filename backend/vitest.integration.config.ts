import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.integration.spec.ts"],
    setupFiles: ["tests/setup-integration.ts"],
    fileParallelism: false, // Run integration tests sequentially to avoid DB locks
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
