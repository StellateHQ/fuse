import { builder, RestDatasource, node } from 'fuse'

interface Launch {
  id: string
  flight_number: number
  mission_name: string
  launch_date_utc: string
  rocket: { rocket_id: string }
}

const launchesDatasource = new RestDatasource<Launch>(
  'https://api.spacexdata.com/v3',
  'launches',
)

export const LaunchNode = node('Launch', launchesDatasource, (obj) => ({
  ...obj,
  id: '' + obj.flight_number,
})).implement({
  isTypeOf: (item) => {
    return (item as any).rocket ? true : false
  },
  fields: (t) => ({
    name: t.exposeString('mission_name'),
    launchDate: t.exposeString('launch_date_utc'),
  }),
})

builder.queryField('launches', (t) =>
  t.simpleList({
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

      return {
        nodes: launches.nodes.map((obj: Launch) => ({
          ...obj,
          launchDate: obj.launch_date_utc,
          name: obj.mission_name,
          id: '' + obj.flight_number,
        })),
      }
    },
  }),
)
