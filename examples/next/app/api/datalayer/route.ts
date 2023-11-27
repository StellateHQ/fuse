import { datalayer } from '@fuse/next'

const keys = require.context('../../../types', true, /\.ts$/)
keys
  .keys()
  .filter((x) => x.includes('types/'))
  .forEach(keys)

export const dynamic = 'force-dynamic'
const layer = datalayer()
export const GET = layer
export const POST = layer
