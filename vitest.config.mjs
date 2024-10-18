import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // environment: 'overscore',
    coverage: {
      exclude: [
        'commitlint.config.js',
        'config/**',
        'browser-env/**',
        'packages/*/dist/**',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
})
