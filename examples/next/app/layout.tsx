'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useMemo } from 'react'
import {
  UrqlProvider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from '@urql/next'

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
        <UrqlProvider client={client} ssr={ssr}>
          {children}
        </UrqlProvider>
      </body>
    </html>
  )
}
