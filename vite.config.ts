import path from "node:path";
import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig(() => {
  return {
    plugins: [
      ...VitePluginNode({
        adapter: "express",
        appPath: "./src/index.ts",
      }),
    ],
    build: {
      outDir: "./api",
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
});
