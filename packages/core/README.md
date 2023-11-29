# fuse

This plugin facilitates an opinionated way of creating datalayers, while running `next dev`
this will automatically generate types for your endpoint that can be used with GraphQL clients.

## Installation

For the installation we need the core `fuse` module, the `graphql` library and a module
to facilitate the typings of our documents.

```sh
npm i --save fuse graphql
npm i --save-dev @graphql-typed-document-node/core
```

## Adding the plugin in your config

We'll need to add the plugin to your `next.config` so we can initialize the `code-generator`
to run with your application.

```js
const { nextFusePlugin } = require('fuse/next/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = nextFusePlugin()({})

module.exports = nextConfig
```

## Creating your first type

`fuse` picks up the `types` you want to expose from the `types/` folder, let's create our first type
in `types/Launch.ts`

```ts
import { builder, node } from 'fuse'

// The type we expect from the API
interface OutputType {
  flight_number: number
  mission_name: string
  launch_date_utc: string
  details: string
  rocket: { rocket_id: string }
  launch_site: { site_id: string }
  links: { mission_patch: string }
}

export const LaunchNode = node<OutputType>({
  name: 'Launch',
  key: 'flight_number',
  async load(ids) {
    const launches = await Promise.allSettled(
      ids.map((id) =>
        fetch('https://api.spacexdata.com/v3/launches/' + id, {
          method: 'GET',
        }).then((x) => x.json()),
      ),
    )

    return await Promise.all(
      launches.map((launch) =>
        launch.status === 'fulfilled' ? launch.value : new Error(launch.reason),
      ),
    )
  },
  fields: (t) => ({
    // we tell our node that it can find the name on a different property named mission_name and to
    // expose it as a string.
    name: t.exposeString('mission_name'),
    details: t.exposeString('details', { nullable: true }),
    image: t.field({
      type: 'String',
      resolve: (parent) => parent.links.mission_patch,
    }),
    launchDate: t.exposeString('launch_date_utc'),
  }),
})

// We also want a way to query multiple launches
// these will run through the transformation logic
// of the node.
builder.queryField('launches', (fieldBuilder) =>
  fieldBuilder.simpleList({
    type: LaunchNode,
    nullable: false,
    args: {
      offset: fieldBuilder.arg.int(),
      limit: fieldBuilder.arg.int(),
    },
    resolve: async (_, args) => {
      const offset = args.offset || 0
      const limit = args.limit || 10
      const launches = await fetch(
        `https://api.spacexdata.com/v3/launches?offset=${offset}&limit=${limit}`,
      ).then((x) => x.json())

      return {
        nodes: launches,
      }
    },
  }),
)
```

### Connecting a field

```ts
import { builder, node } from 'fuse'
import { LaunchNode } from './Launch'

interface OutputType {
  id: string
  cost_per_launch: number
  country: string
  company: string
  description: string
}

const RocketNode = node<OutputType>({
  name: 'Rocket',
  async load(ids) {
    const rockets = await Promise.allSettled(
      ids.map((id) =>
        fetch('https://api.spacexdata.com/v3/rockets/' + id, {
          method: 'GET',
        }).then((x) => x.json()),
      ),
    )

    return await Promise.all(
      rockets.map((rocket) =>
        rocket.status === 'fulfilled' ? rocket.value : new Error(rocket.reason),
      ),
    )
  },
  fields: (t) => ({
    cost: t.exposeInt('cost_per_launch'),
    country: t.exposeString('country'),
    company: t.exposeString('company'),
    description: t.exposeString('description'),
  }),
})

builder.objectField(LaunchNode, 'rocket', (fieldBuilder) =>
  fieldBuilder.field({
    type: RocketNode,
    resolve: (parent) => parent.rocket.rocket_id,
  }),
)
```

## Creating the API-endpoint

Now let's go to to `app/api/datalayer.route.ts` and paste in the following

```ts
import { datalayer } from 'fuse/next'

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
