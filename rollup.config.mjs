import cjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import outputSize, { summarize } from "rollup-plugin-output-size";
import { visualizer } from "rollup-plugin-visualizer";
import pkg from "./package.json" assert { type: "json" };

export default /** @type {import('rollup').RollupOptions} */ ({
  input: "./index.mjs",

  output: [
    {
      file: pkg.exports["."].import,
      format: "es",
      sourcemap: true,
    },
    {
      file: pkg.exports["."].require,
      format: "cjs",
      sourcemap: true,
    },
  ],

  plugins: [
    cjs(),
    nodeResolve(),
    replace({
      values: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        "import.meta.env.NODE_ENV": JSON.stringify("production"),
        "import.meta.vitest": JSON.stringify(false),
      },
      preventAssignment: true,
    }),
    terser({
      compress: {
        passes: 6,
      },
    }),
    outputSize({
      summary(summary) {
        console.log(summarize(summary));
      },
    }),
    visualizer(),
  ],
});
