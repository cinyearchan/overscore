var babel = require('@rollup/plugin-babel')

var pkg = require('../package.json')

var version = pkg.version

var banner = `/*!
 * ${pkg.name} ${version}
 * Licensed under MIT (https://github.com/jsmini/isequal/blob/master/LICENSE)
 */
`

function getCompiler() {
  return babel({
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers:
              'last 2 versions, > 1%, ie >= 11, Android >= 4.1, iOS >= 10.3',
            node: '14',
          },
          modules: false,
          loose: false,
        },
      ],
    ],
    plugins: [
      // [
      //   '@babel/plugin-transform-runtime',
      //   {
      //     corejs: 3,
      //     versions: '^7.22.15',
      //     helpers: true,
      //     regenerator: false,
      //   },
      // ],
    ],
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  })
}

exports.name = 'OverFunctional'
exports.banner = banner
exports.getCompiler = getCompiler
exports.external = ['@overscore/type']
exports.globals = {
  '@overscore/type': 'OverType',
}
