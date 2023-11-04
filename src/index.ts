import { printSchema } from 'graphql';
import path from 'path'
import http from 'http';
import fs from 'fs/promises';
// Yoga-features
import { createYoga, YogaServerOptions } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
// TODO: in production: disable-introspection, block-field-suggestions
// TODO: support for an _context file that allows for Context additions/typing
// TODO: authn and authz features
// TODO: proper logger support
// TODO: create persisted-operations integration where when this is co-located with
// the front-end generates the appropriate manifest
// Pothos features
import SchemaBuilder from '@pothos/core'
import RelayPlugin from '@pothos/plugin-relay'
import DataloaderPlugin from '@pothos/plugin-dataloader'

export type GetContext<ServerOptions extends Record<string, any> = {}, UserOptions extends Record<string, any> = {}> = NonNullable<YogaServerOptions<ServerOptions, UserOptions>['context']>
export { createRestDatasource } from './datasources/rest'

export const builder = new SchemaBuilder({
  plugins: [
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
builder.mutationType({
  fields: t => ({ _version: t.string({
    resolve: () => '0.0.1'
  }) })
})
// builder.subscriptionType({})

const baseDir = process.cwd();
const modules = import.meta.glob("/types/*.ts");
const context = import.meta.glob("/_context.ts");

export async function main() {
  const promises: Array<any> = [];
  let ctx;
  if (context['/_context.ts']) {
    promises.push(context['/_context.ts']().then((mod) => {
      if ((mod as any).getContext) {
        ctx = (mod as any).getContext;
      }
    }));
  }

  for (const path in modules) {
    promises.push(modules[path]())
  }

  await Promise.all(promises);
  const completedSchema = builder.toSchema({});
  if (!import.meta.env.PROD) {
    // TODO: this part is localdev _and_ node specific
    fs.writeFile(path.resolve(baseDir, 'schema.graphql'), printSchema(completedSchema), 'utf-8')
  }

  const yoga = createYoga({
    schema: completedSchema,
    // We allow batching by default
    batching: true,
    context: ctx,
    plugins: [
      useDeferStream()
    ]
  })

  // TODO: this part is node-specific
  if (import.meta.env.PROD) {
    const server = http.createServer(yoga);
    server.listen(4000)
  } else {
    return yoga;
  }
}

main();
