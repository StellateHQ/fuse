import { generate, CodegenContext } from '@graphql-codegen/cli'
import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
// Add when enabling persisted operations
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset'

interface Options {
  port?: number
  path?: string
}

export function nextFusePlugin(options: Options = {}) {
  let isRunningCodegen = false
  return (config?: any): any => {
    if (process.env.NODE_ENV === 'development' && !isRunningCodegen) {
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
      documents: [
        './**/*.ts',
        './**/*.tsx',
        '!./node_modules/**/*',
        '!./.next/**/*',
        '!./.fuse/**/*',
        '!./.git/**/*',
      ],
      generates: {
        [baseDirectory + '/fuse/']: {
          plugins: [
            {
              add: {
                content: '// This is a generated file!\n',
              },
            },
          ],
          preset: 'client',
          presetConfig: {
            persistedDocuments: true,
          },
          documentTransforms: [addTypenameSelectionDocumentTransform],
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
        [baseDirectory + '/fuse/server.ts']: {
          plugins: [
            {
              add: {
                content: `// This is a generated file!\n\n${requireSnippet()}\n\nexport * from 'fuse/next/server'\n`,
              },
            },
          ],
        },
        [baseDirectory + '/fuse/client.ts']: {
          plugins: [
            {
              add: {
                content: `// This is a generated file!\n\nexport * from 'fuse/next/client'\n`,
              },
            },
          ],
        },
        [baseDirectory + '/fuse/pages.ts']: {
          plugins: [
            {
              add: {
                content: `// This is a generated file!\n\nexport * from 'fuse/next/pages'\n`,
              },
            },
          ],
        },
      },
    },
  })
  await generate(ctx, true)
}
