import { describe, it, expect, vi } from 'vitest'
import { once } from '@overscore/utils/once'

describe('once function', () => {
  it('should execute the function only once', () => {
    const mockFn = vi.fn()
    const onceFn = once(mockFn)

    onceFn()
    onceFn() // Should not execute again

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should return undefined on subsequent calls', () => {
    const mockFn = vi.fn()
    const onceFn = once(mockFn)

    const result1 = onceFn()
    const result2 = onceFn() // Should not execute again

    expect(result1).toBeUndefined()
    expect(result2).toBeUndefined()
  })

  it('should maintain the context of `this`', () => {
    const context = { value: 42 }
    const mockFn = function () {
      return this.value
    }
    const onceFn = once(mockFn)

    const result1 = onceFn.call(context)
    const result2 = onceFn.call(context) // Should not execute again

    expect(result1).toBe(42)
    expect(result2).toBeUndefined()
  })
})
