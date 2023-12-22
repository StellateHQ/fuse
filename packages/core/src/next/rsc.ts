import type {
  AnyVariables,
  Client,
  ClientOptions,
  GraphQLRequestParams,
} from '@urql/core'
import { createClient as create, fetchExchange } from '@urql/core'
import {
  DocumentNode,
  execute as graphQLExecute,
  ExecutionResult,
  print,
} from 'graphql'
// @ts-expect-error
import { builder, UserContext } from 'fuse'
import { GraphQLParams } from 'graphql-yoga'

export { registerUrql as registerClient } from '@urql/next/rsc'
export * from '@urql/core'
export { cacheExchange } from '../exchanges/cache'

const convertNullprototype = (obj: Record<string, any>): any => {
  if (obj == null || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map(convertNullprototype)
  } else if (typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        acc[key] = convertNullprototype(obj[key])
        return acc
      },
      {} as Record<string, any>,
    )
  }
}

export const execute = async <
  Data = any,
  Variables extends AnyVariables = AnyVariables,
>(
  request: GraphQLRequestParams<Data, Variables> & {
    context?: (params: GraphQLParams) => UserContext
  },
): Promise<ExecutionResult<Data>> => {
  const params: GraphQLParams = {
    query: print(request.query as DocumentNode),
    variables: request.variables || {},
  }

  const allContext = {
    ...(request.context ? request.context(params) : {}),
    params,
  }

  const result = await graphQLExecute({
    document: request.query as DocumentNode,
    schema: builder.toSchema(),
    variableValues: request.variables || {},
    contextValue: allContext,
  })

  return convertNullprototype(result)
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export const createClient = (
  opts: Optional<ClientOptions, 'exchanges'>,
): Client => {
  const options: ClientOptions = {
    ...opts,
    exchanges: opts.exchanges || [fetchExchange],
  }
  return create(options)
}
