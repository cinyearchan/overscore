module.exports = {
  verbose: true,
  transform: {
    '^.+\\.mjs$': 'babel-jest', // 处理 .mjs 文件
    '^.+\\.js$': 'babel-jest', // 处理 .js 文件
  },
  testEnvironment: 'node', // 如果您在 Node.js 环境中运行测试
  moduleFileExtensions: ['js', 'mjs'], // 添加 mjs 扩展名
  testMatch: [
    '**/__tests__/**/*.+(js|jsx|ts|tsx|mjs)',
    '**/?(*.)+(spec|test).+(js|jsx|ts|tsx|mjs)',
  ],
}
