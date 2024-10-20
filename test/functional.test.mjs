import { describe, it, expect, vi } from 'vitest'
import {
  pipe,
  compose,
  curry,
  curryRight,
  debounce,
  throttle,
} from '@overscore/utils/functional'

describe('单元测试', () => {
  vi.useFakeTimers()

  describe('pipe', () => {
    it('normal', () => {
      function a(x) {
        return x + 10
      }
      function b(x) {
        return x * 10
      }
      expect(pipe(a, b)(1)).toBe(110)
      expect(pipe(a, b)(10)).toBe(200)
      expect(pipe(b, a)(1)).toBe(20)
      expect(pipe(b, a)(10)).toBe(110)
    })
  })

  describe('compose', () => {
    it('normal', () => {
      function a(x) {
        return x + 10
      }
      function b(x) {
        return x * 10
      }
      expect(compose(a, b)(1)).toBe(20)
      expect(compose(a, b)(10)).toBe(110)
      expect(compose(b, a)(1)).toBe(110)
      expect(compose(b, a)(10)).toBe(200)
    })
  })

  describe('curry', () => {
    it('error', () => {
      expect(() => {
        curry(1)
      }).toThrow('curry first param must be a function')
      expect(() => {
        curry(function () {}, 'ggg')
      }).toThrow('curry second param must be a number')
    })

    it('normal', () => {
      function f(a, b, c) {
        return a + b + c
      }

      const cf1 = curry(f)
      const cf2 = curry(f)

      expect(cf1(1, 2, 3)).toBe(6)
      expect(cf1(1, 2, 4)).toBe(7)
      expect(cf1(1, 2)(5)).toBe(8)
      expect(cf1(1)(2, 6)).toBe(9)
      expect(cf1(1)(3)(5)).toBe(9)

      expect(cf2(1)(2)(3)).toBe(6)
    })

    it('len', () => {
      function f(a, b, c) {
        return a + b + c
      }

      const cf1 = curry(f, 4)

      expect(cf1(1, 2, 3)(4)).toBe(6)
    })
  })

  describe('curryRight', () => {
    it('error', () => {
      expect(() => {
        curryRight(1)
      }).toThrow('curryRight first param must be a function')
      expect(() => {
        curryRight(function () {}, 'ggg')
      }).toThrow('curryRight second param must be a number')
    })

    it('normal', () => {
      function f(a, b, c) {
        return a + b + c
      }

      const cf1 = curryRight(f)
      const cf2 = curryRight(f)

      expect(cf1(1, 2, 3)).toBe(6)
      expect(cf1(1, 2, 4)).toBe(7)
      expect(cf1(1, 2)(5)).toBe(8)
      expect(cf1(1)(2, 6)).toBe(9)
      expect(cf1(1)(3)(5)).toBe(9)

      expect(cf2(1)(2)(3)).toBe(6)
    })

    it('len', () => {
      function f(a, b, c) {
        return a + b + c
      }

      const cf1 = curryRight(f, 4)

      expect(cf1(1, 2, 3)(4)).toBe(7)
    })
  })

  describe('debounce', () => {
    it('error', () => {
      expect(() => {
        debounce(1)
      }).toThrow('debounce first param must be a function')
      expect(() => {
        debounce(function () {}, 'ggg')
      }).toThrow('debounce second param must be a number')
    })

    it('normal', (done) => {
      let a = 1
      function f() {
        return a++
      }

      const df = debounce(f, 100)

      df()
      df()
      df()
      expect(a).toBe(1)

      setTimeout(() => {
        df()
        df()
        df()
        expect(a).toBe(2)

        setTimeout(() => {
          expect(a).toBe(3)
          done()
        }, 100)
      }, 100)
    })
  })

  describe('throttle', () => {
    it('error', () => {
      expect(() => {
        throttle(1)
      }).toThrow('throttle first param must be a function')
      expect(() => {
        throttle(function () {}, 'ggg')
      }).toThrow('throttle second param must be a number')
    })

    it('normal', (done) => {
      let a = 1
      function f() {
        return a++
      }

      const tf = throttle(f, 400)

      const tid = setInterval(() => {
        tf()
      }, 200)

      tf()

      expect(a).toBe(2)

      setTimeout(() => {
        expect(a).toBe(3)
      }, 600)
      setTimeout(() => {
        expect(a).toBe(4)
      }, 1000)
      setTimeout(() => {
        expect(a).toBe(5)
      }, 1400)
      setTimeout(() => {
        clearInterval(tid)
        expect(a).toBe(6)
        done()
      }, 1800)
    })
  })
}, 5000)
