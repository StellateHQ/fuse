# Fuse.js

![Fuse.js: End-to-end typesafe data fetching for frontend teams at scale](https://images.ctfassets.net/yq1dddfl2vc7/6EDzUh3emBY3uQqoxulmPA/037e0ca78ddd7aab9c04dd520b2ca38e/fusejs-twitter-header.png)

# Getting Started

## Before you begin

Before you start using Fuse.js, you need to have:

- Familiarity with TypeScript
- A Next.js app\*

\*_Note that a Fuse.js data layer can also be developed and deployed outside of Next.js. However, our current focus is on making the experience with Next.js great, so expect rough edges elsewhere._

## Setting up your Fuse data layer

### Install the npm packages

```sh npm2yarn
npm install --save fuse graphql
npm install --save-dev @graphql-typed-document-node/core
```

### Add the Next.js plugin to your `next.config.js`

```js
const { nextFusePlugin } = require('fuse/next/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = nextFusePlugin()({
  // Your Next.js config here
})

module.exports = nextConfig
```

### Create the `/api/fuse` API route

This API route will serve as the entrypoint to the GraphQL API that Fuse.js creates. If you are using Next.js’s app router, add a file at `app/api/fuse/route.ts` and copy the below code to it:

```ts
import { createAPIRouteHandler } from 'fuse/next'

// NOTE: The below is a hack to make Next.js require all the files
// in the /types folder automatically
const keys = require.context('../../../types', true, /\.ts$/)
keys
  .keys()
  .filter((x) => x.includes('types/'))
  .forEach(keys)

const handler = createAPIRouteHandler()

export const GET = handler
export const POST = handler
```

### Add your first type

Create a `types` folder at the root of your Next.js app and add a file at `types/User.ts` that contains the following code:

```ts
import { node } from 'fuse'

type UserSource = {
  id: string
  name: string
  avatarUrl: string
}

// "Nodes" are the core abstraction of Fuse.js. Each node represents
// a resource/entity with multiple fields and has to define two things:
// 1. load(): How to fetch from the underlying data source
// 2. fields: What fields should be exposed and added for clients
export const UserNode = node<UserSource>({
  name: 'User',
  load: async (ids) => getUsers(ids),
  fields: (t) => ({
    name: t.exposeString('name'),
    avatarUrl: t.exposeString('avatarUrl'),
    firstName: t.string({
      resolve: (user) => user.name.split(' ')[0],
    }),
  }),
})

// Fake function to fetch users. In real applications, this would
// talk to an underlying REST API/gRPC service/third-party API/…
async function getUsers(ids: string[]): Promise<UserSource[]> {
  return ids.map((id) => ({
    id,
    name: `Peter #${id}`,
    avatarUrl: `https://i.pravatar.cc/300?u=${id}`,
  }))
}
```

That’s it! Fuse.js will now serve a GraphQL API at `/api/fuse`.

## Querying your data layer

### TODO

### Adding in-line hints and validation

You can use `@0no-co/graphqlsp` to get inline hints while authoring GraphQL documents, you can do so by installing it
and using the following in your `tsconfig.json`

```json
{
  "name": "@0no-co/graphqlsp",
  "schema": "./schema.graphql",
  "disableTypegen": true,
  "templateIsCallExpression": true,
  "template": "graphql"
}
```

When using `.vscode` you will need to use the workspace version of TypeScript, to do so you can easily do that by creating
`.vscode/settings.json` with the following content

```json
{
  "typescript.tsdk": "node_modules/typescript/lib"
}
```
