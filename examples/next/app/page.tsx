'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useQuery } from '@fuse/next/client'

import { graphql } from '@/gql'
import { Launch } from '@/components/Launch'
import { LaunchDetails } from '@/components/LaunchDetails'
import styles from './page.module.css'

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
    <main className={styles.main}>
      <h1>SpaceX Launches</h1>
      <ul className={styles.list}>
        {result.data?.launches.nodes.map(
          (node) =>
            node && (
              <Launch
                key={node.id}
                launch={node}
                select={setSelected}
                selected={selected === node.id}
              />
            ),
        )}
      </ul>
      <Suspense>{selected && <LaunchDetails id={selected} />}</Suspense>
    </main>
  )
}
