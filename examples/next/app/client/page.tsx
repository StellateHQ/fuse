'use client'

import * as React from 'react'

import { graphql } from '@/gql'
import { LaunchItem } from '@/components/LaunchItem'
import { LaunchDetails } from '@/components/LaunchDetails'
import styles from './page.module.css'
import { PageNumbers } from '@/components/PageNumbers'

import {
  Provider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
  useQuery,
} from 'fuse/next/client'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const [client, ssr] = React.useMemo(() => {
    const ssr = ssrExchange()
    const client = createClient({
      url: 'http://localhost:3000/api/datalayer',
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    })

    return [client, ssr]
  }, [])

  return (
    <Provider client={client} ssr={ssr}>
      <main className={styles.main}>
        <h1>SpaceX Launches</h1>
        <React.Suspense fallback={<p>Loading launches...</p>}>
          <Launches />
        </React.Suspense>
      </main>
    </Provider>
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
  const searchparams = useSearchParams()

  const selected = searchparams.get('selected')
  const offset = searchparams.has('offset')
    ? Number(searchparams.get('offset'))
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
