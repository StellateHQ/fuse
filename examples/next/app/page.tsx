'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useQuery } from '@urql/next'

import { graphql } from '@/gql'
import { Launch } from '@/components/Launch'
import { LaunchDetails } from '@/components/LaunchDetails'

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
      <h1>SpaceX Launches</h1>
      <ul>
        {result.data?.launches.nodes.map(
          (node) =>
            node && <Launch key={node.id} launch={node} select={setSelected} />,
        )}
      </ul>
      <Suspense>{selected && <LaunchDetails id={selected} />}</Suspense>
    </main>
  )
}
