import { graphql } from '@/gql'
import { useQuery } from '@urql/next'

const LaunchDetailsQuery = graphql(`
  query LaunchDetails($id: ID!) {
    node(id: $id) {
      ... on Launch {
        id
        name
        details
        launchDate
        site {
          id
          name
          details
          status
          location {
            latitude
            longitude
            name
            region
          }
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

  return (
    <pre style={{ width: '75%' }}>
      <code>{JSON.stringify(result.data?.node, undefined, 2)}</code>
    </pre>
  )
}
