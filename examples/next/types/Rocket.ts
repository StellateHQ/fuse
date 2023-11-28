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
