import * as React from 'react'
import { registerUrql, createClient, fetchExchange } from 'fuse/next/server'

import styles from './page.module.css'
import { graphql } from '@/gql'
import { Category } from '@/components/Category'
import { Cart } from '@/components/Cart'

const { getClient } = registerUrql(() =>
  createClient({
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://spacex-fuse.vercel.app/api/fuse'
        : 'http://localhost:3000/api/fuse',
    exchanges: [fetchExchange],
  }),
)

const HomePageQuery = graphql(`
  query HomePage {
    myCart {
      ...Cart_CartFields
    }
    categories {
      ...Category_CategoryFields
    }
  }
`)

export default async function Page() {
  const result = await getClient().query(HomePageQuery, {}).toPromise()
  return (
    <main className={styles.main}>
      <h1>Fuse Store</h1>
      {result.data?.myCart && <Cart cart={result.data.myCart} />}
      {result.data?.categories.map((category, i) => (
        <Category key={i} category={category} />
      ))}
    </main>
  )
}
