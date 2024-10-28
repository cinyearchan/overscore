import { describe, it, expect } from 'vitest'
import { arrayToMap } from '@overscore/utils/arrayToMap'

describe('arrayToMap', () => {
  it('should convert an array of objects to a map with default key and value', () => {
    const input = [
      { name: 'Alice', value: 1 },
      { name: 'Bob', value: 2 },
    ]
    const expected = {
      Alice: 1,
      Bob: 2,
    }
    const result = arrayToMap(input)
    expect(result).toEqual(expected)
  })

  it('should convert an array of objects to a map with custom key and value', () => {
    const input = [
      { id: '1', score: 10 },
      { id: '2', score: 20 },
    ]
    const expected = {
      1: 10,
      2: 20,
    }
    const result = arrayToMap(input, 'id', 'score')
    expect(result).toEqual(expected)
  })

  it('should handle an empty array', () => {
    const input = []
    const expected = {}
    const result = arrayToMap(input)
    expect(result).toEqual(expected)
  })

  it('should handle an array with missing keys', () => {
    const input = [{ name: 'Alice' }, { value: 2 }]
    const expected = {
      Alice: undefined,
      undefined: 2,
    }
    const result = arrayToMap(input)
    expect(result).toEqual(expected)
  })

  it('should throw an error if input is not an array', () => {
    expect(() => arrayToMap(null)).toThrow()
    expect(() => arrayToMap({})).toThrow()
    expect(() => arrayToMap(123)).toThrow()
  })
})
