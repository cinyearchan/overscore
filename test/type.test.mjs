// test/type.test.mjs
import { describe, it, expect, vi } from 'vitest'
import { type } from '@overscore/utils/type'

describe('单元测试', () => {
  // vi.setTimeout(1000)
  vi.useFakeTimers()

  const baseList = [
    { a: undefined, b: 'undefined' },
    { a: null, b: 'null' },
    { a: 1, b: 'number' },
    { a: 1.1, b: 'number' },
    { a: Math.pow(2, 64), b: 'number' },
    { a: Number(1), b: 'number' },
    { a: new Number(1), b: 'Number' },
    { a: true, b: 'boolean' },
    { a: false, b: 'boolean' },
    { a: Boolean(true), b: 'boolean' },
    { a: new Boolean(true), b: 'Boolean' },
    { a: '123', b: 'string' },
    { a: String(123), b: 'string' },
    { a: new String(123), b: 'String' },
    { a: Symbol(), b: 'symbol' },
  ]

  function B() {}
  B.prototype.constructor = null

  const refList = [
    { a: [], b: 'array' },
    { a: Array(1), b: 'array' },
    { a: new Array(1), b: 'array' },
    { a: {}, b: 'object' },
    { a: Object({}), b: 'object' },
    { a: new Object(), b: 'object' },
    { a: Object.create({}), b: 'object' },
    { a: Object.create(null), b: 'object' },
    { a: new Set(), b: 'set' },
    { a: new WeakSet(), b: 'weakset' },
    { a: new Map(), b: 'map' },
    { a: new WeakMap(), b: 'weakmap' },
    { a: function () {}, b: 'function' },
    { a: () => {}, b: 'function' },
    { a: new Function(), b: 'function' },
    { a: class A {}, b: 'function' },
    { a: new (class A {})(), b: 'A' },
    { a: /1/, b: 'regexp' },
    { a: new RegExp(), b: 'regexp' },
    { a: new Date(), b: 'date' },
    { a: Math, b: 'math' },
    { a: new Promise(function () {}), b: 'promise' },
    { a: new B(), b: 'unknown' },
  ]

  describe('非严格模式', () => {
    it('基本类型', () => {
      for (let i = 0; i < baseList.length; i++) {
        const a = baseList[i].a
        const b = baseList[i].b
        expect(type(a)).toBe(b.toLowerCase())
      }
    })

    it('复杂类型', () => {
      for (let i = 0; i < refList.length; i++) {
        const a = refList[i].a
        const b = refList[i].b
        expect(type(a)).toBe(b)
      }
    })
  })

  describe('严格模式', () => {
    it('基本类型', () => {
      for (let i = 0; i < baseList.length; i++) {
        const a = baseList[i].a
        const b = baseList[i].b
        expect(type(a, true)).toBe(b)
      }

      expect(type(NaN, true)).toBe('nan')
    })

    it('复杂类型', () => {
      for (let i = 0; i < refList.length; i++) {
        const a = refList[i].a
        const b = refList[i].b
        expect(type(a, true)).toBe(b)
      }

      expect(type(new Number(NaN), true)).toBe('NaN')
    })
  })
}, 1000)
