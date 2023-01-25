import { defineConfig } from "vite";
import * as path from "node:path";
import package_ from "./package.json";

export default defineConfig({
  build: {
    sourcemap: true,
    target: "esnext",
    lib: {
      entry: path.resolve("./src/index.js"),
      name: "Shareon",
      formats: ["es", "umd", "iife"],
      // Workaround to keep the old file names
      fileName: (format, _) => `shareon.${format}.js`,
    },
    rollupOptions: {
      output: {
        // Workaround for a correct file name
        // See: https://github.com/vitejs/vite/issues/4863
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "shareon.min.css";
          return assetInfo.name;
        },
        banner: `/*! ${package_.name} v${package_.version} */`,
      },
    },
  },
});
