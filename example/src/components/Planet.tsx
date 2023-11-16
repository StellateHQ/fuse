import React from 'react';
import { FragmentType, useFragment, graphql } from '../gql'
 
export const PlanetFragment = graphql(/* GraphQL */ `
  fragment PlanetFields_Planet on Planet {
    id
    name
    population
  }
`)
 
export const Planet = (props: {
  planet: FragmentType<typeof PlanetFragment>
}) => {
  const planet = useFragment(PlanetFragment, props.planet)
  return (
    <li>
      <h3>{planet.name}</h3>
      <p>Population: {planet.population}</p>
    </li>
  )
}
 