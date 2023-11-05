import { printSchema } from 'graphql';
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
export { createRestDatasource } from '../datasources/rest'

// TODO: expand all connections to have a totalCount field
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

// TODO: this will probably need to be eager or replaced by a plugin
const modules = import.meta.glob("/types/*.ts");
const context = import.meta.glob("/_context.ts");

async function fetch(request) {
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

  const yoga = createYoga({
    schema: completedSchema,
    // We allow batching by default
    batching: true,
    context: ctx,
    plugins: [
      useDeferStream()
    ]
  })

  return yoga.fetch(request, ctx)
}

export default { fetch }
