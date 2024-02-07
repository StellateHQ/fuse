import { createYoga } from 'graphql-yoga'
// @ts-ignore
import { builder } from 'fuse'
import { getYogaPlugins, wrappedContext } from '../utils/yoga-helpers'

function fetch(request) {
  let ctx
  import.meta.glob('/types/**/*.ts', { eager: true })
  const context = import.meta.glob('/_context.ts', { eager: true })
  if (context['/_context.ts']) {
    const mod = context['/_context.ts']
    if ((mod as any).getContext) {
      ctx = (mod as any).getContext
    }
  }

  const completedSchema = builder.toSchema({})

  const yoga = createYoga({
    graphiql: false,
    maskedErrors: true,
    schema: completedSchema,
    // We allow batching by default
    batching: true,
    context: wrappedContext(ctx),
    plugins: getYogaPlugins(),
  })

  return yoga.fetch(request, ctx)
}

export default { fetch }
