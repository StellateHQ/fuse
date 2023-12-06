// @ts-ignore
import { GetContext, builder } from 'fuse'
import type { NextApiRequest, NextPageContext, NextApiResponse } from 'next'
import { createStellateLoggerPlugin } from 'stellate/graphql-yoga'
import { createYoga, GraphQLParams, YogaInitialContext } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection'
import { blockFieldSuggestionsPlugin } from '@escape.tech/graphql-armor-block-field-suggestions'
import { writeFile } from 'fs/promises'
import { printSchema } from 'graphql'

// prettier-ignore
const defaultQuery = /* GraphQL */ `query {
  _version
}
`

interface StellateOptions {
  loggingToken: string
  serviceName: string
}

export function createAPIRouteHandler<
  AdditionalContext extends Record<string, unknown> = any,
>(options?: {
  context?: GetContext<YogaInitialContext, AdditionalContext>
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
      context: options?.context,
      // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
      graphqlEndpoint: '/api/fuse',

      // Yoga needs to know how to create a valid Next response
      fetchAPI: { Response },
      plugins: [
        useDeferStream(),
        process.env.NODE_ENV === 'production' && useDisableIntrospection(),
        process.env.NODE_ENV === 'production' && blockFieldSuggestionsPlugin(),
        Boolean(process.env.NODE_ENV === 'production' && options?.stellate) &&
          createStellateLoggerPlugin({
            serviceName: options!.stellate!.serviceName,
            token: options!.stellate!.loggingToken,
            fetch,
          }),
      ].filter(Boolean),
    })

    return handleRequest(request, context)
  }
}

export function createPagesRouteHandler<
  AdditionalContext extends Record<string, unknown> = any,
>(options?: {
  context?: GetContext<
    { req: NextApiRequest; res: NextApiResponse },
    AdditionalContext
  >
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
    context: options?.context,
    graphqlEndpoint: '/api/fuse',
    plugins: [
      useDeferStream(),
      process.env.NODE_ENV === 'production' && useDisableIntrospection(),
      process.env.NODE_ENV === 'production' && blockFieldSuggestionsPlugin(),
      Boolean(process.env.NODE_ENV === 'production' && options?.stellate) &&
        createStellateLoggerPlugin({
          serviceName: options!.stellate!.serviceName,
          token: options!.stellate!.loggingToken,
          fetch,
        }),
    ].filter(Boolean),
  })
}
