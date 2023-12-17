#!/usr/bin/env node
import sade from 'sade'
import path from 'path'
import fs, { appendFile } from 'fs/promises'
import { createServer, build } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { generate, CodegenContext } from '@graphql-codegen/cli'
import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import { existsSync } from 'fs'

const prog = sade('fuse')

prog.version('0.0.0')

prog
  .command('build')
  .describe('Creates the build output for server and client.')
  .option(
    '--adapter',
    'Which adapter to use for building, options are Lambda, CloudFlare and Node (default)',
    'node',
  )
  .option(
    '--server',
    'Whether to look for the "types/" directory and create a server build output.',
  )
  .option(
    '--client',
    'Whether to look for GraphQL documents and generate types.',
  )
  .option(
    '--schema',
    'Where to find the schema, either a "*.graphql" file or an endpoint that can be introspected.',
    './schema.graphql',
  )
  .action(async (opts) => {
    if (!opts.server && !opts.client) {
      opts.server = true
      opts.client = true
    }

    if (opts.server) {
      const baseDirectory = process.cwd()
      let entryPoint = 'node.mjs'
      switch (opts.adapter) {
        case 'lambda': {
          entryPoint = 'lambda.mjs'
          break
        }
        case 'cloudflare': {
          entryPoint = 'cloudflare.mjs'
          break
        }
        default: {
          entryPoint = 'node.mjs'
          break
        }
      }

      await build({
        build: {
          outDir: path.resolve(baseDirectory, 'build'),
          rollupOptions: {
            logLevel: 'silent',
          },
        },
        plugins: [
          ...VitePluginNode({
            async adapter() {
              // Redundant during build
            },
            appName: 'fuse',
            appPath: path.resolve(
              baseDirectory,
              'node_modules',
              'fuse',
              'dist',
              'adapters',
              entryPoint,
            ),
            exportName: 'main',
          }),
        ],
      })

      console.log('Server build output created in ./build')
    }

    if (opts.client) {
      await boostrapCodegen(opts.schema, false)
    }
  })
  .command('dev')
  .describe('Runs the dev-server for the client and server by default.')
  .option(
    '--port',
    'Which port to use for the dev-server (default: 4000)',
    4000,
  )
  .option(
    '--server',
    'Whether to look for the "types/" directory and create a server build output.',
  )
  .option(
    '--client',
    'Whether to look for GraphQL documents and generate types.',
  )
  .option(
    '--schema',
    'Where to find the schema, either a "*.graphql" file or an endpoint that can be introspected.',
    './schema.graphql',
  )
  .action(async (opts) => {
    if (!opts.server && !opts.client) {
      opts.server = true
      opts.client = true
    }

    const baseDirectory = process.cwd()

    if (opts.server) {
      let yoga
      const server = await createServer({
        plugins: [
          ...VitePluginNode({
            initAppOnBoot: true,
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

      server.watcher.on('change', async (file) => {
        if (file.includes('types/')) {
          server.restart()
        }
      })

      await server.listen(opts.port)
      console.log(`Server listening on http://localhost:${opts.port}/graphql`)
    }

    if (opts.client) {
      await boostrapCodegen(opts.schema, true)
    }
  })

prog.parse(process.argv)

async function boostrapCodegen(location: string, watch: boolean) {
  const baseDirectory = process.cwd()
  const hasSrcDir = existsSync(path.resolve(baseDirectory, 'src'))

  const ctx = new CodegenContext({
    filepath: 'codgen.yml',
    config: {
      ignoreNoDocuments: true,
      errorsOnly: true,
      noSilentErrors: true,
      watch: watch
        ? [
            hasSrcDir
              ? baseDirectory + '/src/**/*.{ts,tsx}'
              : baseDirectory + '/**/*.{ts,tsx}',
          ]
        : false,
      schema: location,
      generates: {
        [baseDirectory + '/fuse/']: {
          documents: [
            hasSrcDir ? './src/**/*.{ts,tsx}' : './**/*.{ts,tsx}',
            '!./{node_modules,.next,.git}/**/*',
          ],
          preset: 'client',
          // presetConfig: {
          //   persistedDocuments: true,
          // },
          config: {
            scalars: {
              ID: {
                input: 'string',
                output: 'string',
              },
              DateTime: DateTimeResolver.extensions.codegenScalarType,
              JSON: JSONResolver.extensions.codegenScalarType,
            },
            avoidOptionals: false,
            enumsAsTypes: true,
            nonOptionalTypename: true,
            skipTypename: false,
          },
        },
      },
    },
  })

  await generate(ctx, true)

  console.log('\n\n\n\n\nWAT\n\n\n\n\n')

  await appendFile(
    baseDirectory + '/fuse' + '/index.ts',
    '\nexport * from "fuse/client"',
  )
}
