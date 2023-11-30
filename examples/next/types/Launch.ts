import {
  node,
  NotFoundError,
  addQueryFields,
  interfaceType,
  builder,
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

const NewInterface = interfaceType({
  name: 'NewInterface',
  resolveType: () => 'Launch',
  fields: (t) => ({
    name: t.string(),
  }),
})

export const LaunchNode = node<Launch>({
  name: 'Launch',
  key: 'flight_number',
  interfaces: [NewInterface],
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
    name: t.exposeString('mission_name'),
    details: t.exposeString('details', { nullable: true }),
    image: t.field({
      type: 'String',
      resolve: (parent) => parent.links.mission_patch,
    }),
    launchDate: t.exposeString('launch_date_utc'),
  }),
})

addQueryFields((fieldBuilder) => ({
  launches: fieldBuilder.simpleList({
    type: NewInterface,
    nullable: false,
    args: {
      offset: fieldBuilder.arg.int(),
      limit: fieldBuilder.arg.int(),
    },
    resolve: async (_, args) => {
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
