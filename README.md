# Stellate datalayer

Runnable by doing the following

```sh
pnpm i
pnpm build
cd dist && pnpm dev
```

## TODOS

- [ ] figure out best `yoga` defaults w/ regards to plugins
- [ ] figure out best `pothos` defaults w/ regards to plugins
- [ ] provide some abstractions over the pothos API so we only expose a minimal subset
- [ ] harden the datasources and make them easy to work with
- [ ] provide support for mutations
- [ ] provide support for custom `_context.ts` file
- [ ] create adapters with `build` to run in i.e. CFW/...
- [ ] add GraphQL-Code-Generator to the CLI so client-types can be inferred
- [ ] invesitgate whether `InferClient` from `garph` could fit into pothos
- [ ] establish WS connection to the GraphiQL instance so we can hot-reload it
- [ ] optimize for dataloader
- [ ] see if we can leverage grafast behind the hood
