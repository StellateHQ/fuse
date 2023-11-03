#!/usr/bin/env node
import sade from 'sade';
import path from 'path';
import { createServer } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

const prog = sade('datalayer');

prog.version('0.0.0')

prog
  .command('dev')
  .describe('Build the source directory. Expects a `/types` folder.')
  .action(async () => {
    const baseDirectory = process.cwd();

    const server = await createServer({
      plugins: [
        ...VitePluginNode({
          async adapter({ app, server, req, res, next }) {
            const yoga = await app();
            await yoga.handle(req, res)
          },
          appPath: path.resolve(baseDirectory, '..', 'dist', 'index.mjs'),
          exportName: 'main'
        })
      ]
    })

    await server.listen(4000);
    console.log(`Server listening on http://localhost:4000/graphql`)
  });

prog.parse(process.argv);