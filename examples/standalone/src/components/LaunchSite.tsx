import { FragmentOf, graphql, readFragment } from '../fuse'
import { Location, SiteLocationFields } from './Location'

export const LaunchSiteFields = graphql(
  `
    fragment LaunchSiteFields on Site {
      id
      name
      details
      status
      location {
        ...SiteLocationFields
      }
    }
  `,
  [SiteLocationFields],
)

export const LaunchSite = (props: {
  site: FragmentOf<typeof LaunchSiteFields>
}) => {
  const result = readFragment(LaunchSiteFields, props.site)

  return (
    <div>
      <h3>{result.name}</h3>
      <p>Status: {result.status}</p>
      <p>{result.details}</p>
      {result.location && <Location location={result.location} />}
    </div>
  )
}
