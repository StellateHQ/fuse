const { nextFusePlugin } = require('fuse/next/plugin')
const loader = require('./loader')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: [/app[\\/]api[\\/]fuse[\\/]route.ts/, /fuse[\\/]server.ts/],
      use: [options.defaultLoaders.babel, { loader: './loader' }],
    })

    if (typeof config.webpack === 'function') {
      return config.webpack(config, options)
    }

    return config
  },
}

module.exports = nextConfig
