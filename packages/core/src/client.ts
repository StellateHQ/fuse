import { createClient as create, fetchExchange } from 'urql'
import type { Client, ClientOptions } from 'urql'
import { cacheExchange } from './next/exchanges'

export * from 'urql'

export { cacheExchange } from './next/exchanges'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export const createClient = (
  opts: Optional<ClientOptions, 'exchanges'>,
): Client => {
  const options: ClientOptions = {
    ...opts,
    suspense: opts.suspense ?? true,
    exchanges: opts.exchanges || [cacheExchange, fetchExchange],
  }
  return create(options)
}
