const fs = require('fs')
const path = require('path')
const babel = require('@rollup/plugin-babel')

function getPackageConfigs() {
  const packagesDir = path.join(__dirname, '..', 'packages')
  const packages = fs.readdirSync(packagesDir)

  return packages.reduce((configs, pkg) => {
    const packageJsonPath = path.join(packagesDir, pkg, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      const name = packageJson.name
      if (name.startsWith('@overscore/')) {
        const globalName =
          'Over' +
          name.split('/')[1].charAt(0).toUpperCase() +
          name.split('/')[1].slice(1)
        configs[name] = globalName
      }
    }
    return configs
  }, {})
}

function getBanner(pkg) {
  return `/*!
 * ${pkg.name} ${pkg.version}
 * Licensed under MIT
 */`
}

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
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  })
}

function getGlobals(packageName) {
  const allConfigs = getPackageConfigs()
  const globals = {}

  for (const [name, globalName] of Object.entries(allConfigs)) {
    if (name !== packageName) {
      globals[name] = globalName
    }
  }

  return globals
}

function getRollupConfig(packageName) {
  const globals = getGlobals(packageName)
  const external = Object.keys(globals)

  return {
    external,
    output: {
      globals,
    },
    plugins: [getCompiler()],
  }
}

module.exports = {
  getBanner,
  getCompiler,
  getRollupConfig,
  getPackageConfigs,
  getGlobals,
}
