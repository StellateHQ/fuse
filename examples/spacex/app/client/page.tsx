'use client'

import * as React from 'react'

import { graphql } from '@/fuse'
import { LaunchItem } from '@/components/LaunchItem'
import { LaunchDetails } from '@/components/LaunchDetails'
import styles from './page.module.css'
import { PageNumbers } from '@/components/PageNumbers'

import { useQuery } from 'fuse/next/client'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>SpaceX Launches</h1>
      <React.Suspense fallback={<p>Loading launches...</p>}>
        <Launches />
      </React.Suspense>
    </main>
  )
}

const LaunchesQuery = graphql(`
  query Launches_SSR($limit: Int, $offset: Int) {
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
  const searchparams = useSearchParams()

  const selected = searchparams!.get('selected')
  const offset = searchparams!.has('offset')
    ? Number(searchparams!.get('offset'))
    : 0

  const [result] = useQuery({
    query: LaunchesQuery,
    variables: { limit: 10, offset },
  })

  return (
    <>
      <ul className={styles.list}>
        {result.data?.launches.nodes.map(
          (node) => node && <LaunchItem key={node.id} launch={node} />,
        )}
      </ul>
      {result.data && (
        <PageNumbers offset={offset} list={result.data.launches} limit={10} />
      )}
      <React.Suspense fallback={<p>Loading details...</p>}>
        {selected && <LaunchDetails id={selected} />}
      </React.Suspense>
    </>
  )
}
