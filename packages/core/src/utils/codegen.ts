import { generate, CodegenContext } from '@graphql-codegen/cli'
import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import { existsSync, promises as fs } from 'fs'
import path from 'path'

export async function boostrapCodegen(location: string, watch: boolean) {
  const baseDirectory = process.cwd()
  const hasSrcDir = existsSync(path.resolve(baseDirectory, 'src'))

  const contents = `export * from "./fragment-masking";
export * from "./gql";
export * from "fuse/client";\n`
  const ctx = new CodegenContext({
    filepath: 'codgen.yml',
    config: {
      ignoreNoDocuments: true,
      errorsOnly: true,
      noSilentErrors: true,
      hooks: {
        afterOneFileWrite: async () => {
          await fs.writeFile(
            hasSrcDir
              ? baseDirectory + '/src/fuse/index.ts'
              : baseDirectory + '/fuse/index.ts',
            contents,
          )
        },
      },
      watch: watch
        ? [
            hasSrcDir
              ? baseDirectory + '/src/**/*.{ts,tsx}'
              : baseDirectory + '/**/*.{ts,tsx}',
            '!./{node_modules,.next,.git}/**/*',
            hasSrcDir ? '!./src/fuse/*.{ts,tsx}' : '!./fuse/*.{ts,tsx}',
          ]
        : false,
      schema: location,
      generates: {
        [hasSrcDir ? baseDirectory + '/src/fuse/' : baseDirectory + '/fuse/']: {
          documents: [
            hasSrcDir ? './src/**/*.{ts,tsx}' : './**/*.{ts,tsx}',
            '!./{node_modules,.next,.git}/**/*',
            hasSrcDir ? '!./src/fuse/*.{ts,tsx}' : '!./fuse/*.{ts,tsx}',
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
