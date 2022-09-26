export class TrieNode<TKey, TValue> {
  #key: TKey
  #value: TValue | null
  #children: Map<TKey, TrieNode<TKey, TValue>>
  #parent?: TrieNode<TKey, TValue>

  constructor (key: TKey, value?: TValue, parent?: TrieNode<TKey, TValue>) {
    this.#key = key
    this.#value = value ?? null
    this.#children = new Map()
    this.#parent = parent
  }

  public get key (): TKey {
    return this.#key
  }

  public get value (): TValue | null {
    return this.#value
  }

  public get children (): Array<TrieNode<TKey, TValue>> {
    return Array.from(this.#children.values())
  }

  public get parent (): TrieNode<TKey, TValue> | undefined {
    return this.#parent
  }

  public has (key: TKey): boolean {
    return this.#children.has(key)
  }

  public add (node: TrieNode<TKey, TValue>): this {
    this.#children.set(node.key, node)

    return this
  }

  public get (key: TKey): TrieNode<TKey, TValue> | undefined {
    return this.#children.get(key)
  }

  public delete (key: TKey): this {
    this.#children.delete(key)

    return this
  }
}
