/* eslint-disable */
// This is a generated file!

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

export type Cart = {
  __typename: 'Cart'
  id?: Maybe<Scalars['ID']['output']>
  items?: Maybe<Array<CartItem>>
}

export type CartItem = {
  __typename: 'CartItem'
  product?: Maybe<Product>
  quantity?: Maybe<Scalars['Int']['output']>
}

export type Category = {
  __typename: 'Category'
  name: Scalars['String']['output']
  products: Array<Product>
}

export type Mutation = {
  __typename: 'Mutation'
  _version: Scalars['String']['output']
  addToCart?: Maybe<Cart>
}

export type MutationAddToCartArgs = {
  productId: Scalars['ID']['input']
  quantity?: InputMaybe<Scalars['Int']['input']>
}

export type Node = {
  id: Scalars['ID']['output']
}

export type Product = Node & {
  __typename: 'Product'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  image: Scalars['String']['output']
  name: Scalars['String']['output']
  price: Scalars['Float']['output']
}

export type Query = {
  __typename: 'Query'
  _version: Scalars['String']['output']
  cart?: Maybe<Cart>
  categories: Array<Category>
  node?: Maybe<Node>
  nodes: Array<Maybe<Node>>
  product?: Maybe<Product>
}

export type QueryNodeArgs = {
  id: Scalars['ID']['input']
}

export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type QueryProductArgs = {
  id: Scalars['ID']['input']
}

export type HomePageQueryVariables = Exact<{ [key: string]: never }>

export type HomePageQuery = {
  __typename: 'Query'
  cart?: {
    __typename: 'Cart'
    id?: string | null
    items?: Array<{
      __typename: 'CartItem'
      quantity?: number | null
      product?: {
        __typename: 'Product'
        id: string
        name: string
        price: number
      } | null
    }> | null
  } | null
  categories: Array<
    { __typename: 'Category' } & {
      ' $fragmentRefs'?: {
        Category_CategoryFieldsFragment: Category_CategoryFieldsFragment
      }
    }
  >
}

export type Category_CategoryFieldsFragment = {
  __typename: 'Category'
  name: string
  products: Array<
    { __typename: 'Product'; id: string } & {
      ' $fragmentRefs'?: {
        Product_ProductFieldsFragment: Product_ProductFieldsFragment
      }
    }
  >
} & { ' $fragmentName'?: 'Category_CategoryFieldsFragment' }

export type Product_ProductFieldsFragment = {
  __typename: 'Product'
  id: string
  name: string
  image: string
  description?: string | null
  price: number
} & { ' $fragmentName'?: 'Product_ProductFieldsFragment' }

export const Product_ProductFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Product_ProductFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Product' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Product_ProductFieldsFragment, unknown>
export const Category_CategoryFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Category_CategoryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Category' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Product_ProductFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Product_ProductFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Product' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Category_CategoryFieldsFragment, unknown>
export const HomePageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'HomePage' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cart' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
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
                              name: { kind: 'Name', value: 'price' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Category_CategoryFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Product_ProductFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Product' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Category_CategoryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Category' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Product_ProductFields' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>
