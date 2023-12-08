# Fuse.js

![Fuse.js: End-to-end typesafe data fetching for frontend teams at scale](https://images.ctfassets.net/yq1dddfl2vc7/6EDzUh3emBY3uQqoxulmPA/037e0ca78ddd7aab9c04dd520b2ca38e/fusejs-twitter-header.png)

# Getting Started

## Before you begin

Before you start using Fuse.js, you need to have:

- Familiarity with TypeScript
- A Next.js app\*

\*_Note that a Fuse.js data layer can also be developed and deployed outside of Next.js. However, our current focus is on making the experience with Next.js great, so expect rough edges elsewhere._

## Setting up your Fuse.js data layer

When you are in your Next.JS app run the following command, this will
install all the packages and generate the files you need.

```sh npm2yarn
npm create fuse-app
```

Next, run `npm run dev` and... That’s it! Fuse.js will now serve a GraphQL API at `/api/fuse`.

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

**Read [the documentation](https://fusejs.org/docs) for more information about using Fuse.js**.

Quicklinks to some of the most-visited pages:

- [Getting started](https://fusejs.org/docs)
- [Querying from the client](https://fusejs.org/docs/basics/client)
- [Nodes](https://fusejs.org/docs/basics/nodes)
- [Introduction to data layers](https://fusejs.org/docs/data-layers)

# License

Licensed under the MIT License, Copyright © 2023-present Stellate, Inc.

See LICENSE for more information.
