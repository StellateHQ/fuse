# create-fuse-app

## 0.7.0

### Minor Changes

- db8b67d: Support creating a fuse app in an empty directory

## 0.6.0

### Minor Changes

- 1f225c5: Fix typo in the babel-plugin when rewriting an export default expression

## 0.5.0

### Minor Changes

- d55a2f0: Default to using `gql.tada`

## 0.4.1

### Patch Changes

- 23c0264: Fix writing of `.mjs` next config

## 0.4.0

### Minor Changes

- 2b4073e: Add support for generating a fuse-app without being in Next.JS

### Patch Changes

- 0a58c27: Check for `src` when looking for the `/app` directory

## 0.3.0

### Minor Changes

- e7f037b: Add a webpack-loader that automatically imports all entries in the `types/` directory.
  In doing so it removes the need for `require.context`, next time you run the application,
  you are encouraged to remove `require.context` from your `/pages/api/fuse.ts` or `/app/api/fuse/route.ts`
  files.

## 0.2.1

### Patch Changes

- f699e31: Fix duplicate entries

## 0.2.0

### Minor Changes

- fd89e23: Add support for `bun` and `pnpm`

## 0.1.1

### Patch Changes

- 35abb16: Fix crash when dir exists
