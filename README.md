trie
====

A modern, generic trie ([prefix tree](https://en.wikipedia.org/wiki/Trie)) data structure on TypeScript

Support anything (including objects) as a prefix

Initally built as function memoization cache but may be used anyhow

Usage
-----

```tsx
import { Trie } from '@ychebotaev/trie'

const t = new Trie([
  [['a', 'b', 'c'], 1], // Initialize from pairs (optional)
])

t.insert(['d', 'e', 'f'], 2)

t.find(['a', 'b', 'c']) // => 1
t.find(['d', 'e', 'f']) // => 1

t.delete(['d'])

t.find(['d', 'e', 'f']) // => null
```

### As a function memoization cache (example)

```tsx
import { Trie } from './Trie'

export const memoize = <Params extends unknown[], Result, Fn = (...params: Params) => Result>(fn: Fn): Fn => {
  const cache = new Trie<Params, Result>()

  return (...params: Params): Result => {
    const cachedResult = cache.find(params)

    if (cachedResult) return cachedResult

    const result = fn(...params) as Result

    cache.insert(params, result)

    return result
  }
}
```

Contribution
============

Built with `vite` and `vitest`

### Run tests

```sh
npm test
```
