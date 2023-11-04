import { GetContext } from '../dist/index.mjs'

export const getContext: GetContext = (ctx) => {
  return {
    ua: ctx.request.headers.get('user-agent')
  }
}