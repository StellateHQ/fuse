import { FragmentType, graphql, useFragment } from '../../fuse'
import { Location } from './Location'

const LaunchSiteFields = graphql(`
  fragment LaunchSiteFields on Site {
    id
    name
    details
    status
    location {
      ...SiteLocationFields
    }
  }
`)

// TODO: make pretty
export const LaunchSite = (props: {
  site: FragmentType<typeof LaunchSiteFields>
}) => {
  const result = useFragment(LaunchSiteFields, props.site)

  return (
    <div>
      <h3>{result.name}</h3>
      <p>Status: {result.status}</p>
      <p>{result.details}</p>
      {result.location && <Location location={result.location} />}
    </div>
  )
}
