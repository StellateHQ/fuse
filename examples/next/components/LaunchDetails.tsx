import { graphql } from '@/gql'
import { useQuery } from '@urql/next'
import { LaunchSite } from './LaunchSite'

const LaunchDetailsQuery = graphql(`
  query LaunchDetails($id: ID!) {
    node(id: $id) {
      ... on Launch {
        id
        name
        details
        launchDate
        image
        site {
          ...LaunchSiteFields
        }
        rocket {
          cost
          country
          company
          description
        }
      }
    }
  }
`)

// TODO: make pretty
export const LaunchDetails = (props: { id: string }) => {
  const [result] = useQuery({
    query: LaunchDetailsQuery,
    variables: { id: props.id },
  })

  if (result.data?.node?.__typename !== 'Launch') return null

  const { node } = result.data

  return (
    <div>
      <h2>{node.name}</h2>
      <p>Launched at {new Date(node.launchDate).toUTCString()}</p>
      <p>{node.details}</p>
      <LaunchSite site={node.site} />
    </div>
  )
}
