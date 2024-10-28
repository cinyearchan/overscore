import { describe, it, expect, vi } from 'vitest'
import { loadjs } from '@overscore/utils/load'

describe('loadjs', () => {
  it('should load a script successfully', (done) => {
    const src = 'https://example.com/script.js'
    const success = vi.fn()
    const error = vi.fn()

    // Mock the script loading
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      success()
      expect(success).toHaveBeenCalled()
      done()
    }
    script.onerror = error

    // Append the script to the head
    document.head.appendChild(script)
    loadjs(src, success, error)
  })

  it('should handle script loading error', (done) => {
    const src = 'https://example.com/nonexistent.js'
    const success = vi.fn()
    const error = vi.fn()

    // Mock the script loading
    const script = document.createElement('script')
    script.src = src
    script.onerror = () => {
      error()
      expect(error).toHaveBeenCalled()
      done()
    }

    // Append the script to the head
    document.head.appendChild(script)
    loadjs(src, success, error)
  })

  it('should append cache buster if cache is false', () => {
    const src = 'https://example.com/script.js'
    const success = () => {}
    const error = () => {}
    const option = { cache: false }

    const appendSpy = vi.spyOn(document.head, 'appendChild')
    loadjs(src, success, error, option)

    expect(appendSpy).toHaveBeenCalled()
    const scriptNode = appendSpy.mock.calls[0][0]
    expect(scriptNode.src).toMatch(/\?t=\w+/) // Check if cache buster is appended
  })

  it('should not append cache buster if cache is true', () => {
    const src = 'https://example.com/script.js'
    const success = () => {}
    const error = () => {}
    const option = { cache: true }

    const appendSpy = vi.spyOn(document.head, 'appendChild')
    loadjs(src, success, error, option)

    expect(appendSpy).toHaveBeenCalled()
    const scriptNode = appendSpy.mock.calls[0][0]
    expect(scriptNode.src).not.toMatch(/\?t=\w+/) // Check if cache buster is not appended
  })

  it('should set the script charset correctly', () => {
    const src = 'https://example.com/script.js'
    const success = () => {}
    const error = () => {}
    const option = { charset: 'UTF-8' }

    const appendSpy = vi.spyOn(document.head, 'appendChild')
    loadjs(src, success, error, option)

    expect(appendSpy).toHaveBeenCalled()
    const scriptNode = appendSpy.mock.calls[0][0]
    expect(scriptNode.charset).toBe('UTF-8') // Check if charset is set correctly
  })

  it('should use the default charset if not provided', () => {
    const src = 'https://example.com/script.js'
    const success = () => {}
    const error = () => {}

    const appendSpy = vi.spyOn(document.head, 'appendChild')
    loadjs(src, success, error)

    expect(appendSpy).toHaveBeenCalled()
    const scriptNode = appendSpy.mock.calls[0][0]
    expect(scriptNode.charset).toBe(document.charset) // Check if default charset is used
  })
}, 5000)
