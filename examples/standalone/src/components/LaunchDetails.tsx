import { graphql, useQuery } from '../fuse'
import { LaunchSite } from './LaunchSite'

const LaunchDetailsQuery = graphql(`
  query LaunchDetails($id: ID!) {
    node(id: $id) {
      ... on Launch {
        id
        name
        details
        launchDate
        site {
          ...LaunchSiteFields
        }
      }
    }
  }
`)

export const LaunchDetails = (props: { id: string; deselect: () => void }) => {
  const [result] = useQuery({
    query: LaunchDetailsQuery,
    variables: { id: props.id },
  })

  if (result.data?.node?.__typename !== 'Launch') return null

  const { node } = result.data

  return (
    <dialog
      onClick={props.deselect}
      open
      style={{
        marginTop: '10%',
        padding: 32,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <h2>{node.name}</h2>
      <p>Launched at {new Date(node.launchDate).toUTCString()}</p>
      {node.details && <p style={{ maxWidth: 600 }}>{node.details}</p>}
      <LaunchSite site={node.site} />
    </dialog>
  )
}
