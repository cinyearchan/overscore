// vitest.setup.mjs
global.document = {
  createElement: () => ({
    setAttribute: () => {},
    appendChild: () => {},
    onload: null,
    onerror: null,
    readyState: 'complete',
  }),
  head: {
    appendChild: () => {},
  },
  charset: 'utf-8',
  getElementsByTagName: () => [],
}
