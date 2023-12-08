---
'create-fuse-app': minor
'fuse': minor
---

Add a webpack-loader that automatically imports all entries in the `types/` directory.
In doing so it removes the need for `require.context`, next time you run the application,
you are encouraged to remove `require.context` from your `/pages/api/fuse.ts` or `/app/api/fuse/route.ts`
files.
