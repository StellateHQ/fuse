import { createAPIRouteHandler } from 'fuse/next'
import persistedDocuments from '@/fuse/persisted-documents.json'

const files = require.context('../../../types', true, /\.ts$/)
files
  .keys()
  .filter((path: string) => path.includes('types/'))
  .forEach(files)

const layer = createAPIRouteHandler({
  persistedOperationsStore: persistedDocuments,
})

export const GET = layer
export const POST = layer
