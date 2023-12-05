'use server'

import { graphql } from '@/fuse'
import { createClient, fetchExchange, registerClient } from 'fuse/next/server'

const { getClient } = registerClient(() =>
  createClient({
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://spacex-fuse.vercel.app/api/fuse'
        : 'http://localhost:3000/api/fuse',
    exchanges: [fetchExchange],
  }),
)

const SayHello = graphql(`
  mutation Ohaio($name: String!) {
    sayHello(name: $name)
  }
`)

export async function sayHello(args: { name: string }) {
  const client = getClient()
  const result = await client
    .mutation(SayHello, { name: args.name || 'fuse' })
    .toPromise()

  console.log(result.data?.sayHello)

  return result.data?.sayHello
}
