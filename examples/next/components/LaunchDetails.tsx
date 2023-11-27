import { graphql } from '@/gql'
import { useQuery } from '@urql/next'

const LaunchDetailsQuery = graphql(`
  query LaunchDetails($id: ID!) {
    node(id: $id) {
      ... on Launch {
        id
        name
        launchDate
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

export const LaunchDetails = (props: { id: string }) => {
  const [result] = useQuery({
    query: LaunchDetailsQuery,
    variables: { id: props.id },
  })

  return (
    <pre>
      <code>{JSON.stringify(result.data?.node, undefined, 2)}</code>
    </pre>
  )
}
