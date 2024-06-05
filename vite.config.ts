import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "vitest/config";

// https://vitejs.dev/config/

type ViteConfig = UserConfig & { test: InlineConfig };

const config: ViteConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/tests/setup.ts",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },

  optimizeDeps: {
    include: ["apexcharts", "react-apexcharts"],
  },
};

export default defineConfig(config);
