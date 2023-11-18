import { createYoga } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'

import { builder } from './builder'

function fetch(request) {
  let ctx
  import.meta.glob('/types/*.ts', { eager: true })
  const context = import.meta.glob('/_context.ts', { eager: true })
  if (context['/_context.ts']) {
    const mod = context['/_context.ts']
    if ((mod as any).getContext) {
      ctx = (mod as any).getContext
    }
  }

  const completedSchema = builder.toSchema({})

  const yoga = createYoga({
    schema: completedSchema,
    // We allow batching by default
    batching: true,
    context: ctx,
    plugins: [useDeferStream()],
  })

  return yoga.fetch(request, ctx)
}

export default { fetch }
