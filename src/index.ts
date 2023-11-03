import SchemaBuilder from '@pothos/core'
import SimpleObjects from '@pothos/plugin-simple-objects'
import RelayPlugin from '@pothos/plugin-relay'
import DataloaderPlugin from '@pothos/plugin-dataloader'
import { printSchema } from 'graphql';
import { createYoga } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import path from 'path'
import fs from 'fs/promises';

export { createRestDatasource } from './RESTDatasource'

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
const modules = import.meta.glob("/types/*.ts");

export async function main() {
  const promises: Array<any> = [];
  for (const path in modules) {
    promises.push(modules[path]())
  }

  await Promise.all(promises);
  const completedSchema = builder.toSchema({});
  fs.writeFile(path.resolve(baseDir, 'schema.graphql'), printSchema(completedSchema), 'utf-8')

  return createYoga({
    schema: completedSchema,
    plugins: [
      useDeferStream()
    ]
  })
}
