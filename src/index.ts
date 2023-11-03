import SchemaBuilder from '@pothos/core'
import SimpleObjects from '@pothos/plugin-simple-objects'
import RelayPlugin from '@pothos/plugin-relay'
import DataloaderPlugin from '@pothos/plugin-dataloader'
import { printSchema } from 'graphql';
import { createYoga } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import path from 'path'
import fs from 'fs/promises';

export const builder = new SchemaBuilder({
  plugins: [
    SimpleObjects,
    RelayPlugin,
    DataloaderPlugin
  ],
   relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
   }
})

// Initialize base-types
builder.queryType({
  fields: t => ({ _version: t.string({
    resolve: () => '0.0.1'
  }) })
})
// builder.mutationType({})
// builder.subscriptionType({})

const baseDir = process.cwd();
const typesDir = path.resolve(process.cwd(), 'types');
export async function main() {
  const files = await fs.readdir(baseDir + '/types');
  await Promise.all(files.map(fileName => {
    /* @vite-ignore */
    return import(path.resolve(typesDir, fileName))
  }))

  const completedSchema = builder.toSchema({});
  console.log(printSchema(completedSchema))
  fs.writeFile(path.resolve(baseDir, 'schema.graphql'), printSchema(completedSchema), 'utf-8')

  return createYoga({
    schema: completedSchema,
    plugins: [
      useDeferStream()
    ]
  })
}
