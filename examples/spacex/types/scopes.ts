import 'fuse'
import { addAuthScopes, Scopes } from 'fuse'

declare module 'fuse' {
  export interface Scopes {
    isLoggedIn: boolean
  }
}

addAuthScopes<Scopes>((ctx) => ({ isLoggedIn: !!ctx.user }))
