import { generate, CodegenContext } from '@graphql-codegen/cli'
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
async function boostrapCodegen(port: number, path: string) {
  const baseDirectory = process.cwd()
  const ctx = new CodegenContext({
    filepath: 'codgen.yml',
    config: {
      ignoreNoDocuments: true,
      errorsOnly: true,
      noSilentErrors: true,
      watch: [baseDirectory + '/**/*.tsx', baseDirectory + '/types/**/*.ts'],
      schema: `http://localhost:${port}/api/${path}`,
      documents: './**/*.tsx',
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
