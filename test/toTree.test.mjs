import { describe, it, expect } from 'vitest'
import { toTree } from '@overscore/utils/toTree'

describe('toTree', () => {
  it('should convert a flat array to a tree structure', () => {
    const data = [
      { id: 1, parentId: null, name: 'Root' },
      { id: 2, parentId: 1, name: 'Child 1' },
      { id: 3, parentId: 1, name: 'Child 2' },
      { id: 4, parentId: 2, name: 'Grandchild 1' },
    ]

    const expected = [
      {
        id: 1,
        parentId: null,
        name: 'Root',
        children: [
          {
            id: 2,
            parentId: 1,
            name: 'Child 1',
            children: [
              {
                id: 4,
                parentId: 2,
                name: 'Grandchild 1',
              },
            ],
          },
          {
            id: 3,
            parentId: 1,
            name: 'Child 2',
          },
        ],
      },
    ]

    const result = toTree(data, 'parentId', 'id')
    expect(result).toEqual(expected)
  })

  it('should return an empty array when input is empty', () => {
    const result = toTree([], 'parentId', 'id')
    expect(result).toEqual([])
  })

  it('should handle nodes without parents correctly', () => {
    const data = [
      { id: 1, parentId: null, name: 'Root' },
      { id: 2, parentId: null, name: 'Child 1' },
    ]

    const expected = [
      { id: 1, parentId: null, name: 'Root' },
      { id: 2, parentId: null, name: 'Child 1' },
    ]

    const result = toTree(data, 'parentId', 'id')
    expect(result).toEqual(expected)
  })

  it('should handle circular references gracefully', () => {
    const data = [
      { id: 1, parentId: 2, name: 'Node 1' },
      { id: 2, parentId: 1, name: 'Node 2' },
    ]

    const result = toTree(data, 'parentId', 'id')
    expect(result).toEqual([])
  })

  it('should handle multiple levels of nesting', () => {
    const data = [
      { id: 1, parentId: null, name: 'Root' },
      { id: 2, parentId: 1, name: 'Child 1' },
      { id: 3, parentId: 1, name: 'Child 2' },
      { id: 4, parentId: 2, name: 'Grandchild 1' },
      { id: 5, parentId: 2, name: 'Grandchild 2' },
    ]

    const expected = [
      {
        id: 1,
        parentId: null,
        name: 'Root',
        children: [
          {
            id: 2,
            parentId: 1,
            name: 'Child 1',
            children: [
              { id: 4, parentId: 2, name: 'Grandchild 1' },
              { id: 5, parentId: 2, name: 'Grandchild 2' },
            ],
          },
          { id: 3, parentId: 1, name: 'Child 2' },
        ],
      },
    ]

    const result = toTree(data, 'parentId', 'id')
    expect(result).toEqual(expected)
  })

  it('should handle nodes with no children correctly', () => {
    const data = [
      { id: 1, parentId: null, name: 'Root' },
      { id: 2, parentId: 1, name: 'Child 1' },
      { id: 3, parentId: null, name: 'Child 2' },
    ]

    const expected = [
      {
        id: 1,
        parentId: null,
        name: 'Root',
        children: [{ id: 2, parentId: 1, name: 'Child 1' }],
      },
      { id: 3, parentId: null, name: 'Child 2' },
    ]

    const result = toTree(data, 'parentId', 'id')
    expect(result).toEqual(expected)
  })
})
