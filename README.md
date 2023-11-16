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
- [x] make HMR work
- [x] opinionated codegen for the client
- [ ] add in a base set of custom scalars like `JSON` and `Date`
- [ ] harden the datasources and make them easy to work with
- [ ] provide some abstractions over the pothos API so we only expose a minimal subset
- [ ] security best practices with regards to the yoga server
- [ ] come up with a way to type `context` as that is part of the `SchemaBuilder`

## Nice to have

- [ ] provide opinionated client-api prisma like query-building
- [ ] consider some linting approach
- [ ] consider a document optimising vite plugin
- [ ] consider pagination helpers for cursor-based pagination
- [ ] see if we can leverage grafast under the hood
- [ ] establish WS connection to the GraphiQL instance so we can hot-reload the schema
- [ ] come up with elegant way of adding custom scalars and detecting them during codegen
