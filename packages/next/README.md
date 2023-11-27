# @fuse/plugin-next

This plugin facilitates an opinionated way of creating datalayers, while running `next dev`
this will automatically generate types for your endpoint that can be used with GraphQL clients.

## Installation

For the installation we need the core `fuse` module, the `next` plugin and a module
to facilitate the typings.

```sh
npm i --save fuse @fuse/next
npm i --save-dev @graphql-typed-document-node/core
```

## Adding the plugin in your config

We'll need to add the plugin to your `next.config` so we can initialize the `code-generator`
to run with your application.

```js
const { nextFusePlugin } = require('@fuse/next/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = nextFusePlugin()({})

module.exports = nextConfig
```

## Creating your first type

`fuse` picks up the `types` you want to expose from the `types/` folder, let's create our first type
in `types/Launch.ts`

```ts
import { builder, RestDatasource, node } from 'fuse'

// The launch type we get back from the API
interface ApiLaunch {
  flight_number: number
  mission_name: string
  launch_date_utc: string
  rocket: { rocket_id: string }
}

const launchesDatasource = new RestDatasource<ApiLaunch>(
  'https://api.spacexdata.com/v3',
  'launches',
)

// This helper function will create the Launch object-type
// as well as make it query-able from "Query.node(id: "X") { ... on Launch { id name } }"
export const LaunchNode = node(
  'Launch',
  launchesDatasource,
  'flight_number',
).implement({
  isTypeOf: (item) => {
    return (item as any).rocket ? true : false
  },
  fields: (t) => ({
    // we tell our node that it can find the name on a different property named mission_name and to
    // expose it as a string.
    name: t.exposeString('mission_name'),
    launchDate: t.exposeString('launch_date_utc'),
    // We can also expose a property that is computed and/or transformed from a different property
    transformedLaunchDate: t.field({
      type: 'Date',
      resolve: (parent) => {
        return new Date(parent.launch_date_utc)
      },
    }),
  }),
})

// We also want a way to query multiple launches
// these will run through the transformation logic
// of the node.
builder.queryField('launches', (t) =>
  t.simpleList({
    type: LaunchNode,
    nullable: false,
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (_, args) => {
      const offset = args.offset || 0
      const launches = await launchesDatasource.list({
        limit: args.limit || 10,
        offset,
      })

      return {
        nodes: launches,
      }
    },
  }),
)
```

## Creating the API-endpoint

Now let's go to to `app/api/datalayer.route.ts` and paste in the following

```ts
import { datalayer } from '@fuse/next'

const keys = require.context('../../../types', true, /\.ts$/)
keys
  .keys()
  .filter((x) => x.includes('types/'))
  .forEach(keys)

export const dynamic = 'force-dynamic'
export const GET = datalayer()
export const POST = datalayer()
```

> Note that you can do the same for pages but the import is `datalayerPage` which has to be a default export.

## Additional

### Adding in-line hints and validation

You can use `@0no-co/graphqlsp` to get inline hints while authoring GraphQL documents, you can do so by installing it
and using the following in your `tsconfig.json`

```json
{
  "name": "@0no-co/graphqlsp",
  "schema": "http://localhost:3000/api/datalayer",
  "disableTypegen": true,
  "templateIsCallExpression": true,
  "template": "graphql"
}
```

When using `.vscode` you will need to use the workspace version of TypeScript
