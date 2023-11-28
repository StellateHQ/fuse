'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useQuery } from '@fuse/next/client'

import { graphql } from '@/gql'
import { LaunchItem } from '@/components/LaunchItem'
import { LaunchDetails } from '@/components/LaunchDetails'
import styles from './page.module.css'
import { PageNumbers } from '@/components/PageNumbers'

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>SpaceX Launches</h1>
      <Suspense fallback={<p>Loading launches...</p>}>
        <Launches />
      </Suspense>
    </main>
  )
}

const LaunchesQuery = graphql(`
  query Launches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      nodes {
        id
        ...LaunchFields
      }
      ...TotalCountFields
    }
  }
`)

function Launches() {
  const [offset, setOffset] = React.useState<number>(0)
  const [selected, setSelected] = React.useState<null | string>(null)

  const [result] = useQuery({
    query: LaunchesQuery,
    variables: { limit: 10, offset },
  })

  return (
    <>
      <ul className={styles.list}>
        {result.data?.launches.nodes.map(
          (node) =>
            node && (
              <LaunchItem key={node.id} launch={node} select={setSelected} />
            ),
        )}
      </ul>
      {result.data && (
        <PageNumbers
          setOffset={setOffset}
          offset={offset}
          list={result.data.launches}
          limit={10}
        />
      )}
      <Suspense fallback={<p>Loading details...</p>}>
        {selected && <LaunchDetails id={selected} />}
      </Suspense>
    </>
  )
}
