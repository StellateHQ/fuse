import { defineConfig, Options } from 'tsup'

export default defineConfig(async () => {
  const baseOptions: Options = {
    platform: 'node',

    splitting: false,
    format: ['esm', 'cjs'],
    target: 'node18',
    env: {
      // env var `npm_package_version` gets injected in runtime by npm/yarn automatically
      // this replacement is for build time, so it can be used for both
      npm_package_version:
        process.env.npm_package_version ??
        (await import('./package.json')).version,
    },
    skipNodeModulesBundle: true,
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
      entry: ['src/index.ts'],
      external: [/fuse/],
      dts: {
        entry: 'src/index.ts',
        resolve: false,
      },
    },
    {
      ...baseOptions,
      entry: ['src/plugin.ts'],
      external: [/fuse/],
      dts: {
        entry: 'src/plugin.ts',
        resolve: true,
      },
    },
    {
      ...baseOptions,
      entry: ['src/rsc.ts'],
      external: [/fuse/],
      dts: {
        entry: 'src/rsc.ts',
        resolve: true,
      },
    },
    {
      ...baseOptions,
      entry: ['src/client.ts'],
      external: [/fuse/, /react/, /react-dom/, /next/, /@urql\/core/, /urql/],
      clean: true,
      cjsInterop: false,
      target: 'es2015',
      skipNodeModulesBundle: false,
      legacyOutput: true,
      platform: 'browser',
      dts: {
        entry: 'src/client.ts',
        resolve: false,
      },
    },
    {
      ...baseOptions,
      entry: ['src/pages.ts'],
      external: [/fuse/, /react/, /react-dom/, /next/, /@urql\/core/, /urql/],
      clean: true,
      cjsInterop: false,
      target: 'es2015',
      skipNodeModulesBundle: false,
      legacyOutput: true,
      platform: 'browser',
      dts: {
        entry: 'src/pages.ts',
        resolve: false,
      },
    },
  ]
})
