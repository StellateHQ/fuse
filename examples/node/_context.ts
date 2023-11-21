import { GetContext } from 'fuse'

export const getContext: GetContext = (ctx) => {
  return {
    ua: ctx.request.headers.get('user-agent'),
  }
}
