import {
  node,
  NotFoundError,
  addQueryFields,
  addMutationFields,
  addAuthScope,
  Scopes,
} from 'fuse'

// The type we expect from the API
interface Launch {
  flight_number: number
  mission_name: string
  launch_date_utc: string
  details: string
  rocket: { rocket_id: string }
  launch_site: { site_id: string }
  links: { mission_patch: string }
}

export const LaunchNode = node<Launch>({
  name: 'Launch',
  key: 'flight_number',
  async load(ids) {
    const launches = await Promise.allSettled(
      ids.map((id) =>
        fetch('https://api.spacexdata.com/v3/launches/' + id, {
          method: 'GET',
        }).then((x) => {
          if (x.status === 404) {
            return new NotFoundError('Could not find launch.')
          }

          return x.json()
        }),
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
    name: t.exposeString('mission_name', { nullable: false }),
    details: t.exposeString('details'),
    image: t.field({
      type: 'String',
      nullable: false,
      resolve: (parent) => parent.links.mission_patch,
    }),
    launchDate: t.exposeString('launch_date_utc', { nullable: false }),
  }),
})

addMutationFields((t) => ({
  sayHello: t.field({
    type: 'String',
    args: {
      name: t.arg.string(),
    },
    resolve: (_, args) => {
      return `Hello ${args.name || 'world'}!`
    },
  }),
}))

addQueryFields((t) => ({
  launches: t.list({
    type: LaunchNode,
    nullable: false,
    authScopes: {
      isLoggedIn: true,
    },
    nodeNullable: true,
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (_, args, context) => {
      const offset = args.offset || 0
      const limit = args.limit || 10
      const [allLaunches, launches] = await Promise.all([
        // Faking totalCount here
        fetch('https://api.spacexdata.com/v3/launches/').then((x) => x.json()),
        fetch(
          `https://api.spacexdata.com/v3/launches?offset=${offset}&limit=${limit}`,
        ).then((x) => x.json()),
      ])

      return {
        // also possible to return only ids, which will make all entities auto-resolve,
        // think of cases where the API returns a limited subset of fields
        // and you want to ensure you resolve with all details.
        // The node.load() function will be called for each key returned.
        nodes: launches,
        totalCount: allLaunches.length,
      }
    },
  }),
}))
