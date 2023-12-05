import * as React from 'react'
import { registerClient, createClient } from 'fuse/next/server'

import { graphql } from '@/fuse'
import { LaunchItem } from '@/components/LaunchItem'

import styles from './page.module.css'
import { PageNumbers } from '@/components/PageNumbers'
import { LaunchDetails } from '@/components/LaunchDetails'

const { getClient } = registerClient(() =>
  createClient({
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://spacex-fuse.vercel.app/api/fuse'
        : 'http://localhost:3000/api/fuse',
  }),
)

const LaunchesQuery = graphql(`
  query Launches_RSC($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      nodes {
        id
        ...LaunchFields
      }
      ...TotalCountFields
    }
  }
`)

export default async function Page({
  searchParams,
}: {
  searchParams: { offset: string; selected?: string }
}) {
  const selectedLaunch = searchParams.selected
  const offset = Number(searchParams.offset || 0)

  const result = await getClient().query(LaunchesQuery, { offset })

  return (
    <main className={styles.main}>
      <h1>SpaceX Launches</h1>
      <ul className={styles.list}>
        {result.data?.launches.nodes.map(
          (node) => node && <LaunchItem key={node.id} launch={node} />,
        )}
      </ul>
      {result.data && (
        <PageNumbers limit={10} offset={offset} list={result.data.launches} />
      )}
      {selectedLaunch && (
        <React.Suspense fallback={<p>Loading launch...</p>}>
          <LaunchDetails id={selectedLaunch} />
        </React.Suspense>
      )}
    </main>
  )
}
