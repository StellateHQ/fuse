import React from 'react';
import { Planet } from './components/Planet';
import { graphql } from './gql'
import { useQuery } from 'urql'

const PlanetsQuery = graphql(`
  query Planets {
    planets(first: 3) {
      edges {
        node {
          id
          ...PlanetFields_Planet
        }
      }
    }
  }
`);

function App() {
  const [result] = useQuery({
    query: PlanetsQuery
  })

  return (
    <main>
      <ul>
        {result.data?.planets.edges.map((edge) => edge && <Planet key={edge?.node.id} planet={edge.node}/>)}
      </ul>
    </main>
  )
}

export default App
