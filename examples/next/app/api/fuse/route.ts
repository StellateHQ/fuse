import { createAPIRouteHandler } from 'fuse/next'

const keys = require.context('../../../types', true, /\.ts$/)
keys
  .keys()
  .filter((x: string) => x.includes('types/'))
  .forEach(keys)

const layer = createAPIRouteHandler()

export const GET = layer
export const POST = layer
