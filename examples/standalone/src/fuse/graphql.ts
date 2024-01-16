import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './introspection'

export const graphql = initGraphQLTada<{
  introspection: typeof introspection
}>()

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada'
export { readFragment } from 'gql.tada'
