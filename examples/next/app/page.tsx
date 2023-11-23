'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useQuery } from '@urql/next'
import { graphql } from '../gql'

export default function Page() {
  return (
    <Suspense>
      <Launches />
    </Suspense>
  )
}

const LaunchesQuery = graphql(`
  query Launches {
    launches(limit: 3) {
      nodes {
        id
        name
        launchDate
      }
    }
  }
`)

function Launches() {
  const [result] = useQuery({ query: LaunchesQuery })

  const [selected, setSelected] = React.useState<null | string>(null)
  return (
    <main>
      <h1>This is rendered as part of SSR</h1>
      <ul>
        {result.data?.launches.nodes.map(
          (node) =>
            node && (
              <li key={node.id} onClick={() => setSelected(node.id)}>
                {node.name} Launched at{' '}
                {new Date(node.launchDate).toUTCString()}
              </li>
            ),
        )}
      </ul>
      <Suspense>{selected && <Launch id={selected} />}</Suspense>
    </main>
  )
}

const LaunchQuery = graphql(`
  query Launch($id: ID!) {
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

const Launch = (props: { id: string }) => {
  const [result] = useQuery({ query: LaunchQuery, variables: { id: props.id } })

  return (
    <pre>
      <code>{JSON.stringify(result.data?.node, undefined, 2)}</code>
    </pre>
  )
}
