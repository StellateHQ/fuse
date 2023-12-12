#!/usr/bin/env node
import sade from 'sade'
import path from 'path'
import fs from 'fs/promises'
import { createServer, build } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { generate, CodegenContext } from '@graphql-codegen/cli'
import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import { existsSync } from 'fs'

const prog = sade('fuse')

prog.version('0.0.0')

prog
  .command('build')
  .option(
    '--adapter',
    'Which adapter to use for building, options are Lambda, CloudFlare and Node (default)',
    'node',
  )
  .action(async (opts) => {
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

    return build({
      build: {
        outDir: path.resolve(baseDirectory, 'build'),
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
  })
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

    boostrapCodegen(opts.port)

    console.log(`Server listening on http://localhost:${opts.port}/graphql`)
  })

prog.parse(process.argv)

async function boostrapCodegen(port: number) {
  const baseDirectory = process.cwd()
  const hasSrcDir = existsSync(path.resolve(baseDirectory, 'src'))

  const ctx = new CodegenContext({
    filepath: 'codgen.yml',
    config: {
      ignoreNoDocuments: true,
      errorsOnly: true,
      noSilentErrors: true,
      watch: [
        hasSrcDir
          ? baseDirectory + '/src/**/*.{ts,tsx}'
          : baseDirectory + '/**/*.{ts,tsx}',
        baseDirectory + '/types/**/*.ts',
      ],
      schema: `http://localhost:${port}/graphql`,
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
}
