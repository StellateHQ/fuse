import SchemaBuilder, { InterfaceParam } from '@pothos/core'
import RelayPlugin from '@pothos/plugin-relay'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import DataloaderPlugin, {
  LoadableNodeOptions,
} from '@pothos/plugin-dataloader'
import { DateResolver, JSONResolver } from 'graphql-scalars'
import { YogaServerOptions } from 'graphql-yoga'
import SimpleListPlugin from './pothos-simple-list'
import './pothos-simple-list/global-types'

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
 * This is a helper function to create a node with an associated way to fetch it.
 * Nodes get assigned a unique ID which is derived from `base64Encode(nameOfType + node[key || 'id'])`.
 * The fields property can be used to rename properties, type them and even create custom resolve functions
 * for computed properties or transformations.
 * Optionally when the output-type has no `id` property you can use the `key` option to specify a different
 * property used to uniquely identify the node.
 *
 * @example
 * ```ts
 * export const LaunchNode = node<OutputType>({
 *   name: 'Launch',
 *   key: 'flight_number',
 *   async load(ids) {
 *     // get and return the data
 *   }
 *   fields: (t) => ({
 *     // we tell our node that it can find the name on a different property named mission_name and to
 *     // expose it as a string.
 *     name: t.exposeString('mission_name'),
 *     details: t.exposeString('details', { nullable: true }),
 *     image: t.field({
 *      type: 'String',
 *       resolve: (parent) => parent.links.mission_patch,
 *     }),
 *     launchDate: t.exposeString('launch_date_utc'),
 *   }),
 * })
 * ```
 */
export function node<
  T extends {},
  Interfaces extends
    InterfaceParam<BuilderTypes>[] = InterfaceParam<BuilderTypes>[],
>(opts: {
  name: string
  key?: string
  load: (
    ids: string[],
    ctx: Record<string, unknown>,
  ) => Promise<Array<T | Error>>
  fields: LoadableNodeOptions<
    BuilderTypes,
    T,
    Interfaces,
    string,
    string | number,
    string | number,
    string | number
  >['fields']
  isTypeOf?: LoadableNodeOptions<
    BuilderTypes,
    T,
    Interfaces,
    string,
    string | number,
    string | number,
    string | number
  >['isTypeOf']
}) {
  return builder.loadableNode(opts.name, {
    isTypeOf: opts.isTypeOf,
    fields: opts.fields,
    id: {
      resolve: (parent) => {
        const key = parent[opts.key || 'id']
        if (!key) {
          throw new Error(
            "Could not find key for node, did you forget to set the 'key' option?",
          )
        }
        return key
      },
    },
    async load(
      ids: string[],
      ctx: { headers?: Record<string, string> | undefined },
    ) {
      const results = await opts.load(ids, ctx)
      return results.map((result) =>
        result instanceof Error ? result : { ...result, __typename: opts.name },
      )
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
