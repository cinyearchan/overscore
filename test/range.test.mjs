import { describe, it, expect } from 'vitest'
import { range } from '@overscore/range'

describe('unit test', () => {
  describe('number range', () => {
    it('error', () => {
      expect(range()).toEqual([])
    })
    it('-2-2', () => {
      expect(range(-2, 2)).toEqual([-2, -1, 0, 1])
      expect(range(2, -2)).toEqual([2, 1, 0, -1])
    })
    it('1-10', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4])
      expect(range(5, 1)).toEqual([5, 4, 3, 2])
    })
    it('1', () => {
      expect(range(2)).toEqual([0, 1])
      expect(range(-2)).toEqual([0, -1])
    })
    it('step', () => {
      expect(range(1, 3, 0)).toEqual([1, 2])
      expect(range(3, 1, -1)).toEqual([3, 2])
      expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9])
      expect(range(0, 0.5, 0.1)).toEqual([0, 0.1, 0.2, 0.3, 0.4])
      expect(range(0, 0.05, 0.01)).toEqual([0, 0.01, 0.02, 0.03, 0.04])
    })
  })

  describe('character range', () => {
    it('error', () => {
      expect(range()).toEqual([])
      expect(range({})).toEqual([])
      expect(range('aa', 'b')).toEqual([])
      expect(range('a', 'bb')).toEqual([])
    })
    it('a-z', () => {
      expect(range('a', 'd')).toEqual(['a', 'b', 'c'])
      expect(range('d', 'a')).toEqual(['d', 'c', 'b'])
      expect(range('e', 'g')).toEqual(['e', 'f'])
    })
    it('A-Z', () => {
      expect(range('A', 'D')).toEqual(['A', 'B', 'C'])
      expect(range('E', 'G')).toEqual(['E', 'F'])
    })
    it('A-a', () => {
      expect(range('Y', 'b')).toEqual(['Y', 'Z', 'a'])
    })
    it('a', () => {
      expect(range('a')).toEqual([])
      expect(range('d')).toEqual(['a', 'b', 'c'])
    })
    it('A', () => {
      expect(range('A')).toEqual([])
      expect(range('D')).toEqual(['A', 'B', 'C'])
    })
    it('step', () => {
      expect(range('A', 'D', 'A')).toEqual(['A', 'B', 'C'])
      expect(range('A', 'D', 0)).toEqual(['A', 'B', 'C'])
      expect(range('A', 'D', 10)).toEqual(['A'])
      expect(range('A', 'J', 2)).toEqual(['A', 'C', 'E', 'G', 'I'])
      expect(range('C', 'A', -1)).toEqual(['C', 'B'])
    })
  })

  describe('ruby style range', () => {
    it('error', () => {
      expect(range()).toEqual([])
      expect(range('aa..bb')).toEqual([])
      expect(range('1..0')).toEqual([])
    })
    it('..', () => {
      expect(range('1..5')).toEqual([1, 2, 3, 4, 5])
      expect(range('a..d')).toEqual(['a', 'b', 'c', 'd'])
    })
    it('...', () => {
      expect(range('1...5')).toEqual([1, 2, 3, 4])
      expect(range('a...d')).toEqual(['a', 'b', 'c'])
    })
    it('step', () => {
      expect(range('1..10', 2)).toEqual([1, 3, 5, 7, 9])
      expect(range('A..J', 2)).toEqual(['A', 'C', 'E', 'G', 'I'])
      expect(range('A..D', 10)).toEqual(['A'])
    })
  })
}, 1000)
