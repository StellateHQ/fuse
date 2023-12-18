import 'fuse'
import { addAuthScope, Scopes } from 'fuse'

declare module 'fuse' {
  export interface Scopes {
    isLoggedIn: boolean
  }
}

addAuthScope<Scopes['isLoggedIn']>(
  'isLoggedIn',
  (ctx) => ctx.user !== undefined,
)
