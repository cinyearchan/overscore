import { describe, it, expect, beforeEach } from 'vitest'
import { Cookies } from '@overscore/utils/cookie'

describe('Cookies class', () => {
  let cookies

  beforeEach(() => {
    cookies = new Cookies()
    // 清空 cookies
    document.cookie = ''
  })

  describe('setCookie method', () => {
    it('should set a cookie with a string value', () => {
      cookies.setCookie('testCookie', 'testValue', 1)
      expect(document.cookie).toContain('testCookie=testValue')
    })

    it('should set a cookie with an object value', () => {
      cookies.setCookie(
        'testCookies',
        { cookie1: 'value1', cookie2: 'value2' },
        1,
      )
      expect(document.cookie).toContain('cookie1=value1')
      expect(document.cookie).toContain('cookie2=value2')
    })

    it('should set the expiration date correctly', () => {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      cookies.setCookie('expireTest', 'expireValue', 1)
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('expireTest='))
      // const cookieValue = cookie.split('=')[1]
      expect(cookie).toContain('expireValue')
      expect(cookie).toContain(`expires=${date.toUTCString()}`)
    })
  })

  describe('getCookie method', () => {
    it('should return the value of an existing cookie', () => {
      cookies.setCookie('existingCookie', 'existingValue', 1)
      const value = cookies.getCookie('existingCookie')
      expect(value).toContain('existingValue')
    })

    it('should return an empty string for a non-existing cookie', () => {
      const value = cookies.getCookie('nonExistingCookie')
      expect(value).toBe('')
    })
  })

  describe('removeCookie method', () => {
    it('should remove an existing cookie', () => {
      cookies.setCookie('cookieToRemove', 'valueToRemove', 1)
      cookies.removeCookie('cookieToRemove')
      const value = cookies.getCookie('cookieToRemove')
      expect(value).toBe('')
    })

    it('should set the cookie value to an empty string and expiration to the past', () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      cookies.setCookie('cookieToRemove', 'valueToRemove', 1)
      cookies.removeCookie('cookieToRemove')
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('cookieToRemove='))
      expect(cookie).toBe('cookieToRemove=')
    })
  })
}, 1000)
