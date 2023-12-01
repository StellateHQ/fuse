import { FragmentType, graphql, useFragment } from '@/gql'

const SiteLocationFields = graphql(`
  fragment SiteLocationFields on Location {
    latitude
    longitude
    name
    region
  }
`)

export const Location = (props: {
  location: FragmentType<typeof SiteLocationFields>
}) => {
  const result = useFragment(SiteLocationFields, props.location)

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
