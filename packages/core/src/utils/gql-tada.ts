import { promises as fs } from 'fs'
import path from 'path'

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
    if (
      !parsed.dependencies['gql.tada'] &&
      !parsed.devDependencies['gql.tada']
    ) {
      return false
    }

    if (
      !parsed.dependencies['@0no-co/graphqlsp'] &&
      !parsed.devDependencies['@0no-co/graphqlsp']
    ) {
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
    return false
  }

  return true
}

export const tadaGqlContents = `import { initGraphQLTada } from 'gql.tada';
import type { introspection } from '../introspection';

export const graphql = initGraphQLTada<{
  introspection: typeof introspection;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';
export { readFragment } from 'gql.tada';
`
