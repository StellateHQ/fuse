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
- [ ] provide some abstractions over the pothos API so we only expose a minimal subset
- [ ] harden the datasources and make them easy to work with
- [ ] create adapters with `build` to run in i.e. CFW/...
- [ ] add GraphQL-Code-Generator to the CLI so client-types can be inferred
- [ ] investigate whether `InferClient` from `garph` could fit into pothos
- [ ] establish WS connection to the GraphiQL instance so we can hot-reload it
- [ ] see if we can leverage grafast behind the hood
- [ ] consider pagination helpers
