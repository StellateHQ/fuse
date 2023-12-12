import { GetContext, InitialContext } from 'fuse'

export const getContext = (
  ctx: InitialContext,
): GetContext<{ ua: string | null }> => {
  return {
    ua: ctx.request.headers.get('user-agent'),
  }
}
