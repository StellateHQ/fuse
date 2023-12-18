import 'fuse'
import { addAuthScope } from 'fuse'

declare module 'fuse' {
  export interface Scopes {
    isLoggedIn: boolean
  }
}

addAuthScope('isLoggedIn', (ctx) => ctx.user !== undefined)
