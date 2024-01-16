# fuse

## 0.10.1

### Patch Changes

- cc58565: Fix src dir with appended file

## 0.10.0

### Minor Changes

- 2b4073e: Add a standalone version to fuse, this will support running `fuse dev` and `fuse build --adapter node|cloudflare|lambda`
- 477e25c: Make it easier to debug issues with our default document-cache
- c1cccad: Add option to override the `UserContext` type
- d97175a: Export the fuse standalone `/client` from `fuse/client.ts`
- 3d36c57: Implement scope-based authorization model for `fuse`

### Patch Changes

- 335e251: Disallow specifying `key` when `id` is present in the `generic` and enforce when we are missing an `id` property
- 59979fc: Remove log from list-plugin
- 512f411: Avoid starting two codegen processes when reloading next-config
- a9b551b: Respect src dir during codegen
- 0543d93: Improve built-in key type
- 7992a9f: Run authorization on the type-level

## 0.9.0

### Minor Changes

- c241f0c: Add field level nullability to `t.list()`

## 0.8.1

### Patch Changes

- 70b4f89: Respect src dir during codegen

## 0.8.0

### Minor Changes

- e7f037b: Add a webpack-loader that automatically imports all entries in the `types/` directory.
  In doing so it removes the need for `require.context`, next time you run the application,
  you are encouraged to remove `require.context` from your `/pages/api/fuse.ts` or `/app/api/fuse/route.ts`
  files.

## 0.7.1

### Patch Changes

- ed5c5dd: Improve codegen performance

## 0.7.0

### Minor Changes

- 7225f96: Allow querying the GraphQL schema directly from server components

### Patch Changes

- b751e5f: Add a default set of exchanges on the createClient method to reduce overhead
- 63b64dc: Support reading documents from `.ts` files

## 0.6.0

### Minor Changes

- 1d73cfc: Rename `simpleList` to `list`
- d1b4e45: Add ability to resolve a node `<type>` which returns the concrete type rather than an abstract node

### Patch Changes

- 5033588: Rename to `registerClient` and the folder to `fuse`
- 12827a9: Allow for `context` on the builder and `number` ids during resolution of loaders
- 3d368f5: Add commont types between the app and pages route to our context object
