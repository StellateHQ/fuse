import { FragmentOf, graphql, readFragment } from '../fuse'

import styles from './PageNumbers.module.css'

export const TotalCountFields = graphql(`
  fragment TotalCountFields on QueryLaunchesList {
    totalCount
  }
`)

export const PageNumbers = (props: {
  list: FragmentOf<typeof TotalCountFields>
  limit: number
  offset: number
  setOffset: (x: number) => void
}) => {
  const node = readFragment(TotalCountFields, props.list)

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
