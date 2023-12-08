'use client'

import {
  Provider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
  persistedExchange,
  debugExchange,
} from '@/fuse/client'
import React, { Suspense } from 'react'

export const DatalayerProvider = (props: any) => {
  const [client, ssr] = React.useMemo(() => {
    const ssr = ssrExchange()
    const { client } = createClient({
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://spacex-fuse.vercel.app/api/fuse'
          : 'http://localhost:3000/api/fuse',
      exchanges: [
        cacheExchange,
        ssr,
        persistedExchange,
        debugExchange,
        fetchExchange,
      ],
    })

    return [client, ssr]
  }, [])

  return (
    <Provider client={client} ssr={ssr}>
      <Suspense>{props.children}</Suspense>
    </Provider>
  )
}
