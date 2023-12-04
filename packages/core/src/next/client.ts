import {
  useQuery,
  UrqlProvider,
  createClient as create,
  fetchExchange,
  cacheExchange,
  ssrExchange,
} from '@urql/next'
import type { Client, ClientOptions, SSRExchange } from '@urql/next'
import { persistedExchange as urqlPersistedExchange } from '@urql/exchange-persisted'

export const persistedExchange = urqlPersistedExchange({
  enforcePersistedQueries: process.env.NODE_ENV === 'production',
  enableForMutation: true,
  generateHash: (_, document) =>
    Promise.resolve((document as any)['__meta__']['hash']),
})

export * from 'urql'
export { useQuery, UrqlProvider as Provider }

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export const createClient = (
  opts: Optional<ClientOptions, 'exchanges'>,
): { client: Client; ssr: SSRExchange } => {
  const ssr = ssrExchange()
  const options: ClientOptions = {
    ...opts,
    suspense: opts.suspense ?? true,
    exchanges: opts.exchanges || [cacheExchange, ssr, fetchExchange],
  }
  return { client: create(options), ssr }
}
