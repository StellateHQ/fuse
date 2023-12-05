'use client'

import { useRouter, usePathname } from 'next/navigation'

import { FragmentType, graphql, useFragment } from '@/fuse'

import styles from './PageNumbers.module.css'
import { sayHello } from './actions/sayHello'

const TotalCountFields = graphql(`
  fragment TotalCountFields on QueryLaunchesList {
    totalCount
  }
`)

export const PageNumbers = (props: {
  list: FragmentType<typeof TotalCountFields>
  limit: number
  offset: number
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const node = useFragment(TotalCountFields, props.list)

  if (!node.totalCount) return null

  const amountOfPages = Math.ceil(node.totalCount / props.limit)
  const currentPage = props.offset / props.limit

  return (
    <>
      <form action={sayHello}>
        <button onClick={sayHello} type='submit'>
          Do the server-dance
        </button>
      </form>
      <ul className={styles.list}>
        {Array(amountOfPages)
          .fill(0)
          .map((_, i) => (
            <li key={i}>
              <button
                onClick={() =>
                  router.replace(`${pathname}?offset=${i * props.limit}`)
                }
                className={`${styles.pageNumber}${
                  currentPage === i ? ` ${styles.active}` : ''
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}
      </ul>
    </>
  )
}
