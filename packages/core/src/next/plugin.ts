import { generate, CodegenContext } from '@graphql-codegen/cli'
import { existsSync, promises as fs } from 'fs'
import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
// Add when enabling persisted operations
// import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset';

interface Options {
  port?: number
  path?: string
}

export function nextFusePlugin(options: Options = {}) {
  let isRunningCodegen = false
  return (nextConfig: any = {}): any => {
    if (process.env.NODE_ENV === 'development' && !isRunningCodegen) {
      boostrapFuse()
      try {
        isRunningCodegen = true
        setTimeout(() => {
          try {
            boostrapCodegen(options.port || 3000, options.path || 'fuse')
          } catch (e) {}
        }, 1000)
      } catch (e) {}
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

async function boostrapFuse() {
  const baseDirectory = process.cwd()
  // TODO: this should also take the potential /src
  // in account
  try {
    if (!existsSync(baseDirectory + '/fuse')) {
      await fs.mkdir(baseDirectory + '/fuse')
    }

    await Promise.allSettled([
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
    ])
  } catch (e) {}
}

async function boostrapCodegen(port: number, path: string) {
  const baseDirectory = process.cwd()

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
