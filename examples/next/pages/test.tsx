'use client'

import * as React from 'react'
import { useRouter } from 'next/router'
import {
  useQuery,
  withUrqlClient,
  initUrqlClient,
  ssrExchange,
  cacheExchange,
  fetchExchange,
} from 'fuse/next/pages'

import { graphql } from '@/gql'

import styles from '../app/client/page.module.css'

function Page() {
  return (
    <main className={styles.main}>
      <h1>SpaceX Launches</h1>
      <Launches />
    </main>
  )
}

const LaunchesQuery = graphql(`
  query PageLaunches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      nodes {
        id
        name
      }
      totalCount
    }
  }
`)

function Launches() {
  const router = useRouter()

  const offset = router.query['offset'] ? Number(router.query['offset']) : 0

  const [result] = useQuery({
    query: LaunchesQuery,
    variables: { limit: 10, offset },
  })

  return (
    <>
      <ul className={styles.list}>
        {result.data?.launches.nodes.map(
          (node) => node && <li key={node.id}>{node.name}</li>,
        )}
      </ul>
      {result.data?.launches.totalCount}
    </>
  )
}

export async function getServerSideProps() {
  const ssrCache = ssrExchange({ isClient: false })
  const client = initUrqlClient({
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://spacex-fuse.vercel.app/api/fuse'
        : 'http://localhost:3000/api/fuse',
    exchanges: [cacheExchange, ssrCache, fetchExchange],
  })

  await client.query(LaunchesQuery, { limit: 10, offset: 0 }).toPromise()

  const urqlState = ssrCache.extractData()

  return {
    props: {
      urqlState,
    },
  }
}

export default withUrqlClient((ssrCache) => ({
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://spacex-fuse.vercel.app/api/fuse'
      : 'http://localhost:3000/api/fuse',
  exchanges: [cacheExchange, ssrCache, fetchExchange],
}))(Page)
