import type { GetContext, InitialContext } from 'fuse'

declare module 'fuse' {
  export interface UserContext {
    ua: string | null
  }
}

export const getContext = (
  ctx: InitialContext,
): GetContext<{ ua: string | null }> => {
  return {
    ua: ctx.request.headers.get('user-agent'),
  }
}
