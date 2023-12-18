import 'fuse'

declare module 'fuse' {
  export interface Scopes {
    isLoggedIn: boolean
  }
}
