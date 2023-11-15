# Stellate datalayer

Runnable by doing the following

```sh
pnpm i
pnpm build
cd dist && pnpm dev
```

## TODOS

- [x] figure out best `yoga` defaults w/ regards to plugins
- [x] figure out best `pothos` defaults w/ regards to plugins
- [x] optimize for dataloader
- [x] provide support for mutations
- [x] provide support for custom `_context.ts` file
- [ ] security best practices with regards to the yoga server
- [ ] provide some abstractions over the pothos API so we only expose a minimal subset
- [ ] harden the datasources and make them easy to work with
- [x] create adapters with `build` to run in i.e. CFW/...
- [ ] establish WS connection to the GraphiQL instance so we can hot-reload it
- [ ] see if we can leverage grafast under the hood
- [ ] consider pagination helpers for cursor-based pagination
- [x] embed the `types/` folder during build for CF/Lambda with a vite plugin _or_ figure out how to use `{ eager: true }`
- [x] Make HMR work, this used to work in [this version](https://github.com/StellateHQ/datalayer/blob/3f852274edf342f6aedeb46d249c6ace9d063525/src/index.ts#L21) where the builder was exported from the main entry
- [ ] provide opinionated client-api prisma like query-building
- [ ] consider an optimising vite plugin
- [ ] consider some linting approach