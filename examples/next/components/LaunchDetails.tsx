'use client'

import { graphql } from '@/gql'
import { useQuery } from 'fuse/next/client'
import { LaunchSite } from './LaunchSite'
import { usePathname, useRouter } from 'next/navigation'

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

export const LaunchDetails = (props: { id: string }) => {
  const [result] = useQuery({
    query: LaunchDetailsQuery,
    variables: { id: props.id },
  })

  const router = useRouter()
  const pathname = usePathname()

  if (result.data?.node?.__typename !== 'Launch') return null

  const { node } = result.data

  return (
    <dialog
      onClick={() => router.replace(`${pathname}`)}
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
