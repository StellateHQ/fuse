'use client'

import { FragmentType, graphql, useFragment } from '../../fuse'

import styles from './PageNumbers.module.css'

const TotalCountFields = graphql(`
  fragment TotalCountFields on QueryLaunchesList {
    totalCount
  }
`)

export const PageNumbers = (props: {
  list: FragmentType<typeof TotalCountFields>
  limit: number
  offset: number
  setOffset: (x: number) => void
}) => {
  const node = useFragment(TotalCountFields, props.list)

  if (!node.totalCount) return null

  const amountOfPages = Math.ceil(node.totalCount / props.limit)
  const currentPage = props.offset / props.limit

  return (
    <ul className={styles.list}>
      {Array(amountOfPages)
        .fill(0)
        .map((_, i) => (
          <li key={i}>
            <button
              onClick={() => props.setOffset(i * props.limit)}
              className={`${styles.pageNumber}${
                currentPage === i ? ` ${styles.active}` : ''
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
    </ul>
  )
}
