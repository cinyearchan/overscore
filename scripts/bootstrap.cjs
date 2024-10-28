const { execSync } = require('child_process')

try {
  console.log('正在安装所有依赖并链接工作区...')
  execSync('pnpm install', { stdio: 'inherit' })
  console.log('依赖安装完成！')
} catch (error) {
  console.error('安装依赖时发生错误:', error.message)
  process.exit(1)
}
