import { builder, createRestDatasource, node } from '../../dist/builder.mjs'

interface PlanetType {
  id: string
  name: string
  climate: string
  population: string
  residents: string[]
  films: string[]
}

// TODO: replace this API as it does not allow setting the pageSize
const planetDatasource = createRestDatasource<PlanetType>(
  'https://swapi.dev/api',
  'planets',
)

export const PlanetNode = node(builder, 'Planet', planetDatasource).implement({
  isTypeOf: (item) => {
    return item && (item as any).climate
  },
  fields: (t) => ({
    name: t.exposeString('name'),
    climate: t.exposeString('climate'),
    population: t.exposeString('population'),
  }),
})

builder.queryField('planets', (t) =>
  t.connection({
    type: PlanetNode,
    resolve: async (_, args) => {
      const page = args.after ? Math.floor(Number(args.after) / 10) : 0
      const result = await planetDatasource.list(10, page + 1)
      return {
        edges: result.nodes.map((x, i) => ({
          cursor: String(i + 1 + page * 10),
          node: { ...x, id: String(i + 1 + page * 10), __typename: 'Planet' },
        })),
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
        },
      }
    },
  }),
)

builder.queryField('planet', (t) =>
  t.loadable({
    nullable: true,
    type: PlanetNode,
    args: { id: t.arg.id({ required: true }) },
    async load(keys: string[]) {
      return await Promise.all(
        keys.map((id) =>
          planetDatasource.get(id).then((result) => ({ ...result, id })),
        ),
      )
    },
    resolve: async (_, args) => {
      return args.id + ''
    },
  }),
)
