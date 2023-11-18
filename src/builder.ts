import SchemaBuilder, { SchemaTypes } from '@pothos/core'
import RelayPlugin from '@pothos/plugin-relay'
import DataloaderPlugin, {
  ImplementableLoadableNodeRef,
} from '@pothos/plugin-dataloader'
import { DateResolver, JSONResolver } from 'graphql-scalars'
import { YogaServerOptions } from 'graphql-yoga'
import { Datasource } from './datasources/interface'

let builder = new SchemaBuilder<{
  Scalars: {
    JSON: {
      Input: unknown
      Output: unknown
    }
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  plugins: [RelayPlugin, DataloaderPlugin],
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
  },
})

let version = 1
// @ts-ignore
builder.version = version

export const resetBuilder = () => {
  builder = new SchemaBuilder<{
    Scalars: {
      JSON: {
        Input: unknown
        Output: unknown
      }
      Date: {
        Input: Date
        Output: Date
      }
    }
  }>({
    plugins: [RelayPlugin, DataloaderPlugin],
    relayOptions: {
      clientMutationId: 'omit',
      cursorType: 'String',
    },
  })

  // @ts-ignore
  builder.version = version++
  // Initialize base-types
  builder.queryType({
    fields: (t) => ({
      _version: t.string({
        resolve: () => '0.0.1',
      }),
    }),
  })

  builder.mutationType({
    fields: (t) => ({
      _version: t.string({
        resolve: () => '0.0.1',
      }),
    }),
  })
  builder.addScalarType('JSON', JSONResolver, {})
  builder.addScalarType('Date', DateResolver, {})
}

// Initialize base-types
builder.queryType({
  fields: (t) => ({
    _version: t.string({
      resolve: () => '0.0.1',
    }),
  }),
})

builder.mutationType({
  fields: (t) => ({
    _version: t.string({
      resolve: () => '0.0.1',
    }),
  }),
})
builder.addScalarType('JSON', JSONResolver, {})
builder.addScalarType('Date', DateResolver, {})

export type GetContext<
  ServerOptions extends Record<string, any> = {},
  UserOptions extends Record<string, any> = {},
> = NonNullable<YogaServerOptions<ServerOptions, UserOptions>['context']>
export { createRestDatasource } from './datasources/rest'
export { builder }

// Utility methods
export function node<T extends { id: string }, Types extends SchemaTypes>(
  builder: PothosSchemaTypes.SchemaBuilder<Types>,
  name: string,
  datasource: Datasource<T>,
): ImplementableLoadableNodeRef<Types, string | T, T, string, string, string> {
  return builder.loadableNodeRef<T>(name, {
    id: {
      resolve: (parent) => parent.id as never,
    },
    async load(ids: string[]) {
      const results = await Promise.all(ids.map((id) => datasource.get(id)))
      return results
    },
  })
}
