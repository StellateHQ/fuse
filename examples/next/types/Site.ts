import { node, addNodeFields, enumType, object } from 'fuse'
import { LaunchNode } from './Launch'

interface Site {
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

const Location = object<Site['location']>({
  name: 'Location',
  fields: (t) => ({
    name: t.exposeString('name'),
    region: t.exposeString('region'),
    latitude: t.exposeFloat('latitude'),
    longitude: t.exposeFloat('longitude'),
    coordiantes: t.field({
      type: ['Float'],
      resolve: (parent) => [parent.latitude, parent.longitude],
    }),
  }),
})

const SiteStatus = enumType({
  name: 'SiteStatus',
  values: ['ACTIVE', 'INACTIVE', 'UNKNOWN'] as const,
})

const SiteNode = node<Site>({
  name: 'Site',
  key: 'site_id',
  async load(ids) {
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
    status: t.field({
      nullable: true,
      type: SiteStatus,
      resolve: (parent) => {
        switch (parent.status) {
          case 'active':
            return 'ACTIVE'
          case 'inactive':
            return 'INACTIVE'
          default: {
            return 'UNKNOWN'
          }
        }
      },
    }),
    location: t.expose('location', {
      type: Location,
    }),
  }),
})

addNodeFields(LaunchNode, (fieldBuilder) => ({
  site: fieldBuilder.field({
    type: SiteNode,
    resolve: (parent, args) => parent.launch_site.site_id,
  }),
}))
