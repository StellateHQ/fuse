# create-fuse-app

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
