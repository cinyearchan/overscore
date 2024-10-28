// const fs = require('fs')
const path = require('path')
const findWorkspacePackages =
  require('@pnpm/find-workspace-packages').findWorkspacePackages

async function listPackages() {
  const packages = await findWorkspacePackages(
    path.join(process.cwd(), 'packages'),
  )

  console.log('已安装的子包:')
  packages.forEach((pkg) => {
    const packageJson = pkg.manifest
    console.log(`${packageJson.name}@${packageJson.version}`)
  })
}

listPackages().catch((error) => {
  console.error('无法列出子包:', error)
})
