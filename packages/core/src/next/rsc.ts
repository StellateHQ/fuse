import type {
  AnyVariables,
  Client,
  ClientOptions,
  GraphQLRequestParams,
} from '@urql/core'
import { createClient as create, fetchExchange } from '@urql/core'
import { DocumentNode, execute, ExecutionResult } from 'graphql'
// @ts-expect-error
import { builder } from 'fuse'

export { registerUrql as registerClient } from '@urql/next/rsc'
export * from '@urql/core'

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

export const executeQuery = async <
  Data = any,
  Variables extends AnyVariables = AnyVariables,
>(
  request: GraphQLRequestParams<Data, Variables>,
): Promise<ExecutionResult<Data>> => {
  const result = await execute({
    document: request.query as DocumentNode,
    schema: builder.toSchema(),
    variableValues: request.variables || {},
    contextValue: {},
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
