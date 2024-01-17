import path from 'path'
import { generate, CodegenContext } from '@graphql-codegen/cli'
import { existsSync, promises as fs } from 'fs'
import { resolve } from 'path'
import { DateTimeResolver, JSONResolver } from 'graphql-scalars'

import { isUsingGraphQLTada, tadaGqlContents } from '../utils/gql-tada'

interface Options {
  port?: number
  path?: string
}

let isRunningCodegen = false
export function nextFusePlugin(options: Options = {}) {
  return (nextConfig: any = {}): any => {
    if (process.env.NODE_ENV === 'development' && !isRunningCodegen) {
      isUsingGraphQLTada(process.cwd()).then((isUsing) => {
        boostrapFuse(isUsing)
        try {
          isRunningCodegen = true
          setTimeout(() => {
            try {
              if (!isUsing) {
                boostrapCodegen(options.port || 3000, options.path || 'fuse')
              }
            } catch (e) {}
          }, 1000)
        } catch (e) {}
      })
    }

    const newNextConfig = Object.assign({}, nextConfig, {
      webpack(webpackConfig, webpackOptions) {
        webpackConfig.module.rules.push({
          test: [
            /pages[\\/]api[\\/]fuse.ts/,
            /app[\\/]api[\\/]fuse[\\/]route.ts/,
            /fuse[\\/]server.ts/,
          ],
          use: [
            webpackOptions.defaultLoaders.babel,
            { loader: 'fuse/next/loader' },
          ],
        })

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(webpackConfig, webpackOptions)
        }

        return webpackConfig
      },
    })

    return newNextConfig
  }
}

async function boostrapFuse(isUsingTada: boolean) {
  let baseDirectory = process.cwd()
  try {
    const hasSrcDir = existsSync(resolve(baseDirectory, 'src'))
    if (hasSrcDir) {
      baseDirectory = resolve(baseDirectory, 'src')
    }

    if (!existsSync(baseDirectory + '/fuse')) {
      await fs.mkdir(baseDirectory + '/fuse')
    }

    await Promise.allSettled(
      [
        fs.writeFile(
          baseDirectory + '/fuse/server.ts',
          `// This is a generated file!\n\nexport * from 'fuse/next/server'\n`,
        ),
        fs.writeFile(
          baseDirectory + '/fuse/client.ts',
          `// This is a generated file!\n\nexport * from 'fuse/next/client'\n`,
        ),
        fs.writeFile(
          baseDirectory + '/fuse/pages.ts',
          `// This is a generated file!\n\nexport * from 'fuse/next/pages'\n`,
        ),
        isUsingTada &&
          fs.writeFile(
            path.resolve(baseDirectory, 'fuse/index.ts'),
            `// This is a generated file!\n\nexport * from './tada'\n`,
          ),
        isUsingTada &&
          fs.writeFile(
            path.resolve(baseDirectory, 'fuse/tada.ts'),
            tadaGqlContents,
          ),
      ].filter(Boolean),
    )

    if (isUsingTada) {
    }
  } catch (e) {}
}

async function boostrapCodegen(port: number, path: string) {
  let baseDirectory = process.cwd()
  const hasSrcDir = existsSync(resolve(baseDirectory, 'src'))
  if (hasSrcDir) {
    baseDirectory = resolve(baseDirectory, 'src')
  }

  const ctx = new CodegenContext({
    filepath: 'codgen.yml',
    config: {
      ignoreNoDocuments: true,
      errorsOnly: true,
      noSilentErrors: true,
      watch: [
        baseDirectory + '/**/*.{ts,tsx}',
        baseDirectory + '/types/**/*.ts',
      ],
      schema: `http://localhost:${port}/api/${path}`,
      generates: {
        [baseDirectory + '/fuse/']: {
          documents: ['./**/*.{ts,tsx}', '!./{node_modules,.next,.git}/**/*'],
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
