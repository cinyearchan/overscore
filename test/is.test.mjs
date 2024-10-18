import { describe, it, expect } from 'vitest'
import * as is from '@overscore/is'

describe('单元测试', function () {
  describe('功能', function () {
    it('相等', function () {
      expect(is.isBoolean(true)).to.equal(true)
      expect(is.isString('')).to.equal(true)
      expect(is.isNull(null)).to.equal(true)
      expect(is.isUndefined()).to.equal(true)

      expect(is.isObject({})).to.equal(true)
      expect(is.isObject(Object.create(null))).to.equal(true)
      expect(is.isObject(Object.create({}))).to.equal(true)

      expect(is.isArray([])).to.equal(true)
      expect(is.isFunction(function () {})).to.equal(true)
    })

    it('isInRange', function () {
      expect(is.isInRange(1)).to.equal(true)
      expect(is.isInRange('abc')).to.equal(false)

      expect(is.isInRange(1, 1)).to.equal(true)
      expect(is.isInRange(1, 2)).to.equal(false)

      expect(is.isInRange(1, undefined, 1)).to.equal(true)
      expect(is.isInRange(1, 0, 2)).to.equal(true)
      expect(is.isInRange(1, 0, 0)).to.equal(false)
    })

    it('isNumber', function () {
      expect(is.isNumber(1)).to.equal(true)
      expect(is.isNumber(1.1)).to.equal(true)
      expect(is.isNumber(1, 0, 10)).to.equal(true)
      expect(is.isNumber(1, 1, 1)).to.equal(true)
      expect(is.isNumber(1, 2)).to.equal(false)
      expect(is.isNumber(1, -1, 0)).to.equal(false)
    })

    it('isInteger', function () {
      expect(is.isInteger(1)).to.equal(true)
      expect(is.isInteger(1.1)).to.equal(false)
      expect(is.isInteger(1, 0, 10)).to.equal(true)
      expect(is.isInteger(1, 1, 1)).to.equal(true)
      expect(is.isInteger(1, 2)).to.equal(false)
      expect(is.isInteger(1, -1, 0)).to.equal(false)
    })

    it('isInt', function () {
      expect(is.isInt(1)).to.equal(true)
      expect(is.isInt(-2147483648)).to.equal(true)
      expect(is.isInt(-2147483649)).to.equal(false)
      expect(is.isInt(2147483647)).to.equal(true)
      expect(is.isInt(2147483648)).to.equal(false)
    })

    it('isEmptyString', function () {
      expect(is.isEmptyString(123)).to.equal(false)
      expect(is.isEmptyString('')).to.equal(true)
      expect(is.isEmptyString(' ')).to.equal(true)
      expect(is.isEmptyString('   ')).to.equal(true)
      expect(
        is.isEmptyString(`
            `),
      ).to.equal(true)
      expect(is.isEmptyString(' a ')).to.equal(false)
    })

    it('should use Array.isArray when available', () => {
      // 确保原生的 Array.isArray 可用
      expect(is.isArray([])).toBe(true)
      expect(is.isArray({})).toBe(false)
    })

    it('should fallback to custom isArray function when Array.isArray is not available', () => {
      // 保存原生的 Array.isArray
      const originalIsArray = Array.isArray

      // 将 Array.isArray 设置为 undefined
      Object.defineProperty(Array, 'isArray', { value: undefined })

      // 测试自定义的 isArray 函数
      expect(is.isArray([])).toBe(true)
      expect(is.isArray({})).toBe(false)

      // 恢复原生的 Array.isArray
      Object.defineProperty(Array, 'isArray', { value: originalIsArray })
    })
  })
}, 1000)
