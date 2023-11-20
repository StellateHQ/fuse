import { builder, RestDatasource, node } from '../../dist/builder.mjs'
import { PlanetNode } from './Planet'

interface FilmType {
  id: string
  title: string
  director: string
  producer: string
}

const filmDatasource = new RestDatasource<FilmType>(
  'https://swapi.dev/api',
  'films',
)
const Film = node(builder, 'Film', filmDatasource).implement({
  isTypeOf: (item) => {
    return item && (item as any).producer
  },
  fields: (t) => ({
    title: t.exposeString('title'),
    producer: t.exposeString('producer'),
    director: t.exposeString('director'),
  }),
})

builder.objectField(PlanetNode, 'films', (t) =>
  t.loadable({
    type: [Film],
    async load(ids: Array<string>, _context) {
      const results = await Promise.all(
        ids.map((url) => {
          const parts = url.split('/')
          const id = parts[parts.length - 2]
          return filmDatasource.getOne(id)
        }),
      )
      return results.map((x, i) => ({
        ...x,
        id: String(i + 1),
      }))
    },
    resolve: (parent) => {
      return parent.films
    },
  }),
)
