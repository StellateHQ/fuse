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

export type Launch = Node & {
  __typename: 'Launch'
  id: Scalars['ID']['output']
  launchDate: Scalars['String']['output']
  name: Scalars['String']['output']
  rocket?: Maybe<Rocket>
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

export type Query = {
  __typename: 'Query'
  _version: Scalars['String']['output']
  /** A field that resolves fast. */
  fastField: Scalars['String']['output']
  launches: QueryLaunchesConnection
  node?: Maybe<Node>
  nodes: Array<Maybe<Node>>
  /** A field that resolves slowly. */
  slowfield: Scalars['String']['output']
  user?: Maybe<User>
  users: QueryUsersConnection
}

export type QueryLaunchesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

export type QueryNodeArgs = {
  id: Scalars['ID']['input']
}

export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>
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

export type QueryLaunchesConnection = {
  __typename: 'QueryLaunchesConnection'
  edges: Array<Maybe<QueryLaunchesConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryLaunchesConnectionEdge = {
  __typename: 'QueryLaunchesConnectionEdge'
  cursor: Scalars['String']['output']
  node: Launch
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

export type Rocket = Node & {
  __typename: 'Rocket'
  company: Scalars['String']['output']
  cost: Scalars['Int']['output']
  country: Scalars['String']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
}

export type User = Node & {
  __typename: 'User'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type LaunchesQueryVariables = Exact<{ [key: string]: never }>

export type LaunchesQuery = {
  __typename: 'Query'
  launches: {
    __typename: 'QueryLaunchesConnection'
    edges: Array<{
      __typename: 'QueryLaunchesConnectionEdge'
      node: {
        __typename: 'Launch'
        id: string
        name: string
        launchDate: string
      }
    } | null>
  }
}

export type LaunchQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type LaunchQuery = {
  __typename: 'Query'
  node?:
    | {
        __typename: 'Launch'
        id: string
        name: string
        launchDate: string
        rocket?: {
          __typename: 'Rocket'
          cost: number
          country: string
          company: string
          description: string
        } | null
      }
    | { __typename: 'Rocket' }
    | { __typename: 'User' }
    | null
}

export const LaunchesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Launches' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'launches' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
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
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'launchDate' },
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
  ],
} as unknown as DocumentNode<LaunchesQuery, LaunchesQueryVariables>
export const LaunchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Launch' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'node' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Launch' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'launchDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rocket' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cost' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'company' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
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
  ],
} as unknown as DocumentNode<LaunchQuery, LaunchQueryVariables>
