'use client'

import {
  Provider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
  persistedExchange,
} from '@/fuse/client'
import React from 'react'

export const DatalayerProvider = (props: any) => {
  const [client, ssr] = React.useMemo(() => {
    const ssr = ssrExchange();
    const { client } = createClient({
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://spacex-fuse.vercel.app/api/fuse'
          : 'http://localhost:3000/api/fuse',
      exchanges: [cacheExchange, ssr, persistedExchange, fetchExchange],
    })

    return [client, ssr]
  }, [])

  return (
    <Provider client={client} ssr={ssr}>
      {props.children}
    </Provider>
  )
}
