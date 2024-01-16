import * as React from 'react'

import { graphql, useQuery } from './fuse'
import { LaunchItem } from './components/LaunchItem'
import { PageNumbers } from './components/PageNumbers'
import { LaunchDetails } from './components/LaunchDetails'

export default function Page() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
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
  const [selected, setSelected] = React.useState<string | null>(null)
  const [offset, setOffset] = React.useState(0)

  const [result] = useQuery({
    query: LaunchesQuery,
    variables: { limit: 10, offset },
  })

  return (
    <>
      <ul style={{ padding: 0, margin: 0 }}>
        {result.data?.launches.nodes.map(
          (node) =>
            node && (
              <LaunchItem
                select={() => setSelected(node.id)}
                key={node.id}
                launch={node}
              />
            ),
        )}
      </ul>
      {result.data && (
        <PageNumbers
          setOffset={(x) => setOffset(x)}
          offset={offset}
          list={result.data.launches}
          limit={10}
        />
      )}
      <React.Suspense fallback={<p>Loading details...</p>}>
        {selected && (
          <LaunchDetails deselect={() => setSelected(null)} id={selected} />
        )}
      </React.Suspense>
    </>
  )
}
