import { builder, RestDatasource, node, createConnection } from 'fuse'

interface Launch {
  id: string
  flight_number: number
  mission_name: string
  name: string
  launch_date_utc: string
  launchDate: string
  rocket: { rocket_id: string }
}

const launchesDatasource = new RestDatasource<Launch>(
  'https://api.spacexdata.com/v3',
  'launches',
)

export const LaunchNode = node('Launch', launchesDatasource, (obj) => ({
  ...obj,
  launchDate: obj.launch_date_utc,
  name: obj.mission_name,
  id: '' + obj.flight_number,
})).implement({
  isTypeOf: (item) => {
    return (item as any).rocket ? true : false
  },
  fields: (t) => ({
    name: t.exposeString('name'),
    launchDate: t.exposeString('launchDate'),
  }),
})

builder.queryField('launches', (t) =>
  t.connection({
    type: LaunchNode,
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
      return createConnection(
        launches.nodes.map((obj: Launch) => ({
          ...obj,
          launchDate: obj.launch_date_utc,
          name: obj.mission_name,
          id: '' + obj.flight_number,
        })),
        offset < 100,
        offset > 0,
      )
    },
  }),
)
