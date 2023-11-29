import { datalayer } from 'fuse/next'

const keys = require.context('../../../types', true, /\.ts$/)
keys
  .keys()
  .filter((x) => x.includes('types/'))
  .forEach(keys)

const layer = datalayer({
  context: ({ request }) => {
    return {
      ua: request.headers.get('user-agent'),
      headers: {
        'my-rest-header': 'test',
      },
    }
  },
})

export const GET = layer
export const POST = layer
