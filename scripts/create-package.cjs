const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
// const findWorkspacePackages = require('@pnpm/find-workspace-packages')

const packageName = process.argv[2]

if (!packageName) {
  console.error('请提供包名，例如: node create-package.js @package/pack')
  process.exit(1)
}

// 解析包名
const packageDirName = packageName.split('/')[1] // 获取包的名称
const packagePath = path.join(__dirname, '..', 'packages', packageDirName) // 文件夹名为 pack

if (fs.existsSync(packagePath)) {
  console.error(`包 ${packageName} 已经存在！`)
  process.exit(1)
}

// 创建目录
fs.mkdirSync(packagePath, { recursive: true })

// 创建 package.json 文件
const packageJson = {
  name: packageName,
  version: '1.0.0',
  main: 'index.js',
  scripts: {
    build: 'echo "Building..."',
    test: 'echo "Testing..."',
  },
}

fs.writeFileSync(
  path.join(packagePath, 'package.json'),
  JSON.stringify(packageJson, null, 2),
)

// 创建示例文件
fs.writeFileSync(path.join(packagePath, 'index.js'), '// 这里是入口文件')

// 更新根项目的 package.json，将新包添加为开发依赖
const rootPackageJsonPath = path.join(__dirname, '..', 'package.json')
const rootPackageJson = JSON.parse(
  fs.readFileSync(rootPackageJsonPath, 'utf-8'),
)

// 添加新包到 devDependencies
if (!rootPackageJson.devDependencies) {
  rootPackageJson.devDependencies = {}
}
rootPackageJson.devDependencies[packageName] = 'workspace:^'

// 写回根项目的 package.json
fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2))

// 安装依赖
console.log(`成功创建包 ${packageName} 在 ${packagePath}`)
console.log(`将 ${packageName} 添加到根项目的 devDependencies`)

// 运行安装命令
execSync('pnpm install', { stdio: 'inherit' })
console.log('依赖已更新并安装完毕')
