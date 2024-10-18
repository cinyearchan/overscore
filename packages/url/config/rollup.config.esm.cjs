const getBaseESMConfig = require('../../../config/rollup.base.esm.cjs')
const pkg = require('../package.json')

module.exports = getBaseESMConfig(pkg)
