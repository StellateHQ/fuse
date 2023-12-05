// src/next/client.ts
import {
  useQuery,
  UrqlProvider,
  ClientOptions,
  SSRExchange,
  Client,
} from '@urql/next'
export * from 'urql'
export { UrqlProvider as Provider, useQuery }

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export function createClient(opts: Optional<ClientOptions, 'exchanges'>): {
  client: Client
  ssr: SSRExchange
}
