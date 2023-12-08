import { blockFieldSuggestionsPlugin } from '@escape.tech/graphql-armor-block-field-suggestions'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection'
import { GraphQLParams, Plugin, YogaInitialContext } from 'graphql-yoga'
import { createStellateLoggerPlugin } from 'stellate/graphql-yoga'
import { GetContext } from '../builder'

export interface StellateOptions {
  loggingToken: string
  serviceName: string
}

export const getYogaPlugins = (stellate?: StellateOptions): Plugin[] => {
  return [
    useDeferStream(),
    process.env.NODE_ENV === 'production' && useDisableIntrospection(),
    process.env.NODE_ENV === 'production' && blockFieldSuggestionsPlugin(),
    Boolean(process.env.NODE_ENV === 'production' && stellate) &&
      createStellateLoggerPlugin({
        serviceName: stellate!.serviceName,
        token: stellate!.loggingToken,
        fetch,
      }),
  ].filter(Boolean) as Plugin[]
}

export type InitialContext = {
  headers: Headers
  params: GraphQLParams
  request: YogaInitialContext['request']
}

export const wrappedContext = <AdditionalContext extends Record<string, any>>(
  context?: GetContext<InitialContext, AdditionalContext>,
) => {
  return async (ct) => {
    const baseContext: InitialContext = {
      request: ct.request,
      headers: ct.request.headers,
      params: ct.params,
    }
    if (typeof context === 'function') {
      const userCtx = context(baseContext)
      if (userCtx.then) {
        const result = await userCtx
        return {
          ...baseContext,
          ...result,
        }
      }
      return {
        ...baseContext,
        ...userCtx,
      }
    } else if (typeof context === 'object') {
      return {
        ...baseContext,
        ...context,
      }
    }

    return baseContext
  }
}
