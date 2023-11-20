import { builder, RestDatasource, node } from '../../dist/builder.mjs'
import { PlanetNode } from './Planet'

interface ResidentType {
  id: string
  name: string
  height: string
  mass: string
}

const peopleDatasource = new RestDatasource<ResidentType>(
  'https://swapi.dev/api',
  'people',
)

const Resident = node(builder, 'Resident', peopleDatasource).implement({
  isTypeOf: (item) => {
    return item && (item as any).mass
  },
  fields: (t) => ({
    name: t.exposeString('name'),
    height: t.exposeString('height'),
    mass: t.exposeString('mass'),
  }),
})

builder.objectField(PlanetNode, 'residents', (t) =>
  t.loadable({
    type: [Resident],
    nullable: true,
    async load(urls: Array<string>) {
      const results = await Promise.allSettled(
        urls.map((url) => {
          const parts = url.split('/')
          const id = parts[parts.length - 2]
          return peopleDatasource.getOne(id)
        }),
      )

      return results.map((x, i) =>
        x.status === 'fulfilled'
          ? {
              ...x.value,
              id: String(i + 1),
            }
          : null,
      )
    },
    resolve: (parent) => {
      return parent.residents
    },
  }),
)
