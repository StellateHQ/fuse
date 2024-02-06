import { promises as fs, watch, existsSync } from 'fs'
import path from 'path'
import { buildSchema, introspectionFromSchema } from 'graphql'
import { minifyIntrospectionQuery } from '@urql/introspection'

export async function isUsingGraphQLTada(cwd: string): Promise<boolean> {
  const [pkgJson, tsConfig] = await Promise.allSettled([
    fs.readFile(path.resolve(cwd, 'package.json'), 'utf-8'),
    fs.readFile(path.resolve(cwd, 'tsconfig.json'), 'utf-8'),
  ])

  if (pkgJson.status === 'rejected' || tsConfig.status === 'rejected') {
    return false
  }

  try {
    const parsed = JSON.parse(pkgJson.value as string)
    const merged = Object.keys({
      ...parsed.dependencies,
      ...parsed.devDependencies,
    })
    if (!merged.find((x) => x.includes('gql.tada'))) {
      return false
    }

    if (!merged.find((x) => x.includes('@0no-co/graphqlsp'))) {
      return false
    }
  } catch (e) {
    return false
  }

  try {
    const parsed = JSON.parse(tsConfig.value as string)
    const lspPlugin = parsed.compilerOptions.plugins.find(
      (plugin: any) => plugin.name === '@0no-co/graphqlsp',
    )
    if (!lspPlugin) {
      return false
    }

    if (!lspPlugin.tadaOutputLocation) {
      return false
    }
  } catch (e) {
    // unparseable, this can happen due to comments in tsconfig
    return (
      tsConfig.value.includes('@0no-co/graphqlsp') &&
      tsConfig.value.includes('tadaOutputLocation')
    )
  }

  return true
}

export const tadaGqlContents = `import { initGraphQLTada } from 'gql.tada';
import type { introspection } from './introspection';

export const graphql = initGraphQLTada<{
  introspection: typeof introspection;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';
export type { FragmentOf as FragmentType } from 'gql.tada';
export { readFragment } from 'gql.tada';
export { readFragment as useFragment } from 'gql.tada';
`

/**
 * This function mimics the behavior of the LSP, this so we can ensure
 * that gql.tada will work in any environment. The JetBrains IDE's do not
 * implement the tsserver plugin protocol hence in those and editors where
 * we are not able to leverage the workspace TS version we will rely on
 * this function.
 */
export async function ensureTadaIntrospection(
  location: string,
  shouldWatch: boolean,
) {
  const schemaLocation = path.resolve(location, 'schema.graphql')

  const writeTada = async () => {
    try {
      const content = await fs.readFile(schemaLocation, 'utf-8')
      const schema = buildSchema(content)
      const introspection = introspectionFromSchema(schema, {
        descriptions: false,
      })
      const minified = minifyIntrospectionQuery(introspection, {
        includeDirectives: false,
        includeEnums: true,
        includeInputs: true,
        includeScalars: true,
      })

      const json = JSON.stringify(minified, null, 2)
      const hasSrcDir = existsSync(path.resolve(location, 'src'))
      const base = hasSrcDir ? path.resolve(location, 'src') : location

      const outputLocation = path.resolve(base, 'fuse', 'introspection.ts')
      const contents = [
        preambleComments,
        tsAnnotationComment,
        `const introspection = ${json} as const;\n`,
        'export { introspection };',
      ].join('\n')

      await fs.writeFile(outputLocation, contents)
    } catch (e) {}
  }

  await writeTada()
  if (shouldWatch) {
    watch(schemaLocation, async () => {
      await writeTada()
    })
  }
}

const preambleComments =
  ['/* eslint-disable */', '/* prettier-ignore */'].join('\n') + '\n'

const tsAnnotationComment = [
  '/** An IntrospectionQuery representation of your schema.',
  ' *',
  ' * @remarks',
  ' * This is an introspection of your schema saved as a file by GraphQLSP.',
  ' * You may import it to create a `graphql()` tag function with `gql.tada`',
  ' * by importing it and passing it to `initGraphQLTada<>()`.',
  ' *',
  ' * @example',
  ' * ```',
  " * import { initGraphQLTada } from 'gql.tada';",
  " * import type { introspection } from './introspection';",
  ' *',
  ' * export const graphql = initGraphQLTada<{',
  ' *   introspection: typeof introspection;',
  ' *   scalars: {',
  ' *     DateTime: string;',
  ' *     Json: any;',
  ' *   };',
  ' * }>();',
  ' * ```',
  ' */',
].join('\n')
