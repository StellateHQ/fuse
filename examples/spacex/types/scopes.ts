import 'fuse'
import { defineAuthScopes, Scopes } from 'fuse'

declare module 'fuse' {
  export interface Scopes {
    isLoggedIn: boolean
  }
}

defineAuthScopes<Scopes>((ctx) => ({ isLoggedIn: !!ctx.user }))
