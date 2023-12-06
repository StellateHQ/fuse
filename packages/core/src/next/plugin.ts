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
  return (config?: any): any => {
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
    return config
  }
}

// prettier-ignore
const requireSnippet = () => `const files = require.context('../types', true, /\.ts$/);
files
  .keys()
  .filter((path: string) => path.includes('types/'))
  .forEach(files);`

async function boostrapFuse() {
  const baseDirectory = process.cwd()
  try {
    if (!existsSync(baseDirectory + '/fuse')) {
      await fs.mkdir(baseDirectory + '/fuse')
    }

    await Promise.allSettled([
      fs.writeFile(
        baseDirectory + '/fuse/server.ts',
        `// This is a generated file!\n\n${requireSnippet()}\n\nexport * from 'fuse/next/server'\n`,
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
          documents: [
            './**/*.ts',
            './**/*.tsx',
            '!./node_modules/**/*',
            '!./.next/**/*',
            '!./.fuse/**/*',
            '!./.git/**/*',
          ],
          plugins: [
            {
              add: {
                content: '// This is a generated file!\n',
              },
            },
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
