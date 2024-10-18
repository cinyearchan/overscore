import { describe, it, expect } from 'vitest'
import { assign, extend, extendDeep } from '@overscore/extend'

describe('单元测试', () => {
  const a = { a: 1 }
  const b = { a: 2, b1: 1, b2: { c1: 1 }, b3: [1] }

  describe('assign', () => {
    it('常规', () => {
      const h = assign({}, a, b)

      expect(h.a).to.equal(b.a)
      expect(h.b1).to.equal(b.b1)
      expect(h.b2).to.equal(b.b2)
    })
  })

  describe('extend', () => {
    it('常规', () => {
      // 缺省参数
      const h = extend({}, a, b)

      expect(h.a).to.equal(b.a)
      expect(h.b1).to.equal(b.b1)
      expect(h.b2).to.equal(b.b2)
    })
  })

  describe('extendDeep', () => {
    it('常规', () => {
      const h = extendDeep({}, a, b)

      expect(h.a).to.equal(b.a)
      expect(h.b1).to.equal(b.b1)

      expect(h.b2).not.to.equal(b.b2)
      expect(h.b2).to.eql(b.b2)
    })
  })
}, 1000)
