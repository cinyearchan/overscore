import { describe, it, expect } from 'vitest'
import { mapToArray } from '@overscore/utils/mapToArray'

describe('mapToArray', () => {
  it('should convert a map object to an array of objects with default key and value', () => {
    const input = {
      key1: 'value1',
      key2: 'value2',
    }
    const expected = [
      { name: 'key1', value: 'value1' },
      { name: 'key2', value: 'value2' },
    ]
    const result = mapToArray(input)
    expect(result).toEqual(expected)
  })

  it('should convert a map object to an array of objects with custom key and value', () => {
    const input = {
      id1: 'data1',
      id2: 'data2',
    }
    const expected = [
      { id: 'id1', data: 'data1' },
      { id: 'id2', data: 'data2' },
    ]
    const result = mapToArray(input, 'id', 'data')
    expect(result).toEqual(expected)
  })

  it('should handle an empty map object', () => {
    const input = {}
    const expected = []
    const result = mapToArray(input)
    expect(result).toEqual(expected)
  })

  it('should handle a map object with non-string keys', () => {
    const input = {
      1: 'one',
      2: 'two',
    }
    const expected = [
      { name: '1', value: 'one' },
      { name: '2', value: 'two' },
    ]
    const result = mapToArray(input)
    expect(result).toEqual(expected)
  })

  it('should handle a map object with mixed key types', () => {
    const input = {
      123: 'numberValue',
      stringKey: 'stringValue',
    }
    const expected = [
      { name: '123', value: 'numberValue' },
      { name: 'stringKey', value: 'stringValue' },
    ]
    const result = mapToArray(input)
    expect(result).toEqual(expected)
  })
})
