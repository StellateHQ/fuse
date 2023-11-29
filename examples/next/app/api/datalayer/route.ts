import { datalayer } from 'fuse/next'

const keys = require.context('../../../types', true, /\.ts$/)
keys
  .keys()
  .filter((x) => x.includes('types/'))
  .forEach(keys)

export const dynamic = 'force-dynamic'
const layer = datalayer((p1) => {
  return {
    ua: p1.request.headers.get('user-agent'),
    headers: {
      'my-rest-header': 'test',
    },
  }
})

export const GET = layer
export const POST = layer
