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
    },
    {
      ...baseConfig,
      input: glob.sync('src/*.js'),
      output: [
        {
          ...baseConfig.output,
          // file: 'dist/index.js',
          format: 'cjs',
          // When export and export default are not used at the same time, set legacy to true.
          // legacy: true,
          banner: getBanner(pkg),
          sourcemap: true,
          globals,
          dir: 'dist/cjs', // 输出目录
          entryFileNames: '[name].js', // 保持与源文件同名
          chunkFileNames: '[name].js', // 保持与源文件同名
          assetFileNames: '[name][extname]', // 保持与源文件同名
        },
      ],
    },
  ]
}
