#!/usr/bin/env node
import sade from 'sade';
import path from 'path';
import { createServer, build } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import chokidar from 'chokidar';

const prog = sade('datalayer');

prog.version('0.0.0')

prog
  .command('dev')
  .describe('Build the source directory. Expects a `/types` folder.')
  .action(async () => {
    const baseDirectory = process.cwd();

    let yoga;
    const server = await createServer({
      plugins: [
        ...VitePluginNode({
          async adapter({ app, server, req, res, next }) {
            if (!yoga) {
              yoga = await app();
            } else if (yoga.then) {
              yoga.then(async () => {
                await yoga.handle(req, res)
              })
            } else {
              await yoga.handle(req, res)
            }
          },
          appPath: path.resolve(baseDirectory, '..', 'dist', 'index.mjs'),
          exportName: 'main'
        })
      ]
    })

    server.watcher.add(path.resolve(baseDirectory, 'types'))
    server.watcher.on('change', () => {
      console.log('Change detected!')
    })

    await server.listen(4000);
    console.log(`Server listening on http://localhost:4000/graphql`)
  });

prog.parse(process.argv);