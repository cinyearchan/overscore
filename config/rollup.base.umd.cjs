const nodeResolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const terser = require('@rollup/plugin-terser')
const {
  getBanner,
  getRollupConfig,
  getGlobals,
  getPackageConfigs,
} = require('./rollup.base.cjs')
// const pkg = require('../package.json')

module.exports = function (pkg) {
  const baseConfig = getRollupConfig(pkg.name)
  const globals = getGlobals(pkg.name)
  const name = getPackageConfigs()[pkg.name]

  return {
    ...baseConfig,
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        name,
        banner: getBanner(pkg),
        globals,
      },
      {
        file: 'dist/index.umd.min.js',
        format: 'umd',
        // legacy: true,
        name,
        banner: getBanner(pkg),
        plugins: [terser()],
        globals,
      },
    ],
    plugins: [nodeResolve(), commonjs(), ...baseConfig.plugins],
  }
}
