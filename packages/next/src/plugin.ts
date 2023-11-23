import { generate, CodegenContext } from '@graphql-codegen/cli'

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
          config: {
            avoidOptionals: false,
            enumsAsTypes: true,
            nonOptionalTypename: true,
          },
        },
      },
    },
  })
  await generate(ctx, true)
}
