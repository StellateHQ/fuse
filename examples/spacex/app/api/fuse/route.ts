import { createAPIRouteHandler } from 'fuse/next'

const layer = createAPIRouteHandler({
  context: (req) => ({ user: true }),
})

export const GET = layer
export const POST = layer
