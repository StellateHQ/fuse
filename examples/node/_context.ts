import { GetContext } from 'fuse'

export const getContext: GetContext<{}, { ua: string | null }> = (ctx) => {
  return {
    ua: ctx.request.headers.get('user-agent'),
  }
}
