import { builder, createRestDatasource } from '../../dist/builder.mjs'
import { PlanetNode } from "./Planet";

interface FilmType {
  id: string;
  title: string;
  director: string;
  producer: string;
}

const filmDatasource = createRestDatasource<FilmType>('https://swapi.dev/api', 'films');
const Film = builder.objectRef<FilmType>('Film');

builder.node(Film, {
  id: {
    resolve: (film) => film.id,
  },
  isTypeOf: (item) => {
    return item && (item as any).producer;
  },
  fields: (t) => ({
    title: t.exposeString('title'),
    producer: t.exposeString('producer'),
    director: t.exposeString('director'),
  }),
  async loadMany(ids) {
    const results = await Promise.all(ids.map(id => filmDatasource.get(id)))
    return results.map((x, i) => ({
      ...x,
      id: String(i + 1)
    }))
  },
  brandLoadedObjects: true,
});

builder.objectField(PlanetNode, 'films', (t) => t.loadable({
  type: [Film],
  async load(ids: Array<string>, _context) {
    const results = await Promise.all(ids.map(url => {
      const parts = url.split('/');
      const id = parts[parts.length - 2];
      return filmDatasource.get(id);
    }))
    return results.map((x, i) => ({
      ...x,
      id: String(i + 1)
    }))
  },
  resolve: (parent) => {
    return parent.films
  }
}))