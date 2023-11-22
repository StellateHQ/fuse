import SchemaBuilder from '@pothos/core'
import RelayPlugin from '@pothos/plugin-relay'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
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
  plugins: [RelayPlugin, DataloaderPlugin, SimpleObjectsPlugin],

  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
  },
})

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

export * from './pagination'
export type GetContext<
  ServerOptions extends Record<string, any> = {},
  UserOptions extends Record<string, any> = {},
> = NonNullable<YogaServerOptions<ServerOptions, UserOptions>['context']>
export { RestDatasource } from './datasources/rest'
export { builder }

type PothosTypes = typeof builder extends PothosSchemaTypes.SchemaBuilder<
  infer T
>
  ? T
  : never

/** A function to create a keyed object, this will inherit from the `Node` interface and hence be
 * query-able from `node(id: ID!): Node` and `nodes(ids: [ID!]!): [Node]`.
 *
 * @remarks
 * This is a helper function to create a node with a datasource and transform function, the datasource will invoke
 * the `get` or `getMany` helper to load all entities in parallel. The transform function will be invoked on each
 * of the successful results. Nodes get assigned a unique ID which is derived from `base64Encode('typename' + node.id)`.
 *
 * @example
 * ```ts
 * // PlanetNode can be used to for instance add a root-query field that returns the shape of this
 * // node.
 * export const PlanetNode = node(builder, 'Planet', planetDatasource).implement({
 * isTypeOf: (item) => {
 *   return item && (item as any).climate
 * },
 * fields: (t) => ({
 *   name: t.exposeString('name'),
 *   climate: t.exposeString('climate'),
 *   population: t.exposeString('population'),
 * }),
 *})
 * ```
 */
export function node<T extends { id: string }>(
  name: string,
  datasource: Datasource<T>,
  transform?: (entry: T) => T,
): ImplementableLoadableNodeRef<
  PothosTypes,
  string | T,
  T,
  string,
  string,
  string
> {
  return builder.loadableNodeRef<T>(name, {
    id: {
      resolve: (parent) => parent.id as never,
    },
    async load(ids: string[]) {
      if (datasource.getMany) {
        const result = await datasource.getMany(ids)
        return transform ? result.map(transform) : result
      } else {
        const results = await Promise.allSettled(
          ids.map((id) => datasource.getOne(id)),
        )
        return results.map((result) => {
          if (result.status === 'fulfilled') {
            // @ts-expect-error
            result.value.__typename = name
            return transform ? transform(result.value) : result.value
          } else {
            return new Error(result.reason)
          }
        })
      }
    },
  })
}

// Internal helper for hot-reloading
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
    plugins: [RelayPlugin, DataloaderPlugin, SimpleObjectsPlugin],

    relayOptions: {
      clientMutationId: 'omit',
      cursorType: 'String',
    },
  })

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
