import { describe, it, expect } from 'vitest'
import { create, setPrototypeOf } from '@overscore/utils//object'

describe('Object utility functions', () => {
  describe('create function', () => {
    it('should create an object with the specified prototype', () => {
      const prototype = { a: 1 }
      const obj = create(prototype)

      expect(Object.getPrototypeOf(obj)).toBe(prototype)
      expect(obj.a).toBe(1)
    })

    it('should create an object that is an instance of Object', () => {
      const prototype = { a: 1 }
      const obj = create(prototype)

      expect(obj).toBeInstanceOf(Object)
    })
  })

  describe('setPrototypeOf function', () => {
    it('should set the prototype of an object', () => {
      const obj = {}
      const prototype = { a: 1 }

      setPrototypeOf(obj, prototype)

      expect(Object.getPrototypeOf(obj)).toBe(prototype)
      expect(obj.a).toBe(1)
    })

    it('should not overwrite existing properties', () => {
      const obj = { a: 2 }
      const prototype = { a: 1 }

      setPrototypeOf(obj, prototype)

      expect(obj.a).toBe(2) // Should retain the original property
    })

    it('should set the prototype using __proto__ if setPrototypeOf is not available', () => {
      const obj = {}
      const prototype = { a: 1 }

      // Mocking Object.setPrototypeOf to be undefined
      const originalSetPrototypeOf = Object.setPrototypeOf
      Object.setPrototypeOf = undefined

      setPrototypeOf(obj, prototype)

      expect(Object.getPrototypeOf(obj)).toBe(prototype)

      // Restore the original function
      Object.setPrototypeOf = originalSetPrototypeOf
    })
  })
})
