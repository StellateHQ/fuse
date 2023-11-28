import { builder, RESTDatasource, node } from 'fuse'
import { LaunchNode } from './Launch'

const rocketsDatasources = new RESTDatasource<{
  id: string
  cost_per_launch: number
  country: string
  company: string
  description: string
}>({ baseUrl: 'https://api.spacexdata.com/v3', path: 'rockets' })

const RocketNode = node({
  name: 'Rocket',
  datasource: rocketsDatasources,
  fields: (t) => ({
    cost: t.exposeInt('cost_per_launch'),
    country: t.exposeString('country'),
    company: t.exposeString('company'),
    description: t.exposeString('description'),
  }),
})

builder.objectField(LaunchNode, 'rocket', (fieldBuilder) =>
  fieldBuilder.loadable({
    type: RocketNode,
    resolve: (parent) => {
      return parent.rocket.rocket_id
    },
    load: async (ids: string[]) => {
      return Promise.all(ids.map((id) => rocketsDatasources.getOne(id)))
    },
  }),
)
