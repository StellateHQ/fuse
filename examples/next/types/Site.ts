import { builder, RESTDatasource, node } from 'fuse'
import { LaunchNode } from './Launch'

const siteDatasource = new RESTDatasource<{
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
}>({ baseUrl: 'https://api.spacexdata.com/v3', path: 'launchpads' })

const Location = builder.simpleObject('Location', {
  fields: (t) => ({
    name: t.string(),
    region: t.string(),
    latitude: t.float(),
    longitude: t.float(),
  }),
})

const RocketNode = node({
  name: 'Site',
  datasource: siteDatasource,
  key: 'site_id',
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
