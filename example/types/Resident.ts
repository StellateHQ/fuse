import { builder, createRestDatasource } from '../../dist/builder.mjs'
import { PlanetNode } from "./Planet";

interface ResidentType {
  id: string;
  name: string;
  height: string;
  mass: string;
}

const peopleDatasource = createRestDatasource<ResidentType>('https://swapi.dev/api', 'people');
const Resident = builder.objectRef<ResidentType>('Resident');

builder.node(Resident, {
  id: {
    resolve: (resident) => resident.id,
  },
  isTypeOf: (item) => {
    return item && (item as any).mass;
  },
  fields: (t) => ({
    name: t.exposeString('name'),
    height: t.exposeString('height'),
    mass: t.exposeString('mass'),
  }),
  async loadMany(ids) {
    const results = await Promise.all(ids.map(id => peopleDatasource.get(id)))
    return results.map((x, i) => ({
      ...x,
      id: String(i + 1)
    }))
  },
  brandLoadedObjects: true,
});

builder.objectField(PlanetNode, 'residents', (t) => t.loadable({
  type: [Resident],
  nullable: true,
  async load(ids: Array<string>, context) {
    const results = await Promise.allSettled(ids.map(url => {
      const parts = url.split('/');
      const id = parts[parts.length - 2];
      return peopleDatasource.get(id);
    }))

    return results.map((x, i) => x.status === 'fulfilled' ? ({
      ...x.value,
      id: String(i + 1)
    }) : null)
  },
  resolve: (parent) => {
    return parent.residents
  }
}))