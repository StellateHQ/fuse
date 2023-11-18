/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
}

export type Film = Node & {
  __typename: 'Film'
  director: Scalars['String']['output']
  id: Scalars['ID']['output']
  producer: Scalars['String']['output']
  title: Scalars['String']['output']
}

export type Mutation = {
  __typename: 'Mutation'
  _version: Scalars['String']['output']
  updateUser: User
}

export type MutationUpdateUserArgs = {
  name: Scalars['String']['input']
}

export type Node = {
  id: Scalars['ID']['output']
}

export type PageInfo = {
  __typename: 'PageInfo'
  endCursor?: Maybe<Scalars['String']['output']>
  hasNextPage: Scalars['Boolean']['output']
  hasPreviousPage: Scalars['Boolean']['output']
  startCursor?: Maybe<Scalars['String']['output']>
}

export type Planet = Node & {
  __typename: 'Planet'
  climate: Scalars['String']['output']
  films: Array<Film>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  population: Scalars['String']['output']
  residents?: Maybe<Array<Resident>>
}

export type Query = {
  __typename: 'Query'
  _version: Scalars['String']['output']
  /** A field that resolves fast. */
  fastField: Scalars['String']['output']
  node?: Maybe<Node>
  nodes: Array<Maybe<Node>>
  planet?: Maybe<Planet>
  planets: QueryPlanetsConnection
  /** A field that resolves slowly. */
  slowfield: Scalars['String']['output']
  user?: Maybe<User>
  users: QueryUsersConnection
}

export type QueryNodeArgs = {
  id: Scalars['ID']['input']
}

export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type QueryPlanetArgs = {
  id: Scalars['ID']['input']
}

export type QueryPlanetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

export type QuerySlowfieldArgs = {
  waitFor?: InputMaybe<Scalars['Int']['input']>
}

export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

export type QueryPlanetsConnection = {
  __typename: 'QueryPlanetsConnection'
  edges: Array<Maybe<QueryPlanetsConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryPlanetsConnectionEdge = {
  __typename: 'QueryPlanetsConnectionEdge'
  cursor: Scalars['String']['output']
  node: Planet
}

export type QueryUsersConnection = {
  __typename: 'QueryUsersConnection'
  edges: Array<Maybe<QueryUsersConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryUsersConnectionEdge = {
  __typename: 'QueryUsersConnectionEdge'
  cursor: Scalars['String']['output']
  node: User
}

export type Resident = Node & {
  __typename: 'Resident'
  height: Scalars['String']['output']
  id: Scalars['ID']['output']
  mass: Scalars['String']['output']
  name: Scalars['String']['output']
}

export type User = Node & {
  __typename: 'User'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type PlanetsQueryVariables = Exact<{ [key: string]: never }>

export type PlanetsQuery = {
  __typename: 'Query'
  planets: {
    __typename: 'QueryPlanetsConnection'
    edges: Array<{
      __typename: 'QueryPlanetsConnectionEdge'
      node: { __typename: 'Planet'; id: string } & {
        ' $fragmentRefs'?: {
          PlanetFields_PlanetFragment: PlanetFields_PlanetFragment
        }
      }
    } | null>
  }
}

export type PlanetFields_PlanetFragment = {
  __typename: 'Planet'
  name: string
  population: string
  residents?: Array<
    { __typename: 'Resident'; id: string } & {
      ' $fragmentRefs'?: {
        ResidentFields_ResidentFragment: ResidentFields_ResidentFragment
      }
    }
  > | null
} & { ' $fragmentName'?: 'PlanetFields_PlanetFragment' }

export type ResidentFields_ResidentFragment = {
  __typename: 'Resident'
  name: string
  height: string
  mass: string
} & { ' $fragmentName'?: 'ResidentFields_ResidentFragment' }

export const ResidentFields_ResidentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ResidentFields_Resident' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Resident' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mass' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResidentFields_ResidentFragment, unknown>
export const PlanetFields_PlanetFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlanetFields_Planet' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Planet' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'population' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'residents' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ResidentFields_Resident' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ResidentFields_Resident' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Resident' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mass' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PlanetFields_PlanetFragment, unknown>
export const PlanetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Planets' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'planets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'IntValue', value: '3' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'PlanetFields_Planet',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ResidentFields_Resident' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Resident' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mass' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlanetFields_Planet' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Planet' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'population' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'residents' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ResidentFields_Resident' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PlanetsQuery, PlanetsQueryVariables>
