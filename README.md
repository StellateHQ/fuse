# Fuse

![Fuse: End-to-end typesafe data fetching for frontend teams at scale](https://images.ctfassets.net/yq1dddfl2vc7/6EDzUh3emBY3uQqoxulmPA/4bcd85b059cf6431e791cb36f5be88c4/twitter_header.png)

# Getting Started

When you are in the root of your app run the following command. This will
install all the packages and generate the files you need.

```sh
npm create fuse-app
```

Then, run `fuse dev` (or `next dev` if you're using Next.js) and your API will be running at `localhost:4000/graphql`! (or `/api/fuse` in Next.js)

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

# [Docs](https://fusejs.org/docs)

**Read [the documentation](https://fusejs.org/docs) for more information about using Fuse**.

Quicklinks to some of the most-visited pages:

- [Getting started](https://fusedata.dev/docs)
- [Querying your API (client)](https://fusedata.dev/docs/client)
- [Building your API (server)](https://fusedata.dev/docs/server/queries-and-mutations)
- [Deploying your API (server)](https://fusedata.dev/docs/deployment)
- [The Fuse Method](https://fusedata.dev/docs/fuse-method)

# License

Licensed under the MIT License, Copyright © 2023-present Stellate, Inc.

See LICENSE for more information.
