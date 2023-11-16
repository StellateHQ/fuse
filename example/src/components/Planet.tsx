import React from 'react';
import { FragmentType, useFragment, graphql } from '../gql'
import { Resident } from './Resident';
 
export const PlanetFragment = graphql(/* GraphQL */ `
  fragment PlanetFields_Planet on Planet {
    name
    population
    residents {
      id
      ...ResidentFields_Resident
    }
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
      <h2>Inhabitants</h2>
      <ul>
        {planet.residents.map((resident) => resident && <Resident key={resident.id} resident={resident}/>)}
      </ul>
    </li>
  )
}
 