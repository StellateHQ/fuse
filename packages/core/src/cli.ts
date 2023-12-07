#!/usr/bin/env node
import sade from 'sade'
import path from 'path'
import fs from 'fs/promises'
import { createServer } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

const prog = sade('datalayer')

prog.version('0.0.0')

prog
  .command('dev')
  .describe('Build the source directory. Expects a `/types` folder.')
  .option(
    '--port',
    'Which port to use for the dev-server (default: 4000)',
    4000,
  )
  .action(async (opts) => {
    const baseDirectory = process.cwd()

    let yoga
    const server = await createServer({
      plugins: [
        ...VitePluginNode({
          async adapter({ app, req, res }) {
            yoga = await app(opts).then((yo) => {
              fs.writeFile(
                path.resolve(baseDirectory, 'schema.graphql'),
                yo.stringifiedSchema,
                'utf-8',
              )

              return yo
            })
            await yoga.handle(req, res)
          },
          appPath: path.resolve(
            baseDirectory,
            'node_modules',
            'fuse',
            'dist',
            'dev.mjs',
          ),
          exportName: 'main',
        }),
      ],
    })

    server.watcher.on('change', async () => {
      server.restart()
      //yoga = undefined;
    })

    // TODO: codegen

    await server.listen(opts.port)

    console.log(`Server listening on http://localhost:${opts.port}/graphql`)
  })

prog.parse(process.argv)
