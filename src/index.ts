import { g, buildSchema, printSchema, GarphSchema } from 'garph'
import { createYoga } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import path from 'path'
import fs from 'fs/promises';

const baseDir = process.cwd();
const typesDir = path.resolve(process.cwd(), 'types');
export async function main() {
  const files = await fs.readdir(baseDir + '/types');
  const results = await Promise.all(files.map(fileName => {
    /* @vite-ignore */
    return import(path.resolve(typesDir, fileName)).then(x => x.resolvers)
  }))
  const resolvers = results.reduce((acc, item) => {
    if (!item) return acc;

    // TODO: make deep-merge
    return {
      ...acc,
      ...item,
      Query: {
        ...acc.Query,
        ...item.Query,
      }
    }
  }, {})

  const completedSchema = new GarphSchema({ types: [...g.types, g.pageInfoType] })
  fs.writeFile(path.resolve(baseDir, 'schema.graphql'), printSchema(completedSchema), 'utf-8')
  return createYoga({
    schema: buildSchema({ g: completedSchema, resolvers }),
    plugins: [
      useDeferStream()
    ]
  })
}
