import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { throttle } from '@overscore/utils/throttle'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers() // 启用假定时器
  })

  afterEach(() => {
    vi.useRealTimers() // 恢复真实定时器
  })

  it('should call the method at most once every delay milliseconds', () => {
    const mockMethod = vi.fn()
    const throttledMethod = throttle(mockMethod, 100)

    throttledMethod()
    throttledMethod()
    throttledMethod()

    vi.advanceTimersByTime(150) // 快速推进时间

    expect(mockMethod).toHaveBeenCalledTimes(1)
  })

  it('should call the method with the correct context and arguments', () => {
    const mockMethod = vi.fn()
    const throttledMethod = throttle(mockMethod, 100)

    const context = { value: 42 }
    throttledMethod.call(context, 'arg1', 'arg2')

    vi.advanceTimersByTime(150) // 快速推进时间

    expect(mockMethod).toHaveBeenCalledWith('arg1', 'arg2')
    expect(mockMethod.mock.instances[0]).toBe(context)
  })

  it('should not call the method if called too quickly', () => {
    const mockMethod = vi.fn()
    const throttledMethod = throttle(mockMethod, 100)

    throttledMethod()
    throttledMethod()
    throttledMethod()

    vi.advanceTimersByTime(150) // 快速推进时间

    expect(mockMethod).toHaveBeenCalledTimes(1)
  })

  it('should call the method after the delay if called again', () => {
    const mockMethod = vi.fn()
    const throttledMethod = throttle(mockMethod, 100)

    throttledMethod()

    vi.advanceTimersByTime(150) // 快速推进时间
    throttledMethod() // Call again after delay

    vi.advanceTimersByTime(150) // 快速推进时间

    expect(mockMethod).toHaveBeenCalledTimes(2)
  })

  it('should handle multiple calls correctly', () => {
    const mockMethod = vi.fn()
    const throttledMethod = throttle(mockMethod, 100)

    throttledMethod()
    throttledMethod()
    throttledMethod()

    vi.advanceTimersByTime(150) // 快速推进时间

    expect(mockMethod).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(50) // 快速推进时间
    throttledMethod() // Call again after delay

    vi.advanceTimersByTime(150) // 快速推进时间

    expect(mockMethod).toHaveBeenCalledTimes(2)
  })
})
