import { createAPIRouteHandler } from 'fuse/next'
import persistedDocuments from '@/fuse/persisted-documents.json'

const layer = createAPIRouteHandler({
  persistedOperations: {
    enabled: true,
    operations: persistedDocuments,
  },
})

export const GET = layer
export const POST = layer
