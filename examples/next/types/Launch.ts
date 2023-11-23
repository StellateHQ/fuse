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
