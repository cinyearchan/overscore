import { describe, it, expect } from 'vitest'
import { parse, format } from '@overscore/url'

describe('单元测试', () => {
  describe('parse', () => {
    it('bad case', () => {
      const a = parse('javascript: void')
      expect(a.href).toBe('javascript: void')

      const b = parse('#')
      expect(b.href).toBe('#')

      const c = parse('')
      expect(c.href).toBe('')

      const d = parse('/a/b/c')
      expect(d.href).toBe('/a/b/c')
    })

    it('normal', () => {
      const a = parse(
        'http://user:pass@host.com:8080/p/a/t/h?query=string#hash',
      )

      expect(a.hash).toBe('#hash')
      expect(a.host).toBe('host.com:8080')
      expect(a.hostname).toBe('host.com')
      expect(a.href).toBe(
        'http://user:pass@host.com:8080/p/a/t/h?query=string#hash',
      )
      expect(a.origin).toBe('http://user:pass@host.com:8080')
      expect(a.path).toBe('/p/a/t/h?query=string')
      expect(a.pathname).toBe('/p/a/t/h')
      expect(a.port).toBe('8080')
      expect(a.protocol).toBe('http:')
      expect(a.query).toBe('query=string')
      expect(a.search).toBe('?query=string')
    })

    it('parseQueryString', () => {
      const a = parse(
        'http://user:pass@host.com:8080/p/a/t/h?query=string#hash',
        true,
      )
      expect(a.query.query).toBe('string')
    })
  })

  describe('format', () => {
    it('normal', () => {
      const a = format({
        auth: 'user:pass',
        hash: '#hash',
        host: 'host.com:8080',
        hostname: 'host.com',
        href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash',
        origin: 'http://user:pass@host.com:8080',
        path: '/p/a/t/h?query=string',
        pathname: '/p/a/t/h',
        port: '8080',
        protocol: 'http:',
        query: 'query=string',
        search: '?query=string',
      })
      expect(a).toBe('http://user:pass@host.com:8080/p/a/t/h?query=string#hash')
    })

    it('error', () => {
      expect(() => format('123')).toThrowError(/^first param must is object$/)
    })
  })
}, 1000)
