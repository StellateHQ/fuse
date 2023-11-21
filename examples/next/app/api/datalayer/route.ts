import { datalayer } from 'fuse/next'
import { builder } from 'fuse'

const keys = require.context('../../../types', true, /\.ts$/)
keys
  .keys()
  .filter((x) => x.includes('types/'))
  .forEach(keys)

export const dynamic = 'force-dynamic'
export const GET = datalayer(builder)
export const POST = datalayer(builder)
