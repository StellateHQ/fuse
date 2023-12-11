import { cacheExchange as urqlCacheExchange, Exchange } from '@urql/core'
import { pipe, tap } from 'wonka'

export const cacheExchange: Exchange = ({ forward, client, dispatchDebug }) => {
  const cache$ = urqlCacheExchange({ client, dispatchDebug, forward })
  return (ops$) => {
    return pipe(
      cache$(ops$),
      tap((result) => {
        if (process.env.NODE_ENV === 'production') return

        if (
          result.operation.kind === 'mutation' &&
          !result.operation.context.additionalTypenames
        ) {
          Object.entries(result.data).forEach(([key, value]) => {
            if (value != null && typeof value !== 'object') {
              console.warn(
                `Saw return of type "${typeof value}" for "${key}", returning scalar values can lead to stale cache-entires. Consider using "additionalTypenames" to correctly evict cache-entries affected by this mutation.`,
              )
            }
          })
        } else if (
          result.operation.kind === 'query' &&
          !result.operation.context.additionalTypenames
        ) {
          Object.entries(result.data).forEach(([key, value]) => {
            if (value == null) {
              console.warn(
                `Saw return value of "null" for "${key}", we aren't able to derive an associated type for this key, this means that a mutation won't be able to evict this query. Consider using "additionalTypenames" to correctly evict this cache-entry.`,
              )
            } else if (Array.isArray(value) && value.length === 0) {
              console.warn(
                `Saw an empty array for "${key}", we aren't able to derive an associated type for members of this list, this means that a mutation won't be able to evict this query. Consider using "additionalTypenames" to correctly evict this cache-entry.`,
              )
            }
          })
        }
      }),
    )
  }
}
