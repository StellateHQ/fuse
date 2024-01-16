import { existsSync, promises as fs } from 'fs'
import { resolve } from 'path'

interface Options {
  port?: number
  path?: string
}

let isRunningCodegen = false
export function nextFusePlugin(options: Options = {}) {
  return (nextConfig: any = {}): any => {
    if (process.env.NODE_ENV === 'development' && !isRunningCodegen) {
      boostrapFuse()
      try {
        isRunningCodegen = true
        setTimeout(() => {
          try {
            // TODO: check whether we need to write introspection.ts here
          } catch (e) {}
        }, 1000)
      } catch (e) {}
    }

    const newNextConfig = Object.assign({}, nextConfig, {
      webpack(webpackConfig, webpackOptions) {
        webpackConfig.module.rules.push({
          test: [
            /pages[\\/]api[\\/]fuse.ts/,
            /app[\\/]api[\\/]fuse[\\/]route.ts/,
            /fuse[\\/]server.ts/,
          ],
          use: [
            webpackOptions.defaultLoaders.babel,
            { loader: 'fuse/next/loader' },
          ],
        })

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(webpackConfig, webpackOptions)
        }

        return webpackConfig
      },
    })

    return newNextConfig
  }
}

async function boostrapFuse() {
  let baseDirectory = process.cwd()
  try {
    const hasSrcDir = existsSync(resolve(baseDirectory, 'src'))
    if (hasSrcDir) {
      baseDirectory = resolve(baseDirectory, 'src')
    }
    if (!existsSync(baseDirectory + '/fuse')) {
      await fs.mkdir(baseDirectory + '/fuse')
    }

    await Promise.allSettled([
      fs.writeFile(
        baseDirectory + '/fuse/server.ts',
        `// This is a generated file!\n\nexport * from 'fuse/next/server'\n`,
      ),
      fs.writeFile(
        baseDirectory + '/fuse/client.ts',
        `// This is a generated file!\n\nexport * from 'fuse/next/client'\n`,
      ),
      fs.writeFile(
        baseDirectory + '/fuse/pages.ts',
        `// This is a generated file!\n\nexport * from 'fuse/next/pages'\n`,
      ),
    ])
  } catch (e) {}
}
