import { defineConfig, Options } from 'tsup'

export default defineConfig(async () => {
  const baseOptions: Options = {
    platform: 'node',

    splitting: false,
    format: ['esm', 'cjs'],
    skipNodeModulesBundle: true,
    target: 'node18',
    env: {
      // env var `npm_package_version` gets injected in runtime by npm/yarn automatically
      // this replacement is for build time, so it can be used for both
      npm_package_version:
        process.env.npm_package_version ??
        (await import('./package.json')).version,
    },
    minify: false,
    clean: true,
  }

  /**
   * We create distinct options so that no type declarations are reused and
   * exported into a separate file, in other words, we want all `d.ts` files
   * to not contain any imports.
   */
  return [
    {
      ...baseOptions,
      entry: ['src/builder.ts'],
      dts: {
        entry: 'src/builder.ts',
        banner: `import '@pothos/core'
import '@pothos/plugin-dataloader'
import '@pothos/plugin-relay'`,
      },
    },
    {
      ...baseOptions,
      entry: ['src/cli.ts'],
      format: ['esm'],
      external: [/builder/],
    },
    {
      ...baseOptions,
      entry: ['src/dev.ts'],
      format: ['esm'],
      external: [/builder/],
    },
    {
      ...baseOptions,
      entry: ['src/adapters/node.ts'],
      outDir: 'dist/adapters',
      format: ['esm'],
      external: [/builder/],
    },
    {
      ...baseOptions,
      entry: ['src/adapters/lambda.ts'],
      outDir: 'dist/adapters',
      format: ['esm'],
      external: [/builder/],
    },
    {
      ...baseOptions,
      entry: ['src/adapters/cloudflare.ts'],
      outDir: 'dist/adapters',
      format: ['esm'],
      external: [/builder/],
    },
    {
      ...baseOptions,
      entry: ['src/next/index.ts'],
      outDir: 'dist/next',
      external: [/fuse/],
      dts: {
        entry: 'src/next/index.ts',
        resolve: false,
      },
    },
    {
      ...baseOptions,
      entry: ['src/next/plugin.ts'],
      outDir: 'dist/next',
      dts: {
        entry: 'src/next/plugin.ts',
        resolve: true,
      },
    },
    {
      ...baseOptions,
      entry: ['src/next/rsc.ts'],
      outDir: 'dist/next',
      dts: {
        entry: 'src/next/rsc.ts',
        resolve: true,
      },
    },
    {
      ...baseOptions,
      entry: ['src/next/client.ts'],
      external: [
        /react/,
        /@urql\/core/,
        /urql/,
        /@urql\/next/,
        /next\/navigation/,
      ],
      outDir: 'dist/next',
      clean: true,
      cjsInterop: false,
      target: 'es2015',
      skipNodeModulesBundle: false,
      legacyOutput: true,
      platform: 'browser',
      dts: {
        entry: 'src/next/client.ts',
        resolve: false,
      },
    },
    {
      ...baseOptions,
      entry: ['src/next/pages.ts'],
      external: [/react/, /@urql\/core/, /urql/],
      outDir: 'dist/next',
      clean: true,
      cjsInterop: false,
      target: 'es2015',
      skipNodeModulesBundle: false,
      legacyOutput: true,
      platform: 'browser',
      dts: {
        entry: 'src/next/pages.ts',
        resolve: false,
      },
    },
  ]
})
