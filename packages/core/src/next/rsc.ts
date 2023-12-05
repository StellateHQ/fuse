import type { Client, ClientOptions } from '@urql/core'
import { createClient as create, fetchExchange } from '@urql/core'

export { registerUrql as registerClient } from '@urql/next/rsc'
export * from '@urql/core'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export const createClient = (
  opts: Optional<ClientOptions, 'exchanges'>,
): Client => {
  const options: ClientOptions = {
    ...opts,
    exchanges: opts.exchanges || [fetchExchange],
  }
  return create(options)
}
