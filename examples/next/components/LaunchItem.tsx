'use client'

import { FragmentType, graphql, useFragment } from '@/gql'
import styles from './LaunchItem.module.css'
import { usePathname, useRouter } from 'next/navigation'

const LaunchFields = graphql(`
  fragment LaunchFields on Launch {
    id
    name
    launchDate
    image
  }
`)

export const LaunchItem = (props: {
  launch: FragmentType<typeof LaunchFields>
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const node = useFragment(LaunchFields, props.launch)

  return (
    <li
      className={styles.item}
      key={node.id}
      onClick={() => router.replace(`${pathname}?selected=${node.id}`)}
    >
      <img className={styles.badge} src={node.image} alt={node.name} />
      <span className={styles.info}>
        <h3 className={styles.launchTitle}>{node.name}</h3>
        <p className={styles.launchTitle}>
          Launched at {new Date(node.launchDate).toUTCString()}
        </p>
      </span>
    </li>
  )
}
