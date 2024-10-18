import { describe, it, expect, vi } from 'vitest'
import {
  isEqual,
  compose,
  functionMiddleware,
  isEqualJSON,
} from '@overscore/equal'

const basicList = [
  { a: undefined, b: undefined, r: true },
  { a: null, b: null, r: true },
  { a: undefined, b: null, r: false },
  { a: 1, b: 1, r: true },
  { a: 1, b: 2, r: false },
  { a: 'aaa', b: 'aaa', r: true },
  { a: 'aaa', b: 'bbb', r: false },
  { a: true, b: true, r: true },
  { a: true, b: false, r: false },
  { a: +0, b: -0, r: false, rj: true },
  { a: /^jsmini$/, b: /^jsmini$/, r: true },
  { a: /^jsmini$/g, b: /^jsmini$/, r: false, rj: true },
  { a: /^jsmini$/, b: /^jsmini/, r: false, rj: true },
]

const pkgList = [
  { a: new Boolean(true), b: new Boolean(true), r: true },
  { a: new Boolean(true), b: new Boolean(false), r: false },
  { a: new Number(1), b: new Number(1), r: true },
  { a: new Number(1), b: new Number(2), r: false },
  { a: new String('1'), b: new String('1'), r: true },
  { a: new String('1'), b: new String('2'), r: false },
  { a: new RegExp('^jsmini$'), b: new RegExp('^jsmini$'), r: true },
  {
    a: new RegExp('^jsmini$', 'g'),
    b: new RegExp('^jsmini'),
    r: false,
    rj: true,
  },
  { a: new RegExp('^jsmini$'), b: new RegExp('^jsmini'), r: false, rj: true },
  { a: new Date(), b: new Date(), r: true },
]

let setList = []
if (typeof Set === 'function') {
  setList = [
    { a: new Set([1, 2]), b: new Set([1, 2]), r: true },
    { a: new Set([1, 2]), b: new Set([1, 3]), r: false, rj: true },
  ]
}

let mapList = []
if (typeof Map === 'function') {
  mapList = [
    {
      a: new Map([
        ['a', '1'],
        ['b', '2'],
      ]),
      b: new Map([
        ['a', '1'],
        ['b', '2'],
      ]),
      r: true,
    },
    {
      a: new Map([
        ['a', '1'],
        ['b', '2'],
      ]),
      b: new Map([
        ['a', '1'],
        ['b', '3'],
      ]),
      r: false,
      rj: true,
    },
  ]
}

const complexList = [
  { a: [1, 2, 3], b: [1, 2, 3], r: true },
  { a: [1, 2, 3], b: [1, 2, 1], r: false },
  { a: [1, [2, [3]]], b: [1, [2, [3]]], r: true },
  { a: { a: 1, b: 2 }, b: { a: 1, b: 2 }, r: true },
  { a: { a: 1, b: 2 }, b: { a: 1, b: 1 }, r: false },
  { a: { a: { b: { c: 1 } } }, b: { a: { b: { c: 1 } } }, r: true },
]

describe('单元测试', () => {
  vi.useFakeTimers()

  describe('isEqual', () => {
    it('normal', () => {
      basicList.forEach((item) => {
        expect(isEqual(item.a, item.b)).toBe(item.r)
      })

      pkgList.forEach((item) => {
        expect(isEqual(item.a, item.b)).toBe(item.r)
      })

      complexList.forEach((item) => {
        expect(isEqual(item.a, item.b)).toBe(item.r)
      })

      if (typeof Set === 'function') {
        setList.forEach((item) => {
          expect(isEqual(item.a, item.b)).toBe(item.r)
        })
      }

      if (typeof Map === 'function') {
        mapList.forEach((item) => {
          expect(isEqual(item.a, item.b)).toBe(item.r)
        })
      }
    })

    it('compare', () => {
      const stubFunction1 = vi.fn()
      const stubFunction2 = vi.fn()

      const a = {
        a: stubFunction1,
      }
      const b = {
        a: stubFunction2,
      }

      expect(isEqual(a, b)).toBe(false)
      expect(
        isEqual(a, b, (o, v, next) => {
          if (typeof o === 'function' && typeof v === 'function') {
            return o.toString() === v.toString()
          }

          return next()
        }),
      ).toBe(true)
    })

    it('functionMiddleware', () => {
      const stubFunction1 = vi.fn()
      const stubFunction2 = vi.fn()
      const a = {
        a: stubFunction1,
      }
      const b = {
        a: stubFunction2,
      }

      expect(isEqual(a, b)).toBe(false)
      expect(isEqual(a, b, functionMiddleware())).toBe(true)
      expect(isEqual(a, b, compose(functionMiddleware()))).toBe(true)
    })
  })

  describe('isEqualJSON', () => {
    it('normal', () => {
      basicList.forEach((item) => {
        expect(isEqualJSON(item.a, item.b)).toBe(item.rj || item.r)
      })

      pkgList.forEach((item) => {
        expect(isEqualJSON(item.a, item.b)).toBe(item.rj || item.r)
      })

      complexList.forEach((item) => {
        expect(isEqualJSON(item.a, item.b)).toBe(item.rj || item.r)
      })

      if (typeof Set === 'function') {
        setList.forEach((item) => {
          expect(isEqualJSON(item.a, item.b)).toBe(item.rj || item.r)
        })
      }

      if (typeof Map === 'function') {
        mapList.forEach((item) => {
          expect(isEqualJSON(item.a, item.b)).toBe(item.rj || item.r)
        })
      }
    })

    it('replacer', () => {
      const a = {
        a: function a() {
          console.log()
        },
      }
      const b = {
        a: function b() {
          console.log()
        },
      }

      expect(isEqualJSON(a, b)).toBe(true)
      expect(
        isEqualJSON(a, b, (k, v) => {
          if (typeof v === 'function') {
            return v.toString()
          }

          return v
        }),
      ).toBe(false)
    })
  })
}, 1000)
