import { datalayer } from '@fuse/next'

const keys = require.context('../../../types', true, /\.ts$/)
keys
  .keys()
  .filter((x) => x.includes('types/'))
  .forEach(keys)

export const dynamic = 'force-dynamic'
// TODO: find a way to pipe in _context.ts if one is preesent
export const GET = datalayer()
export const POST = datalayer()
