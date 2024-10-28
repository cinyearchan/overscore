import { describe, it, expect, vi } from 'vitest'
import { debounce } from '@overscore/utils/debounce'

describe('debounce', () => {
  it('should call the method after the specified delay', (done) => {
    const mockMethod = vi.fn()
    const debouncedMethod = debounce(mockMethod, 100)

    debouncedMethod()
    debouncedMethod()
    debouncedMethod()

    setTimeout(() => {
      expect(mockMethod).toHaveBeenCalledTimes(1)
      done()
    }, 150) // Wait longer than the delay
  })

  it('should call the method with the correct context and arguments', (done) => {
    const mockMethod = vi.fn()
    const debouncedMethod = debounce(mockMethod, 100)

    const context = { value: 42 }
    debouncedMethod.call(context, 'arg1', 'arg2')

    setTimeout(() => {
      expect(mockMethod).toHaveBeenCalledWith('arg1', 'arg2')
      expect(mockMethod).toHaveBeenCalledTimes(1)
      expect(mockMethod.mock.instances[0]).toBe(context)
      done()
    }, 150)
  })

  it('should reset the timer if called again before the delay', (done) => {
    const mockMethod = vi.fn()
    const debouncedMethod = debounce(mockMethod, 100)

    debouncedMethod()
    debouncedMethod()

    setTimeout(() => {
      expect(mockMethod).toHaveBeenCalledTimes(1)
      done()
    }, 150)
  })

  it('should handle multiple calls correctly', (done) => {
    const mockMethod = vi.fn()
    const debouncedMethod = debounce(mockMethod, 100)

    debouncedMethod()
    debouncedMethod()
    debouncedMethod()

    setTimeout(() => {
      expect(mockMethod).toHaveBeenCalledTimes(1)
      done()
    }, 150)
  })

  it('should allow custom delay', (done) => {
    const mockMethod = vi.fn()
    const debouncedMethod = debounce(mockMethod, 200)

    debouncedMethod()

    setTimeout(() => {
      expect(mockMethod).toHaveBeenCalledTimes(0)
    }, 100)

    setTimeout(() => {
      expect(mockMethod).toHaveBeenCalledTimes(1)
      done()
    }, 250)
  })
})
