import { describe, it, expect } from 'vitest'
import { TrieNode } from '../TrieNode'

describe('TrieNode', () => {
  describe('constructor()', () => {
    it('should be initialized with key and value', () => {
      const n = new TrieNode('a', 'b')

      expect(n.key).toBe('a')
      expect(n.value).toBe('b')
    })
  })

  describe('add()', () => {
    it('should add children to node', () => {
      const root = new TrieNode('--root--', 0)
      const child = new TrieNode('a', 1)

      root.add(child)

      expect(root.children[0]).toBe(child)
    })
  })

  describe('has()', () => {
    it('should check it has children with given key', () => {
      const root = new TrieNode('--root--', 0)
      const child = new TrieNode('a', 1)

      root.add(child)

      expect(root.has(child.key)).toBeTruthy()
    })
  })

  describe('get()', () => {
    it('should return children by key', () => {
      const root = new TrieNode('--root--', 0)
      const child = new TrieNode('a', 1)

      root.add(child)

      expect(root.get(child.key)).toBe(child)
    })
  })

  describe('delete()', () => {
    it('should delete child by key', () => {
      const root = new TrieNode('--root--', 0)
      const child = new TrieNode('a', 1)

      root.add(child)

      expect(root.get(child.key)).toBe(child)

      root.delete(child.key)

      expect(root.get(child.key)).toBeUndefined()
    })
  })
})
