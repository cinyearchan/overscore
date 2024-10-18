export default {
  name: 'custom overscore',
  setup(global) {
    console.log('vitest - env - overscore')
    global.localStorage = {
      getItem() {},
      setItem() {},
    }

    return {
      teardown() {
        // called after all tests with this env have been run
      },
    }
  },
}
