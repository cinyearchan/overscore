import { describe, it, expect } from 'vitest'
import { parse, stringify } from '@overscore/querystring'

describe('单元测试', () => {
  describe('parse', () => {
    it('param check', () => {
      expect(() => {
        parse({})
      }).toThrow('parse: first param must is string')
    })

    it('基本测试', () => {
      const a = parse('a=1')
      expect(a).toEqual({ a: '1' })

      const b = parse('a=1&b=2&c=3&d=4')
      expect(b).toEqual({ a: '1', b: '2', c: '3', d: '4' })
    })

    it('option', () => {
      const a = parse('a:1+b:2+c:3', { sep: '+', eq: ':' })
      expect(a).toEqual({ a: '1', b: '2', c: '3' })
    })

    it('option.ignoreQueryPrefix', () => {
      const a = parse('?a=1', { ignoreQueryPrefix: false })
      expect(a).toEqual({ a: '1' })

      const b = parse('?a=1', { ignoreQueryPrefix: true })
      expect(b).toEqual({ '?a': '1' })
    })

    it('option.decode', () => {
      const a = parse('a=%3D')
      expect(a).toEqual({ a: '=' })

      const b = parse('a=%3D', {
        decode: (x) => x,
      })
      expect(b).toEqual({ a: '%3D' })

      const c = parse('a=%3D', {
        decode: (x, isKey) => (isKey ? 1 : 2),
      })
      expect(c).toEqual({ 1: 2 })
    })

    it('option.filter', () => {
      const a = parse('a=null')
      expect(a).toEqual({ a: 'null' })

      const b = parse('a=null', {
        filter: (x) => x !== 'null',
      })
      expect(b).toEqual({})
    })

    it('option.convert', () => {
      const a = parse('a=1&b=2')
      expect(a).toEqual({ a: '1', b: '2' })

      const b = parse('a=1&b=2', {
        convert: (x) => +x + 1,
      })
      expect(b).toEqual({ a: 2, b: 3 })
    })

    it('option.reduce', () => {
      const a = parse('a=1&a=2')
      expect(a).toEqual({ a: '2' })

      const b = parse('a=1&a=2', {
        reduce: (prev, v, k) => {
          prev[k] = k in prev ? [].concat(prev[k], v) : v
          return prev
        },
      })
      expect(b).toEqual({ a: ['1', '2'] })
    })
  })

  describe('stringify', () => {
    it('param check', () => {
      expect(() => {
        stringify('')
      }).toThrow('stringify: first param must is object')
    })

    it('基本测试', () => {
      const a = stringify({ a: '1' })
      expect(a).toEqual('a=1')

      const b = stringify({ a: '1', b: '2', c: '3', d: '4' })
      expect(b).toEqual('a=1&b=2&c=3&d=4')
    })

    it('addQueryPrefix', () => {
      const a = stringify({ a: '1' })
      expect(a).toEqual('a=1')

      const b = stringify({ a: '1' }, { addQueryPrefix: true })
      expect(b).toEqual('?a=1')
    })

    it('option', () => {
      const a = stringify({ a: '1', b: '2', c: '3' }, { sep: '+', eq: ':' })
      expect(a).toEqual('a:1+b:2+c:3')
    })

    it('option.encode', () => {
      const a = stringify({ a: '=' })
      expect(a).toEqual('a=%3D')

      const b = stringify(
        { a: '=' },
        {
          encode: (x) => x,
        },
      )
      expect(b).toEqual('a==')

      const c = stringify(
        { a: '=' },
        {
          encode: (x, isKey) => (isKey ? 1 : 2),
        },
      )
      expect(c).toEqual('1=2')
    })

    it('option.filter', () => {
      const a = stringify({ a: null })
      expect(a).toEqual('a=')

      const b = stringify(
        { a: null },
        {
          filter: (x) => x !== null,
        },
      )
      expect(b).toEqual('')
    })

    it('option.convert', () => {
      const a = stringify({ a: null })
      expect(a).toEqual('a=')

      const b = stringify(
        { a: null },
        {
          convert: (x) => x,
        },
      )
      expect(b).toEqual('a=null')
    })

    it('option.reduce', () => {
      const a = stringify({ a: [1, 2] })
      expect(a).toEqual('a=1%2C2')

      const b = stringify(
        { a: [1, 2] },
        {
          reduce: (prev, v, k) => {
            for (let i = 0; i < v.length; i++) {
              prev.push({ k: k, v: v[i] })
            }
            return prev
          },
        },
      )
      expect(b).toEqual('a=1&a=2')
    })
  })
}, 1000)
