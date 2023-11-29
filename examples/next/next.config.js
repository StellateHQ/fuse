const { nextFusePlugin } = require('fuse/next/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = nextFusePlugin()({})

module.exports = nextConfig
