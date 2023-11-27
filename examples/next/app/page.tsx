'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useQuery } from '@urql/next'
import { FragmentType, graphql, useFragment } from '../gql'

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
        ...LaunchFields
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
            node && <Launch key={node.id} launch={node} select={setSelected} />,
        )}
      </ul>
      <Suspense>{selected && <LaunchNode id={selected} />}</Suspense>
    </main>
  )
}

const Test = graphql(`
  fragment LaunchFields on Launch {
    id
    name
    launchDate
  }
`)

const Launch = (props: {
  launch: FragmentType<typeof Test>
  select: (id: string) => void
}) => {
  const node = useFragment(Test, props.launch)
  return (
    <li key={node.id} onClick={() => props.select(node.id)}>
      {node.name} Launched at {new Date(node.launchDate).toUTCString()}
    </li>
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

const LaunchNode = (props: { id: string }) => {
  const [result] = useQuery({ query: LaunchQuery, variables: { id: props.id } })

  return (
    <pre>
      <code>{JSON.stringify(result.data?.node, undefined, 2)}</code>
    </pre>
  )
}
