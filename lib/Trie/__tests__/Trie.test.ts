import { describe, it, expect } from 'vitest'
import { Trie } from '../Trie'

describe('Trie', () => {
  describe('constructor()', () => {
    it('should be initialized with pairs', () => {
      const t = new Trie([
        [['a'], 1],
        [['a', 'b'], 2],
        [['a', 'b', 'c'], 3],
        [['b'], 4]
      ])

      expect(t.find(['a'])).toEqual(1)
      expect(t.find(['a', 'b'])).toEqual(2)
      expect(t.find(['a', 'b', 'c'])).toEqual(3)
      expect(t.find(['b'])).toEqual(4)
    })
  })

  describe('insert()', () => {
    it('should insert value by prefix', () => {
      const t = new Trie()

      t.insert(['a', 'b', 'c'], '--1--')
      t.insert(['a', 'b', 'd'], '--2--')
      t.insert(['a', 'b', 'e'], '--3--')

      t.insert(['a', 'g'], '--4--')

      t.insert(['b', 'g'], '--5--')

      expect(t.find(['a', 'b', 'c'])).toEqual('--1--')
      expect(t.find(['a', 'b', 'd'])).toEqual('--2--')
      expect(t.find(['a', 'b', 'e'])).toEqual('--3--')
      expect(t.find(['a', 'g'])).toEqual('--4--')
      expect(t.find(['b', 'g'])).toEqual('--5--')
    })
  })

  describe('find()', () => {
    it('should find value by prefix', () => {
      const t = new Trie()

      t.insert(['a', 'b', 'c'], '--test--')

      const v = t.find(['a', 'b', 'c'])

      expect(v).toEqual('--test--')
    })
  })

  describe('delete()', () => {
    it('should delete value by prefix', () => {
      const t = new Trie()

      t.insert(['a', 'b', 'c'], 1)

      expect(t.find(['a', 'b', 'c'])).toBe(1)

      t.delete(['a', 'b', 'c'])

      expect(t.find(['a', 'b', 'c'])).toBeNull()
    })

    it('should delete whole subtree', () => {
      const t = new Trie()

      t.insert(['a', 'b', 'c'], 1)
      t.insert(['a', 'b'], 2)
      t.insert(['a'], 1)

      expect(t.find(['a', 'b', 'c'])).toBe(1)

      t.delete(['a'])

      expect(t.find(['a'])).toBeNull()
      expect(t.find(['a', 'b'])).toBeNull()
      expect(t.find(['a', 'b', 'c'])).toBeNull()
    })
  })
})
