# Fuse

![Fuse: End-to-end typesafe data fetching for frontend teams at scale](https://images.ctfassets.net/yq1dddfl2vc7/6EDzUh3emBY3uQqoxulmPA/c738d8fbae3e412e38cadee598f3e9db/twitter_header.png)

# Getting Started

When you are in the root of your app run the following command. This will
install all the packages and generate the files you need.

```sh
npx create-fuse-app
```

Then, run `npx fuse dev` and your API will be running at `localhost:4000/graphql`!

> If you are **using Next.js, you don't need to manually run `fuse dev`**. `create-fuse-app` will add a Next.js plugin to your `next.config.js/ts/mjs`` and an API route at `/api/fuse` for you to access your API. ([learn more](https://fusedata.dev/docs/setting-fuse-up-manually/nextjs))

## Querying your data layer

```tsx
import { graphql } from '@/fuse'
import { execute } from '@/fuse/server'

const UserQuery = graphql(`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`)

export default async function Page() {
  const result = await execute({
    query: UserQuery,
    variables: { id: '1' },
  })

  return <p>Welcome {result.data?.user?.name}</p>
}
```

# [Docs](https://fusedata.dev/docs)

**Read [the documentation](https://fusedata.dev/docs) for more information about using Fuse**.

Quicklinks to some of the most-visited pages:

- [Getting started](https://fusedata.dev/docs)
- [Querying your API (client)](https://fusedata.dev/docs/client)
- [Building your API (server)](https://fusedata.dev/docs/server/queries-and-mutations)
- [Deploying your API (server)](https://fusedata.dev/docs/deployment)
- [The Fuse Method](https://fusedata.dev/docs/fuse-method)

# License

Licensed under the MIT License, Copyright © 2023-present Stellate, Inc.

See LICENSE for more information.
