import React from 'react'
import { FragmentType, useFragment, graphql } from '../gql'

export const ResidentFragment = graphql(/* GraphQL */ `
  fragment ResidentFields_Resident on Resident {
    name
    height
    mass
  }
`)

export const Resident = (props: {
  resident: FragmentType<typeof ResidentFragment>
}) => {
  const resident = useFragment(ResidentFragment, props.resident)
  return (
    <li>
      <h3>{resident.name}</h3>
      <p>Height: {resident.height}</p>
      <p>Mass: {resident.mass}</p>
    </li>
  )
}
