const { getBanner, getRollupConfig, getGlobals } = require('./rollup.base.cjs')
// const pkg = require('../package.json')

module.exports = function (pkg) {
  const baseConfig = getRollupConfig(pkg.name)
  const globals = getGlobals(pkg.name)
  return {
    ...baseConfig,
    input: 'src/index.js',
    output: [
      {
        ...baseConfig.output,
        file: 'dist/index.js',
        format: 'cjs',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: getBanner(pkg),
        sourcemap: true,
        globals,
      },
    ],
  }
}
