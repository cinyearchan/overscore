import { describe, it, expect } from 'vitest'
import { clone, cloneJSON, cloneLoop, cloneForce } from '@overscore/clone'

describe('单元测试', () => {
  // 简单值
  const simpleList = [{ a: 1 }, { a: 'abc' }, { a: true }, { a: null }]

  // 正常cases
  const normalList = [
    { a: [] },
    { a: [1, 2, 3] },
    { a: [1, [2, [3]]] },
    { a: {} },
    { a: { a: 1, b: 2, c: 3 } },
    { a: { a1: 1, a2: { b1: 1, b2: { c1: 1, c2: 2 } } } },
    { a: { a1: 1, a2: [1, { b1: 1, b2: [{ c1: 1, c2: 2 }] }] } },
  ]

  // 父子循环引用
  const a = [1, 2, 3]
  a.push(a)

  const b = { a1: 1, a2: 2, a3: 3 }
  b.a4 = b
  const singleRefList = [{ a: a }, { a: b }, { a: b }]

  // 多层级循环引用
  const c = [1, [2]]
  c[1].push(c)

  const d = { a1: 1, a2: { b1: 1 } }
  d.a2.b2 = d
  const complexRefList = [{ a: c }, { a: d }, { a: d }]

  describe('clone', () => {
    it('常规', () => {
      for (let i = 0; i < simpleList.length; i++) {
        // 确保全等
        expect(clone(simpleList[i].a)).toBe(simpleList[i].a)
      }

      for (let i = 0; i < normalList.length; i++) {
        const temp = clone(normalList[i].a)

        // 确保不全等
        expect(temp).not.toBe(normalList[i].a)
        // 确保内容一样
        expect(temp).toEqual(normalList[i].a)
      }
    })

    it('简单循环引用', () => {
      const temp = clone(singleRefList[0].a)
      expect(temp).toBe(temp[3])

      const temp2 = clone(singleRefList[1].a)
      expect(temp2).toBe(temp2['a4'])
    })
  })

  describe('cloneJSON', () => {
    it('常规', () => {
      for (let i = 0; i < simpleList.length; i++) {
        // 确保全等
        expect(cloneJSON(simpleList[i].a)).toBe(simpleList[i].a)
      }

      for (let i = 0; i < normalList.length; i++) {
        const temp = cloneJSON(normalList[i].a)

        // 确保不全等
        expect(temp).not.toBe(normalList[i].a)
        // 确保内容一样
        expect(temp).toEqual(normalList[i].a)
      }
    })
  })

  describe('cloneLoop', () => {
    it('常规', () => {
      for (let i = 0; i < simpleList.length; i++) {
        // 确保全等
        expect(cloneLoop(simpleList[i].a)).toBe(simpleList[i].a)
      }

      for (let i = 0; i < normalList.length; i++) {
        const temp = cloneLoop(normalList[i].a)

        // 确保不全等
        expect(temp).not.toBe(normalList[i].a)
        // 确保内容一样
        expect(temp).toEqual(normalList[i].a)
      }
    })

    it('简单循环引用', () => {
      const temp = cloneLoop(singleRefList[0].a)
      expect(temp).toBe(temp[3])

      const temp2 = cloneLoop(singleRefList[1].a)
      expect(temp2).toBe(temp2['a4'])
    })
  })

  describe('cloneForce', () => {
    it('常规', () => {
      for (let i = 0; i < simpleList.length; i++) {
        // 确保全等
        expect(cloneForce(simpleList[i].a)).toBe(simpleList[i].a)
      }

      for (let i = 0; i < normalList.length; i++) {
        const temp = cloneForce(normalList[i].a)

        // 确保不全等
        expect(temp).not.toBe(normalList[i].a)
        // 确保内容一样
        expect(temp).toEqual(normalList[i].a)
      }
    })

    it('简单循环引用', () => {
      const temp = cloneForce(singleRefList[0].a)
      expect(temp).toBe(temp[3])

      const temp2 = cloneForce(singleRefList[1].a)
      expect(temp2).toBe(temp2['a4'])
    })

    it('复杂循环引用', () => {
      const temp = cloneForce(complexRefList[0].a)
      expect(temp).toBe(temp[1][1])

      const temp2 = cloneForce(complexRefList[1].a)
      expect(temp2).toBe(temp2.a2.b2)
    })
  })
}, 1000)
