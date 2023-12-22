import 'fuse'

declare module 'fuse' {
  export interface UserContext {
    userId: string
  }
}
