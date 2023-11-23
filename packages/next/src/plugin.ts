import { generate, CodegenContext } from '@graphql-codegen/cli'
// Add when enabling persisted operations
// import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset';

interface Options {
  port?: number
}

export function nextFusePlugin(options: Options = {}) {
  let isRunningCodegen = false
  return (config?: any): any => {
    if (process.env.NODE_ENV === 'development' && !isRunningCodegen) {
      isRunningCodegen = true
      setTimeout(() => {
        boostrapCodegen(options.port || 3000)
      }, 1000)
    }
    return config
  }
}
async function boostrapCodegen(port: number) {
  const baseDirectory = process.cwd()
  const ctx = new CodegenContext({
    filepath: 'codgen.yml',
    config: {
      ignoreNoDocuments: true,
      errorsOnly: true,
      noSilentErrors: true,
      watch: baseDirectory + '/**/*.tsx',
      schema: `http://localhost:${port}/api/datalayer`,
      documents: './**/*.tsx',
      generates: {
        [baseDirectory + '/gql/']: {
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
