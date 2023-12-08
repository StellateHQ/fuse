# fuse

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
