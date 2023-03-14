import autoprefixer from "autoprefixer";
import styles from "rollup-plugin-styles";
import { terser } from "rollup-plugin-terser";

export default {
  input: "source-src/main.js",
  output: {
    dir: "source/rollup",
    format: "iife",
    assetFileNames: "[name][extname]",
  },
  plugins: [
    styles({ mode: "extract", minimize: true, plugins: [autoprefixer()] }),
    terser(),
  ],
};
