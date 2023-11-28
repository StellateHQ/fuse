import { builder, node } from 'fuse'
import { LaunchNode } from './Launch'

interface OutputType {
  site_id: string
  status: string
  site_name_long: string
  details: string
  location: {
    name: string
    region: string
    latitude: number
    longitude: number
  }
}

const Location = builder.simpleObject('Location', {
  fields: (t) => ({
    name: t.string(),
    region: t.string(),
    latitude: t.float(),
    longitude: t.float(),
  }),
})

const RocketNode = node<OutputType>({
  name: 'Site',
  key: 'site_id',
  async get(ids) {
    const launchPads = await Promise.allSettled(
      ids.map((id) =>
        fetch('https://api.spacexdata.com/v3/launchpads/' + id, {
          method: 'GET',
        }).then((x) => x.json()),
      ),
    )

    return await Promise.all(
      launchPads.map((pad) =>
        pad.status === 'fulfilled' ? pad.value : new Error(pad.reason),
      ),
    )
  },
  fields: (t) => ({
    name: t.exposeString('site_name_long'),
    details: t.exposeString('details'),
    status: t.exposeString('status'),
    location: t.expose('location', {
      type: Location,
    }),
  }),
})

builder.objectField(LaunchNode, 'site', (fieldBuilder) =>
  fieldBuilder.field({
    type: RocketNode,
    resolve: (parent) => parent.launch_site.site_id,
  }),
)
