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
        file: 'dist/index.esm.js',
        format: 'es',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: getBanner(pkg),
        sourcemap: true,
        globals,
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
        // legacy: true,
        banner: getBanner(pkg),
        sourcemap: true,
        globals,
      },
    ],
    plugins: baseConfig.plugins,
    external: baseConfig.external,
  }
}
