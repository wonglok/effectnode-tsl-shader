import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts"; // Optional: for generating TypeScript declaration files

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["lib"], tsconfigPath: "./tsconfig.app.json" }),
  ], // Include lib folder for types
  build: {
    lib: {
      // Entry point for the library
      entry: resolve(__dirname, "lib/main.ts"),
      name: "EffectNodeTSLShader",
      // The name of the output files
      fileName: (format) => `effectnode-tsl-shader.${format}.js`,
    },
    rollupOptions: {
      // Externalize dependencies that should not be bundled with the library
      external: ["react", "react-dom", "react/jsx-runtime", "three"],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
        },
      },
    },
  },
});
