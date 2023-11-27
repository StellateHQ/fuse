import { FragmentType, graphql, useFragment } from '@/gql'

const LaunchFields = graphql(`
  fragment LaunchFields on Launch {
    id
    name
    launchDate
  }
`)

export const Launch = (props: {
  launch: FragmentType<typeof LaunchFields>
  select: (id: string) => void
}) => {
  const node = useFragment(LaunchFields, props.launch)
  return (
    <li key={node.id} onClick={() => props.select(node.id)}>
      {node.name} Launched at {new Date(node.launchDate).toUTCString()}
    </li>
  )
}
