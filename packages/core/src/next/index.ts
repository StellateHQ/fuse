// @ts-ignore
import { GetContext, builder } from 'fuse'
import type { NextApiRequest, NextPageContext, NextApiResponse } from 'next'
import { createYoga } from 'graphql-yoga'
import { writeFile } from 'fs/promises'
import { printSchema } from 'graphql'
import {
  StellateOptions,
  getYogaPlugins,
  wrappedContext,
} from '../utils/yoga-helpers'

// prettier-ignore
const defaultQuery = /* GraphQL */ `query {
  _version
}
`

export function createAPIRouteHandler<
  AdditionalContext extends Record<string, unknown> = any,
>(options?: {
  context?: GetContext<AdditionalContext>
  stellate?: StellateOptions
}) {
  return (request: Request, context: NextPageContext) => {
    const completedSchema = builder.toSchema({})
    if (process.env.NODE_ENV === 'development') {
      writeFile('./schema.graphql', printSchema(completedSchema), 'utf-8')
    }

    const { handleRequest } = createYoga({
      maskedErrors: process.env.NODE_ENV === 'production',
      graphiql:
        process.env.NODE_ENV !== 'production'
          ? {
              title: 'Fuse GraphiQL',
              defaultQuery,
            }
          : false,
      schema: completedSchema,
      // We allow batching by default
      batching: true,
      context: wrappedContext(options?.context),
      // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
      graphqlEndpoint: '/api/fuse',

      // Yoga needs to know how to create a valid Next response
      fetchAPI: { Response },
      plugins: getYogaPlugins(options?.stellate),
    })

    return handleRequest(request, context)
  }
}

export function createPagesRouteHandler<
  AdditionalContext extends Record<string, unknown> = any,
>(options?: {
  context?: GetContext<AdditionalContext>
  stellate?: StellateOptions
}) {
  const schema = builder.toSchema({})
  if (process.env.NODE_ENV === 'development') {
    writeFile('./schema.graphql', printSchema(schema), 'utf-8')
  }

  return createYoga<{
    req: NextApiRequest
    res: NextApiResponse
  }>({
    schema,
    graphiql:
      process.env.NODE_ENV !== 'production'
        ? {
            title: 'Fuse GraphiQL',
            defaultQuery,
          }
        : false,
    maskedErrors: process.env.NODE_ENV === 'production',
    batching: true,
    context: wrappedContext(options?.context),
    graphqlEndpoint: '/api/fuse',
    plugins: getYogaPlugins(options?.stellate),
  })
}
