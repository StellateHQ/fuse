import { createAPIRouteHandler } from 'fuse/next'

const layer = createAPIRouteHandler<{ userId: string }>({
  context: () => ({
    // For demo purposes everyone is the same user
    userId: '1',
  }),
})

export const GET = layer
export const POST = layer
