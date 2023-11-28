'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useMemo } from 'react'
import {
  Provider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from '@fuse/next/client'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange()
    const client = createClient({
      url: 'http://localhost:3000/api/datalayer',
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    })

    return [client, ssr]
  }, [])
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider client={client} ssr={ssr}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
