import { defineConfig, Options } from 'tsup'

export default defineConfig(async () => {
  const baseOptions: Options = {
    platform: 'node',

    splitting: false,
    format: ['esm', 'cjs'],
    target: 'node18',
    env: {
      NODE_ENV: 'production',
      // env var `npm_package_version` gets injected in runtime by npm/yarn automatically
      // this replacement is for build time, so it can be used for both
      npm_package_version:
        process.env.npm_package_version ??
        (await import('../../package.json')).version,
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
      entry: ['src/bin.ts'],
    },
    {
      ...baseOptions,
      entry: ['src/node.ts'],
      external: [/builder/],
    },
    {
      ...baseOptions,
      entry: ['src/next.ts'],
      external: [/builder/],
      dts: {
        entry: 'src/next.ts',
        resolve: true,
      },
    },
    {
      ...baseOptions,
      entry: ['src/cloudflare.ts'],
      external: [/builder/],
    },
    {
      ...baseOptions,
      entry: ['src/lambda.ts'],
      external: [/builder/],
    },
    {
      ...baseOptions,
      entry: ['src/dev.ts'],
      external: [/builder/],
    },
    {
      ...baseOptions,
      entry: ['src/builder.ts'],
      dts: {
        entry: 'src/builder.ts',
        resolve: true,
        banner: `import '@pothos/core'
import '@pothos/plugin-dataloader'
import '@pothos/plugin-relay'`,
      },
    },
  ]
})
