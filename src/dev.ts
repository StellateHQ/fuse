import { printSchema } from 'graphql';
import http from 'http';
// Yoga-features
import { createYoga } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { builder } from './builder'

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
    (yoga as any).stringifiedSchema = printSchema(completedSchema);
    (yoga as any).resetBuilder = resetBuilder;
    return yoga;
  }
}

main();
