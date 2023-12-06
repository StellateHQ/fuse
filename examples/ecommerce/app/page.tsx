import * as React from 'react'

import styles from './page.module.css'
import { graphql } from '@/fuse'
import { execute } from '@/fuse/server'
import { Category } from '@/components/Category'
import { Cart } from '@/components/Cart'

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
  const result = await execute({ query: HomePageQuery, variables: {} })
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
