import SchemaBuilder, {
  ImplementableInterfaceRef,
  ImplementableObjectRef,
  InterfaceParam,
  InterfaceTypeOptions,
  ObjectTypeOptions,
} from '@pothos/core'
import RelayPlugin from '@pothos/plugin-relay'
import DataloaderPlugin, {
  LoadableNodeOptions,
} from '@pothos/plugin-dataloader'
import { DateResolver, JSONResolver } from 'graphql-scalars'
import { YogaServerOptions } from 'graphql-yoga'
import SimpleListPlugin from './pothos-simple-list'
import './pothos-simple-list/global-types'

const builder = new SchemaBuilder<{
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
  plugins: [RelayPlugin, DataloaderPlugin, SimpleListPlugin],

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
  | 'addScalarType'
  | 'loadableInterface'
  | 'loadableUnion'
  | 'objectType'
  | 'loadableInterfaceRef'
  | 'loadableObjectRef'
  | 'nodeInterfaceRef'
  | 'inputRef'
  | 'objectRef'
  | 'scalarType'
  | 'interfaceField'
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
  | 'enumType'
  | 'inputType'
  | 'interfaceRef'
  | 'interfaceType'
  | 'loadableObject'
  | 'mutationField'
  | 'mutationFields'
  | 'objectField'
  | 'objectFields'
  | 'queryField'
  | 'unionType'
>
const reducedBuilder: Builder = builder

export { reducedBuilder as builder }
export { decodeGlobalID, encodeGlobalID } from '@pothos/plugin-relay'
export * from './errors'

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
  description?: string
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
  interfaces?: LoadableNodeOptions<
    BuilderTypes,
    T,
    Interfaces,
    string,
    string | number,
    string | number,
    string | number
  >['interfaces']
}) {
  return builder.loadableNode(opts.name, {
    description: opts.description,
    isTypeOf: opts.isTypeOf,
    fields: opts.fields,
    interfaces: opts.interfaces,
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

/**
 * A function to create an (unkeyed) object that can be resolved, this can subsequently be used in a
 * query/mutation/node/...
 *
 * @example
 * ```ts
 * const Location = object<Resource['location']>({
 *   name: 'Location',
 *   fields: (t) => ({
 *     name: t.exposeString('name'),
 *     region: t.exposeString('region'),
 *     latitude: t.exposeFloat('latitude'),
 *     longitude: t.exposeFloat('longitude'),
 *   }),
 *})
 * ```
 */
export function object<
  T,
  Interfaces extends
    InterfaceParam<BuilderTypes>[] = InterfaceParam<BuilderTypes>[],
  Parent = T,
>(
  opts: { name: string } & Omit<
    ObjectTypeOptions<
      BuilderTypes,
      ImplementableObjectRef<BuilderTypes, T, Parent>,
      Parent,
      Interfaces
    >,
    'name'
  >,
) {
  const { name, ...options } = opts
  // TODO: consider loadableObject
  return (
    builder
      .objectRef<T>(name)
      // @ts-expect-error
      .implement(options)
  )
}

/**
 * Add entry points to the graph, these can subsequently be used from your
 * front-end to query data.
 *
 * @example
 * ```ts
 * addQueryFields((fieldBuilder) => ({
 *   launches: fieldBuilder.simpleList({
 *     type: LaunchNode,
 *     args: { limit: t.arg.int({ default: 10 }), offset: t.arg.int({ default: 0 }) }
 *     resolve: async (_, args) => {
 *       const data = fetch(`/launches?offset=${args.offset}&limit=${args.limit}`).then((x) => x.json()));
 *       return { nodes: data.results, totalCount: data.count }
 *     }
 *   })
 * })
 * ```
 */
export const addQueryFields: typeof builder.queryFields =
  builder.queryFields.bind(builder)

/**
 * Add entry points to the graph, these can subsequently be used from your
 * front-end to query data.
 *
 * @example
 * ```ts
 * addQueryFields((fieldBuilder) => ({
 *   addToCart: fieldBuilder.field({
 *     type: Cart,
 *     args: { productId: t.arg.string() },
 *     resolve: async (_, args, context) => {
 *       const data = fetch('/cart', {
 *         method: 'POST',
 *         body: JSON.stringify({ product: args.productId }).
 *         headers: { Authorization: context.token }
 *       }).then((x) => x.json()));
 *       return data
 *     }
 *   })
 * })
 * ```
 */
export const addMutationFields: typeof builder.mutationFields =
  builder.mutationFields.bind(builder)

/**
 * Add more fields to an existing object.
 *
 * @example
 * ```ts
 * addObjectFields(CartObject, (fieldBuilder) => ({
 *   user: t.field({
 *     type: User,
 *     resolve: (parent) => {
 *        const data = fetch(`/users/${parent.userId}`).then((x) => x.json()));
 *        return data;
 *     }
 *   })
 * })
 */
export const addObjectFields: typeof builder.objectFields =
  builder.objectFields.bind(builder)

/**
 * Add more fields to an existing node.
 *
 * @example
 * ```ts
 * addNodeFields(LaunchNode, (fieldBuilder) => ({
 *   rocket: t.field({
 *     type: Rocket,
 *     resolve: (parent) => {
 *        const data = fetch(`/rockets/${parent.rocketId}`).then((x) => x.json()));
 *        return data;
 *     }
 *   })
 * })
 */
export const addNodeFields: typeof builder.objectFields =
  builder.objectFields.bind(builder)

/**
 * Narrow down the possible values of a field by providing an enum.
 *
 * @example
 * ```ts
 * const SiteStatus = enumType('SiteStatus', {
 *  values: ['ACTIVE', 'INACTIVE', 'UNKNOWN']
 * })
 *
 * // Which can then be used like
 * t.field({
 *   type: SiteStatus,
 *   resolve: (parent) => {
 *     switch (parent.status) {
 *       case 'active':
 *         return 'ACTIVE'
 *       case 'inactive':
 *         return 'INACTIVE'
 *       default:
 *         return 'UNKNOWN'
 *      }
 *    },
 * }),
 * ```
 */
export const enumType: typeof builder.enumType = builder.enumType.bind(builder)

/**
 * Creates a re-usable input-type that can be used in arguments to your fields.
 *
 * @example
 * ```ts
 * const Pagination = inputType('Pagination', {
 *   fields: (t) => ({
 *     limit: t.int({ default: 10 }),
 *     offset: t.int({ default: 0 })
 *   })
 * })
 *
 * addQueryFields((fieldBuilder) => ({
 *   myList: fieldBuilder.simpleList({
 *     args: input: t.arg({ type: Pagination })
 *   })
 * })
 * ```
 */
export const inputType: typeof builder.inputType =
  builder.inputType.bind(builder)

/**
 * Creates an interface-type which can be used in the `interfaces` option of `object` and `node`.
 *
 * @example
 * ```ts
 * const NewInterface = interfaceType<Shape, Parent>({
 *   name: 'NewInterface',
 *   resolveType: (parent) => 'Launch',
 *   fields: (t) => ({
 *     name: t.string()
 *   }),
 * })
 * ```
 */
export const interfaceType = <
  Shape extends {} = {},
  Interfaces extends
    InterfaceParam<BuilderTypes>[] = InterfaceParam<BuilderTypes>[],
  Parent = Shape,
>(
  name: string,
  opts: InterfaceTypeOptions<
    BuilderTypes,
    ImplementableInterfaceRef<BuilderTypes, Shape, Parent>,
    Parent,
    Interfaces
  >,
) => {
  return (
    builder
      .interfaceRef(name)
      // @ts-expect-error
      .implement(opts)
  )
}

/**
 * Creates a union of types, these can be used in fields and will then have to resolve to
 * one of the union types.
 *
 * @example
 * ```ts
 * const NewInterface = unionType('Resource', {
 *   resolveType: (parent) => 'Engine',
 *   types: [Fuel, Engine]
 * })
 * ```
 */
export const unionType: typeof builder.unionType =
  builder.unionType.bind(builder)
