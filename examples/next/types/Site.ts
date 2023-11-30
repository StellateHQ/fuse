import { node, addNodeFields, enumType, object } from 'fuse'
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

export enum Status {
  ACTIVE,
  INACTIVE,
  RETIRED,
  UNDER_CONSTRUCTION,
}

const Location = object<OutputType['location']>({
  name: 'Location',
  fields: (t) => ({
    name: t.exposeString('name'),
    region: t.exposeString('region'),
    latitude: t.exposeFloat('latitude'),
    longitude: t.exposeFloat('longitude'),
  }),
})

const SiteStatus = enumType(Status, {
  name: 'SiteStatus',
})

const SiteNode = node<OutputType>({
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
        return Status.ACTIVE
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
