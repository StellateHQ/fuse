'use server'

import { graphql } from '@/fuse'
import { execute } from '@/fuse/server'
import { redirect } from 'next/navigation'

const SayHello = graphql(`
  mutation Hello($name: String!) {
    sayHello(name: $name)
  }
`)

export async function sayHello(args: { name: string }) {
  const result = await execute({
    query: SayHello,
    variables: { name: args.name || 'fuse' },
  })

  console.log(result.data?.sayHello)

  redirect('/')
}
