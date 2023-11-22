import { builder, RestDatasource, node } from 'fuse'
import { LaunchNode } from './Launch'

interface Rocket {
  id: string
  cost_per_launch: number
  cost: number
  country: string
  company: string
  description: string
}

const rocketsDatasources = new RestDatasource<Rocket>(
  'https://api.spacexdata.com/v3',
  'rockets',
)

const RocketNode = node('Rocket', rocketsDatasources, (obj) => ({
  ...obj,
  cost: obj.cost_per_launch,
})).implement({
  isTypeOf: (item) => {
    return (item as any).cost
  },
  fields: (t) => ({
    cost: t.exposeInt('cost'),
    country: t.exposeString('country'),
    company: t.exposeString('company'),
    description: t.exposeString('description'),
  }),
})

builder.objectField(LaunchNode, 'rocket', (t) =>
  t.loadable({
    type: RocketNode,
    nullable: true,
    resolve: (parent) => {
      return parent.rocket.rocket_id
    },
    load: async (ids: string[]) => {
      const promises = ids.map((id) => rocketsDatasources.getOne(id))
      const results = await Promise.all(promises)
      return results.map((x) => ({
        ...x,
        id: x.id + '',
        cost: x.cost_per_launch,
      }))
    },
  }),
)
