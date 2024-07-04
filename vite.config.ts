import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { codecovVitePlugin } from "@codecov/vite-plugin";
import "vitest/config";

// https://vitejs.dev/config/

type ViteConfig = UserConfig & { test: InlineConfig };

const config: ViteConfig = {
  plugins: [
    react(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: "codecov-superpoool-v3",
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  server: {
    port: 3004,
  },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      reporter: ["json", "html"],
    },
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
