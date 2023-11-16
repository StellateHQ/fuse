import { GetContext } from '../dist/builder.mjs'

export const getContext: GetContext = (ctx) => {
  return {
    ua: ctx.request.headers.get('user-agent')
  }
}