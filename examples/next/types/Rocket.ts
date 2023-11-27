import { builder, RESTDatasource, node } from 'fuse'
import { LaunchNode } from './Launch'

const rocketsDatasources = new RESTDatasource<{
  id: string
  cost_per_launch: number
  country: string
  company: string
  description: string
}>('https://api.spacexdata.com/v3', 'rockets')

const RocketNode = node('Rocket', rocketsDatasources).implement({
  isTypeOf: () => true,
  fields: (t) => ({
    cost: t.exposeInt('cost_per_launch'),
    country: t.exposeString('country'),
    company: t.exposeString('company'),
    description: t.exposeString('description'),
  }),
})

builder.objectField(LaunchNode, 'rocket', (t) =>
  t.loadable({
    type: RocketNode,
    resolve: (parent) => {
      return parent.rocket.rocket_id
    },
    load: async (ids: string[]) => {
      return Promise.all(ids.map((id) => rocketsDatasources.getOne(id)))
    },
  }),
)
