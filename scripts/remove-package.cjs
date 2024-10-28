const fs = require('fs')
const path = require('path')

// 获取命令行参数
const packageName = process.argv[2]

if (!packageName) {
  console.error('请提供要移除的包名，例如: node remove-package.js @myorg/utils')
  process.exit(1)
}

// 指定子包目录
const packagesDir = path.join(__dirname, '..', 'packages')

// 读取子包目录
fs.readdir(packagesDir, (err, files) => {
  if (err) {
    console.error('无法读取子包目录:', err)
    process.exit(1)
  }

  const packages = files.filter((file) => {
    const packagePath = path.join(packagesDir, file)
    return (
      fs.statSync(packagePath).isDirectory() &&
      fs.existsSync(path.join(packagePath, 'package.json'))
    )
  })

  packages.forEach((pkg) => {
    const packageJsonPath = path.join(packagesDir, pkg, 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

    // 检查依赖中是否有要移除的包
    if (packageJson.dependencies && packageJson.dependencies[packageName]) {
      delete packageJson.dependencies[packageName] // 移除依赖
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
      console.log(`已从 ${pkg} 移除依赖 ${packageName}`)
    }

    // 检查开发依赖中是否有要移除的包
    if (
      packageJson.devDependencies &&
      packageJson.devDependencies[packageName]
    ) {
      delete packageJson.devDependencies[packageName] // 移除开发依赖
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
      console.log(`已从 ${pkg} 的开发依赖中移除 ${packageName}`)
    }
  })

  console.log('依赖移除完成。')
})
