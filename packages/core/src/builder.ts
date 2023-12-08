import './pothos-list/global-types'
import SchemaBuilder, {
  EnumRef,
  EnumTypeOptions,
  EnumValues,
  ImplementableObjectRef,
  InputFieldBuilder,
  InputFieldMap,
  InputObjectRef,
  InputShapeFromFields,
  InterfaceParam,
  ObjectTypeOptions,
  SchemaTypes,
  ShapeFromEnumValues,
} from '@pothos/core'
import RelayPlugin, { decodeGlobalID } from '@pothos/plugin-relay'
import DataloaderPlugin, {
  LoadableNodeOptions,
} from '@pothos/plugin-dataloader'
import { DateResolver, JSONResolver } from 'graphql-scalars'
import { GraphQLParams, YogaServerOptions } from 'graphql-yoga'
import listPlugin from './pothos-list'

const builder = new SchemaBuilder<{
  Context: { request: Request; params: GraphQLParams } & Record<string, unknown>
  DefaultFieldNullability: true
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
  plugins: [RelayPlugin, DataloaderPlugin, listPlugin],
  defaultFieldNullability: true,
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
  },
})

// Initialize base-types
builder.queryType({
  fields: (t) => ({
    _version: t.string({
      nullable: false,
      resolve: () => process.env.npm_package_version as string,
    }),
  }),
})

builder.mutationType({
  fields: (t) => ({
    _version: t.string({
      nullable: false,
      resolve: () => process.env.npm_package_version as string,
    }),
  }),
})
builder.addScalarType('JSON', JSONResolver, {})
builder.addScalarType('Date', DateResolver, {})

export type GetContext<
  ServerOptions extends Record<string, any> = {},
  UserOptions extends Record<string, any> = {},
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
 * query-able from `node(id: ID!): Node` and `nodes(ids: [ID!]!): [Node]`. Additionally a Query.typeName
 * will be created that you can query with (id: ID!).
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
 * export const LaunchNode = node<OutputType, typeof key>({
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
  Key extends string | number = string,
  Interfaces extends
    InterfaceParam<BuilderTypes>[] = InterfaceParam<BuilderTypes>[],
>(opts: {
  name: string
  key?: string
  description?: string
  load: (
    ids: Array<string | Key>,
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
  const node = builder.loadableNode(opts.name, {
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
      ids: Array<Key>,
      ctx: { request: Request; params: GraphQLParams } & Record<
        string,
        unknown
      >,
    ) {
      const translatedIds = ids.map((id) => {
        try {
          if (typeof id !== 'string') return id
          const decoded = decodeGlobalID(id)
          return decoded.id
        } catch (e) {
          return id
        }
      })
      const results = await opts.load(translatedIds, ctx)
      return results.map((result) =>
        result instanceof Error ? result : { ...result, __typename: opts.name },
      )
    },
  })

  builder.queryField(
    '' + opts.name[0].toLowerCase() + opts.name.slice(1),
    (t) =>
      t.field({
        type: node,
        args: {
          id: t.arg.id({ required: true }),
        },
        // @ts-expect-error
        resolve: (parent, args) => {
          return args.id as string
        },
      }),
  )

  return node
}

/**
 * A function to create an (unkeyed) object that can be resolved, this can subsequently be used in a
 * query/mutation/node/...
 *
 * @example
 * ```ts
 * const Location = objectType<Resource['location']>({
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
export function objectType<
  T,
  Interfaces extends
    InterfaceParam<BuilderTypes>[] = InterfaceParam<BuilderTypes>[],
>(
  opts: { name: string } & Omit<
    ObjectTypeOptions<
      BuilderTypes,
      ImplementableObjectRef<BuilderTypes, T, T>,
      T,
      Interfaces
    >,
    'name'
  >,
) {
  const { name, ...options } = opts
  return builder.objectRef<T>(name).implement(options)
}

/**
 * Add entry points to the graph, these can subsequently be used from your
 * front-end to query data.
 *
 * @example
 * ```ts
 * addQueryFields((t) => ({
 *   launches: t.list({
 *     description: 'Get a paginated list of launches.',
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
 * addMutationFields((t) => ({
 *   addToCart: t.field({
 *     description: 'Add a product to the cart.',
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
 * Add more fields to an existing objectType.
 *
 * @example
 * ```ts
 * addObjectFields(CartObject, (t) => ({
 *   user: t.field({
 *     description: 'The user owning a certain cart.',
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
 * addNodeFields(LaunchNode, (t) => ({
 *   rocket: t.field({
 *     description: 'The rocket used for a given launch.',
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
 * const SiteStatus = enumType({
 *  name: 'SiteStatus',
 *  description: 'Describes the Status of a given Launch Site',
 *  values: ['ACTIVE', 'INACTIVE', 'UNKNOWN'] as const
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
export const enumType = <Values extends EnumValues<BuilderTypes>>(
  opts: { name: string } & EnumTypeOptions<BuilderTypes, string, Values>,
): EnumRef<ShapeFromEnumValues<BuilderTypes, Values>> => {
  const { name, ...options } = opts
  return builder.enumType<string, Values>(name, options)
}

interface InputObjectTypeOptions<
  Types extends SchemaTypes = BuilderTypes,
  Fields extends InputFieldMap = InputFieldMap,
> {
  isOneOf?: boolean
  fields: (t: InputFieldBuilder<Types, 'InputObject'>) => Fields
  description?: string
  extensions?: Readonly<Record<string, unknown>>
}

/**
 * Creates a re-usable input-type that can be used in arguments to your fields.
 *
 * @example
 * ```ts
 * const Pagination = inputType({
 *   description: 'The default pagination input type, allowing you to specify a limit and offset',
 *   name: 'Pagination',
 *   fields: (t) => ({
 *     limit: t.int({ default: 10 }),
 *     offset: t.int({ default: 0 })
 *   })
 * })
 *
 * addQueryFields((t) => ({
 *   myList: t.list({
 *     args: input: t.arg({ type: Pagination })
 *   })
 * })
 * ```
 */
export const inputType = <Fields extends InputFieldMap>(
  opts: { name: string } & InputObjectTypeOptions<BuilderTypes, Fields>,
): InputObjectRef<InputShapeFromFields<Fields>> => {
  const { name, ...options } = opts
  return builder.inputType(name, options)
}

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
export const interfaceType = (
  opts: Parameters<(typeof builder)['interfaceType']>['1'] & { name: string },
) => {
  const { name, ...options } = opts
  return builder.interfaceRef(name).implement(options)
}

/**
 * Creates a union of types, these can be used in fields and will then have to resolve to
 * one of the union types.
 *
 * @example
 * ```ts
 * const NewInterface = unionType({
 *   name: 'Resource',
 *   resolveType: (parent) => 'Engine',
 *   types: [Fuel, Engine]
 * })
 * ```
 */
export const unionType = (
  opts: Parameters<(typeof builder)['unionType']>['1'] & { name: string },
) => {
  const { name, ...options } = opts
  return builder.unionType(name, options)
}
