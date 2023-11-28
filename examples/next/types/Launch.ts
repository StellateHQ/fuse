import { builder, RESTDatasource, node } from 'fuse'

// The datasource that reaches out to our API with the
// accompanying shape of the data.
const launchesDatasource = new RESTDatasource<{
  flight_number: number
  mission_name: string
  launch_date_utc: string
  details: string
  rocket: { rocket_id: string }
  launch_site: { site_id: string }
  links: { mission_patch: string }
}>({
  baseUrl: 'https://api.spacexdata.com/v3',
  path: 'launches',
})

// This helper function will create the Launch object-type
// as well as make it query-able from "Query.node(id: "X") { ... on Launch { id name } }"
export const LaunchNode = node({
  name: 'Launch',
  datasource: launchesDatasource,
  key: 'flight_number',
  fields: (t) => ({
    // we tell our node that it can find the name on a different property named mission_name and to
    // expose it as a string.
    name: t.exposeString('mission_name'),
    details: t.exposeString('mission_name'),
    image: t.field({
      type: 'String',
      resolve: (parent) => parent.links.mission_patch,
    }),
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
      const launches = await launchesDatasource.list({
        limit: args.limit || 10,
        offset,
      })
      console.log('launches', launches)

      return {
        nodes: launches,
      }
    },
  }),
)
