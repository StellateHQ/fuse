// src/next/rsc.ts
import { Client, ClientOptions } from '@urql/core'

export { registerUrql as registerClient } from '@urql/next/rsc'
export * from '@urql/core'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export function createClient(opts: Optional<ClientOptions, 'exchanges'>): Client
