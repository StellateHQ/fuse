import { FragmentOf, graphql, readFragment } from '../fuse'

export const SiteLocationFields = graphql(`
  fragment SiteLocationFields on Location {
    latitude
    longitude
    name
    region
  }
`)

export const Location = (props: {
  location: FragmentOf<typeof SiteLocationFields>
}) => {
  const result = readFragment(SiteLocationFields, props.location)

  return (
    <div>
      <p>
        {result.region} - {result.name}
      </p>
      <p>
        Coordinates {result.longitude} {result.latitude}
      </p>
    </div>
  )
}
