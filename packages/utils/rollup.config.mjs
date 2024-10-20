//import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
// import path from 'path'
import fs from 'fs'

const inputDir = 'src' // 输入目录
const outputDir = 'dist' // 输出目录
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

const createConfig = (format) => ({
  input: `${inputDir}/index.js`,
  output: {
    dir: outputDir,
    format,
    sourcemap: true,
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    assetFileNames: '[name][extname]',
    exports: 'named',
    name: packageJson.name,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    //terser(), // 压缩代码
  ],
})

export default [
  createConfig('esm'), // ESM 格式
  createConfig('cjs'), // CommonJS 格式
  createConfig('umd'), // UMD 格式
]
