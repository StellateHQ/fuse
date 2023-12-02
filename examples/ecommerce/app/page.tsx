import * as React from 'react'
import { registerUrql, createClient, fetchExchange } from 'fuse/next/server'

import styles from './page.module.css'
import { graphql } from '@/gql'
import { Category } from '@/components/Category'

const { getClient } = registerUrql(() =>
  createClient({
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://spacex-fuse.vercel.app/api/fuse'
        : 'http://localhost:3000/api/fuse',
    exchanges: [fetchExchange],
  }),
)

const CategoriesQuery = graphql(`
  query Categories {
    categories {
      ...Category_CategoryFields
    }
  }
`)

export default async function Page({
  searchParams,
}: {
  searchParams: { offset: string; selected?: string }
}) {
  const result = await getClient().query(CategoriesQuery, {}).toPromise()
  return (
    <main className={styles.main}>
      <h1>Fuse Store</h1>
      {result.data?.categories.map((category, i) => (
        <Category key={i} category={category} />
      ))}
    </main>
  )
}
