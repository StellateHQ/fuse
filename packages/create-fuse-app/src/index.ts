#!/usr/bin/env node
import { promises as fs, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import * as prompts from '@clack/prompts'
import { install } from 'pkg-install'
import babel from '@babel/core'
import * as kl from 'kolorist'
import { type PackageJson, TsConfigJson } from 'type-fest'
import rewriteNext from './rewrite-next'

const s = prompts.spinner()

async function createFuseApp() {
  const packageManager = /yarn/.test(process.env.npm_execpath || '')
    ? 'yarn'
    : 'npm'

  prompts.intro(kl.trueColor(176, 203, 1)('Fuse - Your new datalayer'))

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
    throw new Error(
      'Could not find "next" as a dependency in your package.json. Please install Next.js first.',
    )
  }

  // Install dependencies
  s.start('Installing fuse...')
  await install(['fuse'], {
    prefer: packageManager,
    cwd: targetDir,
    dev: false,
  })
  await install(['@0no-co/graphqlsp', '@graphql-typed-document-node/core'], {
    prefer: packageManager,
    cwd: targetDir,
    dev: true,
  })
  s.stop(kl.green('Installed fuse!'))

  // Create initial types and API-Route
  s.start('Creating API Route...')
  const isUsingSrc = existsSync(resolve(targetDir, 'src'))
  const shouldUseAppDir = existsSync(resolve(targetDir, 'app'))
  const apiRouteSnippet = createSnippet(shouldUseAppDir)

  if (isUsingSrc) {
    const dir = shouldUseAppDir
      ? resolve(targetDir, 'src', 'app', 'api', 'fuse', 'route.ts')
      : resolve(targetDir, 'src', 'pages', 'api', 'fuse.ts')

    if (shouldUseAppDir) {
      await fs.mkdir(resolve(targetDir, 'src', 'app', 'api'))
      await fs.mkdir(resolve(targetDir, 'src', 'app', 'api', 'fuse'))
    } else {
      await fs.mkdir(resolve(targetDir, 'src', 'pages', 'api'))
    }
    await fs.writeFile(dir, apiRouteSnippet)
    await fs.mkdir(resolve(targetDir, 'src', 'types'))
    await fs.writeFile(
      resolve(targetDir, 'src', 'types', 'User.ts'),
      initialTypeSnippet,
    )
  } else {
    const dir = shouldUseAppDir
      ? resolve(targetDir, 'app', 'api', 'fuse', 'route.ts')
      : resolve(targetDir, 'pages', 'api', 'fuse.ts')
    if (shouldUseAppDir) {
      await fs.mkdir(resolve(targetDir, 'app', 'api'))
      await fs.mkdir(resolve(targetDir, 'app', 'api', 'fuse'))
    } else {
      await fs.mkdir(resolve(targetDir, 'pages', 'api'))
    }
    await fs.writeFile(dir, apiRouteSnippet)
    await fs.mkdir(resolve(targetDir, 'types'))
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
          resolve(targetDir, 'next.config.js'),
          result.code,
          'utf-8',
        )
      }
    } catch (e) {}
  } else {
    console.log(
      'No next config found, you can add the fuse plugin yourself by importing it from "fuse/next/plugin"!',
    )
  }

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
    await fs.mkdir(resolve(targetDir, '.vscode'))
    await fs.writeFile(
      resolve(targetDir, '.vscode', 'settings.json'),
      JSON.stringify(generateVscodeSettings(), undefined, 2),
      'utf-8',
    )
  }

  const tsConfigFile = await fs.readFile(
    resolve(targetDir, 'tsconfig.json'),
    'utf-8',
  )
  const tsConfig = JSON.parse(tsConfigFile) as TsConfigJson
  if (
    !tsConfig.compilerOptions?.plugins?.find(
      (plugin) => plugin.name === '@0no-co/graphqlsp',
    )
  ) {
    const updatedTsConfig = {
      ...tsConfig,
      compilerOptions: {
        ...tsConfig.compilerOptions,
        plugins: [
          ...(tsConfig.compilerOptions?.plugins || []),
          {
            name: '@0no-co/graphqlsp',
            schema: './schema.graphql',
            disableTypegen: true,
            templateIsCallExpression: true,
            template: 'graphql',
          },
        ],
      },
    }
    await fs.writeFile(
      resolve(targetDir, 'tsconfig.json'),
      JSON.stringify(updatedTsConfig, undefined, 2),
      'utf-8',
    )
  }
  s.stop(kl.green('Added Fuse plugin to next config!'))
}

createFuseApp().catch(console.error)

const initialTypeSnippet = `import { node } from 'fuse'
 
type UserSource = {
  id: string
  name: string
  avatar_url: string
}
 
// "Nodes" are the core abstraction of Fuse.js. Each node represents
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

// NOTE: This makes Fuse.js automatically pick up every type in the /types folder
// Alternatively, you can manually import each type in the /types folder and remove this snippet
// @ts-expect-error
const files = require.context(${
  appDir ? "'../../../types'" : "'../../types'"
}, true, /\.ts$/)
files
  .keys()
  .filter((path: string) => path.includes('types/'))
  .forEach(files)
  
const handler = ${
  appDir ? 'createAPIRouteHandler' : 'createPagesRouteHandler'
}()
  
${
  appDir
    ? `export const GET = handler\nexport const POST = handler`
    : `export default handler`
}
` // TODO: change bottom part for pages

function generateVscodeSettings(settings: any = {}) {
  return {
    ...settings,
    'typescript.tsdk': 'node_modules/typescript/lib',
    'typescript.enablePromptUseWorkspaceTsdk': true,
  }
}
