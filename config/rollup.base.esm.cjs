const { getBanner, getRollupConfig, getGlobals } = require('./rollup.base.cjs')
// const pkg = require('../package.json')
const glob = require('glob')

module.exports = function (pkg) {
  const baseConfig = getRollupConfig(pkg.name)
  const globals = getGlobals(pkg.name)
  return [
    {
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
    },
    {
      ...baseConfig,
      input: glob.sync('src/*.js'),
      output: [
        {
          dir: 'dist/es', // 输出目录
          format: 'es',
          banner: getBanner(pkg),
          sourcemap: true,
          exports: 'named',
          entryFileNames: '[name].js', // 保持与源文件同名
          chunkFileNames: '[name].js', // 保持与源文件同名
          assetFileNames: '[name][extname]', // 保持与源文件同名
        },
      ],
      plugins: baseConfig.plugins,
      external: baseConfig.external,
    },
  ]
}
