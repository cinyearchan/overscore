const getBaseCommonConfig = require('../../../config/rollup.base.common.cjs')
const pkg = require('../package.json')

module.exports = getBaseCommonConfig(pkg)
