import { generate, CodegenContext } from '@graphql-codegen/cli'
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
            boostrapCodegen(options.port || 3000, options.path || 'datalayer')
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
      watch: baseDirectory + '/**/*.tsx',
      schema: `http://localhost:${port}/api/${path}`,
      documents: './**/*.tsx',
      generates: {
        [baseDirectory + '/gql/']: {
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
              DateTime: 'string',
              JSON: 'Record<string, any>',
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
