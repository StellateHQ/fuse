#!/usr/bin/env node
import { promises as fs, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import * as prompts from '@clack/prompts'
import babel from '@babel/core'
import * as kl from 'kolorist'
import { type PackageJson, TsConfigJson } from 'type-fest'
import rewriteNext from './rewrite-next'
import { getPkgManager } from './get-package-manager'
import { install } from './install-package'
import { parse, stringify } from 'comment-json'

const s = prompts.spinner()

async function createFuseApp() {
  const packageManager = getPkgManager()

  prompts.intro(kl.trueColor(219, 254, 1)('Fuse - Your new API'))

  s.start('Installing fuse...')
  await install(packageManager, 'prod', ['fuse', 'gql.tada', 'graphql'])
  await install(packageManager, 'dev', [
    '@0no-co/graphqlsp',
    '@graphql-typed-document-node/core',
  ])
  s.stop(kl.green('Installed fuse!'))

  // TODO: we can prompt for the name of the dir in the future
  // when we make this work standalone
  const targetDir = resolve(process.cwd())

  const packageJson = await fs.readFile(
    resolve(targetDir, 'package.json'),
    'utf-8',
  )
  const { dependencies, devDependencies } = JSON.parse(
    packageJson,
  ) as PackageJson
  const allDeps = { ...dependencies, ...devDependencies }
  const nextVersion = allDeps['next']

  if (!nextVersion) {
    s.start('Creating Base files..')

    // prettier-ignore
    const contextCopy = `import { GetContext, InitialContext } from 'fuse'

    export const getContext = (
      ctx: InitialContext,
    ): GetContext<{ ua: string | null }> => {
      return {
        ua: ctx.request.headers.get('user-agent'),
      }
    }\n`
    await fs.writeFile(resolve(targetDir, '_context.ts'), contextCopy)
    if (!existsSync(resolve(targetDir, 'types'))) {
      await fs.mkdir(resolve(targetDir, 'types'))
    }
    await fs.writeFile(
      resolve(targetDir, 'types', 'User.ts'),
      initialTypeSnippet,
    )
    await writeGraphQLSP(targetDir)
    await updateTSConfig(targetDir, existsSync(resolve(targetDir, 'src')))
    s.stop('Created Base files!')

    prompts.outro(
      kl.trueColor(219, 254, 1)("You're all set to work with your Fuse API!"),
    )
    return
  }

  // Create initial types and API-Route
  s.start('Creating API Route...')
  const isUsingSrc = existsSync(resolve(targetDir, 'src'))
  const shouldUseAppDir = existsSync(
    isUsingSrc ? resolve(targetDir, 'src', 'app') : resolve(targetDir, 'app'),
  )
  const apiRouteSnippet = createSnippet(shouldUseAppDir)

  if (isUsingSrc) {
    const apiRoute = shouldUseAppDir
      ? resolve(targetDir, 'src', 'app', 'api', 'fuse', 'route.ts')
      : resolve(targetDir, 'src', 'pages', 'api', 'fuse.ts')

    if (shouldUseAppDir) {
      const apiFolder = resolve(targetDir, 'src', 'app', 'api')
      if (!existsSync(apiFolder)) await fs.mkdir(apiFolder)

      const fuseDir = resolve(targetDir, 'src', 'app', 'api', 'fuse')
      if (!existsSync(fuseDir)) await fs.mkdir(fuseDir)
    } else {
      const apiPagesFolder = resolve(targetDir, 'src', 'pages', 'api')
      if (!existsSync(apiPagesFolder)) await fs.mkdir(apiPagesFolder)
    }

    await fs.writeFile(apiRoute, apiRouteSnippet)

    if (!existsSync(resolve(targetDir, 'src', 'types'))) {
      await fs.mkdir(resolve(targetDir, 'src', 'types'))
    }

    await fs.writeFile(
      resolve(targetDir, 'src', 'types', 'User.ts'),
      initialTypeSnippet,
    )
  } else {
    const apiRoute = shouldUseAppDir
      ? resolve(targetDir, 'app', 'api', 'fuse', 'route.ts')
      : resolve(targetDir, 'pages', 'api', 'fuse.ts')

    if (shouldUseAppDir) {
      const apiFolder = resolve(targetDir, 'app', 'api')
      if (!existsSync(apiFolder)) await fs.mkdir(apiFolder)

      const fuseDir = resolve(targetDir, 'app', 'api', 'fuse')
      if (!existsSync(fuseDir)) await fs.mkdir(fuseDir)
    } else {
      const apiPagesFolder = resolve(targetDir, 'pages', 'api')
      if (!existsSync(apiPagesFolder)) await fs.mkdir(apiPagesFolder)
    }

    await fs.writeFile(apiRoute, apiRouteSnippet)
    if (!existsSync(resolve(targetDir, 'types'))) {
      await fs.mkdir(resolve(targetDir, 'types'))
    }

    await fs.writeFile(
      resolve(targetDir, 'types', 'User.ts'),
      initialTypeSnippet,
    )
  }
  s.stop(kl.green('Created API Route!'))

  // Add next plugin to config
  s.start('Adding Fuse plugin to Next config...')
  const hasJsConfig = existsSync(resolve(targetDir, 'next.config.js'))
  const hasMjsConfig = existsSync(resolve(targetDir, 'next.config.mjs'))

  if (hasJsConfig) {
    try {
      const code = await fs.readFile(
        resolve(targetDir, 'next.config.js'),
        'utf-8',
      )
      const result = await babel.transformAsync(code, {
        plugins: [[rewriteNext, { isMjs: false }]],
      })
      if (result.code) {
        await fs.writeFile(
          resolve(targetDir, 'next.config.js'),
          result.code,
          'utf-8',
        )
      }
    } catch (e) {}
  } else if (hasMjsConfig) {
    try {
      const code = await fs.readFile(
        resolve(targetDir, 'next.config.mjs'),
        'utf-8',
      )
      const result = await babel.transformAsync(code, {
        plugins: [[rewriteNext, { isMjs: true }]],
      })
      if (result.code) {
        await fs.writeFile(
          resolve(targetDir, 'next.config.mjs'),
          result.code,
          'utf-8',
        )
      }
    } catch (e) {}
  } else {
    prompts.text({
      message:
        'No next config found, you can add the fuse plugin yourself by importing it from "fuse/next/plugin"!',
    })
  }

  await writeGraphQLSP(targetDir)
  await updateTSConfig(targetDir, existsSync(resolve(targetDir, 'src')))

  s.stop(kl.green('Added Fuse plugin to next config!'))
  prompts.outro(
    kl.trueColor(219, 254, 1)("You're all set to work with your Fuse API!"),
  )
}

createFuseApp().catch(console.error)

const writeGraphQLSP = async (targetDir: string) => {
  if (existsSync(resolve(targetDir, '.vscode', 'settings.json'))) {
    const vscodeSettingsFile = await fs.readFile(
      resolve(targetDir, '.vscode', 'settings.json'),
      'utf-8',
    )
    const vscodeSettings = JSON.parse(vscodeSettingsFile)

    if (
      vscodeSettings['typescript.tsdk'] !== 'node_modules/typescript/lib' ||
      vscodeSettings['typescript.enablePromptUseWorkspaceTsdk'] !== true
    ) {
      await fs.writeFile(
        resolve(targetDir, '.vscode', 'settings.json'),
        JSON.stringify(generateVscodeSettings(vscodeSettings), undefined, 2),
        'utf-8',
      )
    }
  } else {
    if (!existsSync(resolve(targetDir, '.vscode'))) {
      await fs.mkdir(resolve(targetDir, '.vscode'))
    }

    await fs.writeFile(
      resolve(targetDir, '.vscode', 'settings.json'),
      JSON.stringify(generateVscodeSettings(), undefined, 2),
      'utf-8',
    )
  }
}

const updateTSConfig = async (targetDir: string, hasSrcDir: boolean) => {
  if (existsSync(resolve(targetDir, 'tsconfig.json'))) {
    const tsConfigFile = await fs.readFile(
      resolve(targetDir, 'tsconfig.json'),
      'utf-8',
    )
    const tsConfig = parse(tsConfigFile) as TsConfigJson
    if (
      !tsConfig.compilerOptions?.plugins?.find(
        (plugin) => plugin.name === '@0no-co/graphqlsp',
      )
    ) {
      const updatedTsConfig = {
        ...tsConfig,
        include: [
          ...(tsConfig.include || []),
          hasSrcDir ? './src/fuse/introspection.ts' : './fuse/introspection.ts',
        ],
        compilerOptions: {
          ...tsConfig.compilerOptions,
          plugins: [
            ...(tsConfig.compilerOptions?.plugins || []),
            {
              name: '@0no-co/graphqlsp',
              schema: './schema.graphql',
              tadaOutputLocation: hasSrcDir
                ? './src/fuse/introspection.ts'
                : './fuse/introspection.ts',
            },
          ],
        },
      }
      await fs.writeFile(
        resolve(targetDir, 'tsconfig.json'),
        stringify(updatedTsConfig, undefined, 2),
        'utf-8',
      )
    }
  }
}

const initialTypeSnippet = `import { node } from 'fuse'
 
type UserSource = {
  id: string
  name: string
  avatar_url: string
}
 
// "Nodes" are the core abstraction of Fuse. Each node represents
// a resource/entity with multiple fields and has to define two things:
// 1. load(): How to fetch from the underlying data source
// 2. fields: What fields should be exposed and added for clients
export const UserNode = node<UserSource>({
  name: 'User',
  load: async (ids) => getUsers(ids),
  fields: (t) => ({
    name: t.exposeString('name'),
    // rename to camel-case
    avatarUrl: t.exposeString('avatar_url'),
    // Add an additional firstName field
    firstName: t.string({
      resolve: (user) => user.name.split(' ')[0],
    }),
  }),
})
 
// Fake function to fetch users. In real applications, this would
// talk to an underlying REST API/gRPC service/third-party API/…
async function getUsers(ids: string[]): Promise<UserSource[]> {
  return ids.map((id) => ({
    id,
    name: \`Peter #\${id}\`,
    avatar_url: \`https://i.pravatar.cc/300?u=\${id}\`,
  }))
}`

const createSnippet = (appDir) => `import { ${
  appDir ? 'createAPIRouteHandler' : 'createPagesRouteHandler'
} } from 'fuse/next'
  
const handler = ${
  appDir ? 'createAPIRouteHandler' : 'createPagesRouteHandler'
}()
  
${
  appDir
    ? `export const GET = handler\nexport const POST = handler`
    : `export default handler`
}
`

function generateVscodeSettings(settings: any = {}) {
  return {
    ...settings,
    'typescript.tsdk': 'node_modules/typescript/lib',
    'typescript.enablePromptUseWorkspaceTsdk': true,
  }
}
