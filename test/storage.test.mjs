import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Storage } from '@overscore/utils/storage'

describe('Storage class', () => {
  let storage

  beforeEach(() => {
    // 模拟 localStorage 和 sessionStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }

    const sessionStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }

    // 使用 vi.stubGlobal 来模拟 window.localStorage 和 window.sessionStorage
    vi.stubGlobal('localStorage', localStorageMock)
    vi.stubGlobal('sessionStorage', sessionStorageMock)

    storage = new Storage()
  })

  afterEach(() => {
    // 恢复全局变量
    vi.restoreAllMocks()
  })

  describe('localStorage methods', () => {
    it('should set and get a single item in localStorage', () => {
      storage.setLocal('testKey', 'testValue')
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        JSON.stringify('testValue'),
      )

      localStorage.getItem.mockReturnValueOnce(JSON.stringify('testValue'))
      const value = storage.getLocal('testKey')
      expect(value).toBe('testValue')
    })

    it('should remove an item from localStorage', () => {
      storage.removeLocal('removeKey')
      expect(localStorage.removeItem).toHaveBeenCalledWith('removeKey')
    })

    it('should clear all items from localStorage', () => {
      storage.clearLocal()
      expect(localStorage.clear).toHaveBeenCalled()
    })
  })

  describe('sessionStorage methods', () => {
    it('should set and get a single item in sessionStorage', () => {
      storage.setSession('sessionKey', 'sessionValue')
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        'sessionKey',
        JSON.stringify('sessionValue'),
      )

      sessionStorage.getItem.mockReturnValueOnce(JSON.stringify('sessionValue'))
      const value = storage.getSession('sessionKey')
      expect(value).toBe('sessionValue')
    })

    it('should remove an item from sessionStorage', () => {
      storage.removeSession('removeSessionKey')
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('removeSessionKey')
    })

    it('should clear all items from sessionStorage', () => {
      storage.clearSession()
      expect(sessionStorage.clear).toHaveBeenCalled()
    })
  })
}, 5000)
