import { FragmentType, graphql, useFragment } from '@/gql'
import styles from './Launch.module.css'

const LaunchFields = graphql(`
  fragment LaunchFields on Launch {
    id
    name
    launchDate
    image
  }
`)

// TODO: selected styles
export const Launch = (props: {
  launch: FragmentType<typeof LaunchFields>
  select: (id: string) => void
  selected: boolean
}) => {
  const node = useFragment(LaunchFields, props.launch)
  return (
    <li
      className={styles.item}
      key={node.id}
      onClick={() => props.select(node.id)}
    >
      <img className={styles.badge} src={node.image} alt={node.name} />
      <span>
        {node.name} Launched at {new Date(node.launchDate).toUTCString()}
      </span>
    </li>
  )
}
