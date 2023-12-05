import { createAPIRouteHandler } from 'fuse/next'

const files = require.context('../../../types', true, /\.ts$/)
files
  .keys()
  .filter((path: string) => path.includes('types/'))
  .forEach(files)

const layer = createAPIRouteHandler()

export const GET = layer
export const POST = layer
