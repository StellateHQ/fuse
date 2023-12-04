// @ts-ignore
import { GetContext, builder, NotFoundError, ForbiddenError } from 'fuse'
import type { NextApiRequest, NextPageContext, NextApiResponse } from 'next'
import { createStellateLoggerPlugin } from 'stellate/graphql-yoga'
import { createYoga, GraphQLParams, YogaInitialContext } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection'
import { blockFieldSuggestionsPlugin } from '@escape.tech/graphql-armor-block-field-suggestions'
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations'
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

type InitialContext = {
  headers: Headers
  params: GraphQLParams
  request: YogaInitialContext['request']
}

export function createAPIRouteHandler<
  AdditionalContext extends Record<string, unknown> = any,
>(options?: {
  context?: GetContext<InitialContext, AdditionalContext>
  stellate?: StellateOptions
  persistedOperationsStore?: Record<string, string>
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
      context: (ct) => {
        const baseContext: InitialContext = {
          request: ct.request,
          headers: ct.request.headers,
          params: ct.params,
        }
        if (options?.context) {
          const userCtx = options.context(baseContext)
          return {
            ...baseContext,
            ...userCtx,
          }
        }

        return baseContext
      },
      // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
      graphqlEndpoint: '/api/fuse',

      // Yoga needs to know how to create a valid Next response
      fetchAPI: { Response },
      plugins: [
        useDeferStream(),
        !!options?.persistedOperationsStore &&
          usePersistedOperations({
            customErrors: {
              notFound: NotFoundError,
              persistedQueryOnly: ForbiddenError,
              keyNotFound: NotFoundError,
            },
            allowArbitraryOperations: process.env.NODE_ENV === 'development',
            getPersistedOperation(sha256Hash: string) {
              return options.persistedOperationsStore![sha256Hash]
            },
          }),
        process.env.NODE_ENV === 'production' && useDisableIntrospection(),
        process.env.NODE_ENV === 'production' && blockFieldSuggestionsPlugin(),
        !!(process.env.NODE_ENV === 'production' && options?.stellate) &&
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
  context?: GetContext<InitialContext, AdditionalContext>
  stellate?: StellateOptions
  persistedOperationsStore?: Record<string, string>
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
    context: (ct) => {
      const baseContext: InitialContext = {
        request: ct.request,
        headers: ct.request.headers,
        params: ct.params,
      }
      if (options?.context) {
        const userCtx = options.context(baseContext)
        return {
          ...baseContext,
          ...userCtx,
        }
      }

      return baseContext
    },
    graphqlEndpoint: '/api/fuse',
    plugins: [
      useDeferStream(),
      !!options?.persistedOperationsStore &&
        usePersistedOperations({
          customErrors: {
            notFound: NotFoundError,
            persistedQueryOnly: ForbiddenError,
            keyNotFound: NotFoundError,
          },
          allowArbitraryOperations: process.env.NODE_ENV === 'development',
          getPersistedOperation(sha256Hash: string) {
            return options.persistedOperationsStore![sha256Hash]
          },
        }),
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
