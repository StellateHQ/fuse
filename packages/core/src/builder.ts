import SchemaBuilder from '@pothos/core'
import RelayPlugin from '@pothos/plugin-relay'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import SimpleListPlugin from '@fuse/pothos-plugin-list'
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
  plugins: [
    RelayPlugin,
    DataloaderPlugin,
    SimpleObjectsPlugin,
    SimpleListPlugin,
  ],

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
  UserOptions extends Record<string, any> = {} & {
    headers?: Record<string, string> | undefined | null
  },
> = NonNullable<YogaServerOptions<ServerOptions, UserOptions>['context']>

type Builder = Omit<
  typeof builder,
  | 'objectType'
  | 'loadableInterfaceRef'
  | 'loadableObjectRef'
  | 'nodeInterfaceRef'
  | 'inputRef'
  | 'objectRef'
  | 'scalarType'
  | 'interfaceField'
  | 'interfaceType'
  | 'interfaceRef'
  | 'listObject'
  | 'node'
  | 'options'
  | 'pageInfoRef'
  | 'subscriptionType'
  | 'queryFields'
  | 'queryType'
  | 'mutationType'
  | 'mutationFields'
  | 'connectionObject'
  | 'edgeObject'
  | 'configStore'
  | 'defaultFieldNullability'
  | 'defaultInputFieldRequiredness'
  | 'globalConnectionField'
  | 'globalConnectionFields'
  | 'args'
  | 'loadableNode'
  | 'loadableNodeRef'
  | 'interfaceFields'
  | 'subscriptionFields'
  | 'subscriptionField'
  | 'relayMutationField'
>
let reducedBuilder: Builder = builder
export { RestDatasource } from './datasources/rest'
export { reducedBuilder as builder }

type BuilderTypes = typeof builder extends PothosSchemaTypes.SchemaBuilder<
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
export function node<
  T extends { id: string | number } | { [K in Key]: string | number },
  Key extends string,
>(
  name: string,
  datasource: Datasource<T>,
  key?: Key,
): ImplementableLoadableNodeRef<
  BuilderTypes,
  string | T,
  T,
  string,
  string,
  string
> {
  return builder.loadableNodeRef<T>(name, {
    id: {
      // @ts-expect-error
      resolve: (parent) => '' + (key ? parent[key] : parent.id),
    },
    async load(
      ids: string[],
      ctx: { headers?: Record<string, string> | undefined },
    ) {
      if (datasource.getMany) {
        return datasource.getMany(ids, ctx?.headers || {})
      } else {
        const results = await Promise.allSettled(
          ids.map((id) => datasource.getOne(id, ctx?.headers || {})),
        )

        return results.map((result) => {
          if (result.status === 'fulfilled') {
            return result.value
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
  reducedBuilder = builder
}
