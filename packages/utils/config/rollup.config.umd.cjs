const getBaseUMDConfig = require('../../../config/rollup.base.umd.cjs')
const pkg = require('../package.json')

module.exports = getBaseUMDConfig(pkg)
