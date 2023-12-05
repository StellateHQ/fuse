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
  mutation Ohaio {
    sayHello
  }
`)

export async function sayHello() {
  const client = getClient()
  const result = await client.mutation(SayHello, {}).toPromise()

  console.log(result)

  return result.data?.sayHello
}
