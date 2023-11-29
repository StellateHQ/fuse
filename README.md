# Fuse

Runnable by doing the following

```sh
pnpm i
pnpm build
cd dist && pnpm dev
```

# TODOS

## Must have

- [x] figure out best `yoga` defaults w/ regards to plugins
- [x] figure out best `pothos` defaults w/ regards to plugins
- [x] optimize for dataloader
- [x] provide support for mutations
- [x] provide support for custom `_context.ts` file
- [x] create adapters with `build` to run in i.e. CFW/...
- [x] embed the `types/` folder during build for CF/Lambda with a vite plugin _or_ figure out how to use `{ eager: true }`
- [x] opinionated codegen for the client
- [x] add in a base set of custom scalars like `JSON` and `Date`
- [x] pick up on changes (reloading, ...)
- [x] provide some abstractions over the pothos API so we only expose a minimal subset
- [x] security best practices with regards to the yoga server
- [x] add support for the Next.JS `pages` on top of `app`
- [x] come up with a transform API when i.e. entities need to be changed casing, proeprties need to get computed, ...
- [x] create a pothos plugin for less complicated lists but with the `nodes` characteristic
- [x] SCHEMA: better nullability options for `simpleList` (Instead opted for an opinionated nullability approach)
- [x] SCHEMA: add a nullable `totalCount` field alongside `nodes`
- [x] DATASOURCES: figure out automated headers approach i.e. use `context.headers` always?
- [x] DATASOURCES: expand for mutative methods like create/update/delete
- [x] NEXT: verify whether `@fuse/next/client` works in the pages directory (It does not due to the import of `next/navigation`)
- [x] NEXT: support the `pages/` directory with a client
- [x] WORKSPACE: merge all packages in `core` for now
- [x] URQL: solve bug with `pages/` directory not rehydrating correctly
- [ ] NEXT: fix context retrieval and `require.context` usage in `next.js`

## Nice to have

- [ ] CODEGEN: support custom scalars in our codegen
- [ ] SCHEMA: come up with a way to type `context` as that is part of the `SchemaBuilder`
- [ ] YOGA: way for adopting persisted-operations easily
- [x] NEXT: produce `schema.graphql` for `GraphQLSP` so it doesn't have to rely on refetching the introspection
- [x] NEXT: figure out missing `client.d.ts` and `rsc.d.ts` in our output bundles
