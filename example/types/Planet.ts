import { builder, createRestDatasource } from '../../dist/index.mjs'


interface PlanetType {
  id: string;
  name: string;
  climate: string;
  population: number;
  // TODO: residents connection
  // TODO: films connection
}

const planetDatasource = createRestDatasource<PlanetType>('https://swapi.dev/api', 'planets');
const Planet = builder.objectRef<PlanetType>('Planet');

const PlanetNode = builder.node(Planet, {
  id: {
    resolve: (planet) => planet.id,
  },
  isTypeOf: (item) => {
    return item && (item as any).population;
  },
  fields: (t) => ({
    name: t.exposeString('name'),
    climate: t.exposeString('climate'),
    population: t.exposeInt('population'),
  }),
  async loadMany(ids) {
    const results = await Promise.all(ids.map(id => planetDatasource.get(id)))
    return results.map((x, i) => ({
      ...x,
      id: String(i + 1)
    }))
  },
  async loadOne(id) {
    const result = await planetDatasource.get(id);
    return {
      ...result,
      id: String(id)
    }
  },
  brandLoadedObjects: true,
});

builder.queryField('planets', (t) => t.connection({
  type: PlanetNode,
  resolve: async (_, args) => {
    const result = await planetDatasource.getMany(10, 1);
    return {
      edges: result.nodes.map((x, i) => ({
        cursor: String(i + 1),
        node: { ...x, id: String(i + 1) }
      })),
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
      }
    }
  }
}))

builder.queryField('planet', (t) => t.field({
  nullable: true,
  type: PlanetNode,
  args: { id: t.arg.id({ required: true }) },
  resolve: async (_, args) => {
    return { ...await planetDatasource.get(args.id + ''), id: args.id + '',  };
  }
}))
