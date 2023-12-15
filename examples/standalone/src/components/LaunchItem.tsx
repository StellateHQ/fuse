import { FragmentType, graphql, useFragment } from '../../fuse'
import styles from './LaunchItem.module.css'

const LaunchFields = graphql(`
  fragment LaunchFields on Launch {
    name
    launchDate
    image
  }
`)

export const LaunchItem = (props: {
  launch: FragmentType<typeof LaunchFields>
  select: () => void
}) => {
  const node = useFragment(LaunchFields, props.launch)

  return (
    <li className={styles.item} onClick={props.select}>
      <img className={styles.badge} src={node.image} alt={node.name} />
      <span className={styles.info}>
        <h3 className={styles.launchTitle}>{node.name}</h3>
        {node.launchDate && (
          <p className={styles.launchTitle}>
            Launched at {new Date(node.launchDate).toUTCString()}
          </p>
        )}
      </span>
    </li>
  )
}
