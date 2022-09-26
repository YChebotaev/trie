import { TrieNode } from './TrieNode'

export class Trie<TPrefix extends unknown[], TValue = unknown> {
  #root = new TrieNode(null, null)

  constructor (pairs?: Array<[TPrefix, TValue]>) {
    if (pairs != null) {
      for (const [prefix, value] of pairs) {
        this.insert(prefix, value)
      }
    }
  }

  public find (prefix: TPrefix): TValue | null {
    let currentNode = this.#root as TrieNode<TPrefix[number], TValue>

    for (const key of prefix) {
      if (currentNode.has(key)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentNode = currentNode.get(key)!

        continue
      }

      return null
    }

    return currentNode.value
  }

  public insert (prefix: TPrefix, value: TValue): this {
    let lastNode = this.#root as TrieNode<TPrefix[number], TValue>

    for (const key of prefix.slice(0, -1)) {
      if (lastNode.has(key)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        lastNode = lastNode.get(key)!
      } else {
        const newLastNode = new TrieNode<TPrefix[number], TValue>(key, undefined, lastNode)

        lastNode.add(newLastNode)

        lastNode = newLastNode
      }
    }

    {
      const [key] = prefix.slice(-1)

      if (lastNode.has(key)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        lastNode = lastNode.get(key)!
      } else {
        const newLastNode = new TrieNode(key, value, lastNode)

        lastNode.add(newLastNode)
      }

      return this
    }
  }

  public delete (prefix: TPrefix): void {
    let currentNode = this.#root as TrieNode<TPrefix[number], TValue>

    for (const key of prefix) {
      if (currentNode.has(key)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentNode = currentNode.get(key)!

        continue
      }

      return
    }

    currentNode.parent?.delete(currentNode.key)
  }
}
