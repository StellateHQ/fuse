import { test, expect } from 'vitest'
import { printSchema, execute, parse } from 'graphql'

let counter = 0
const importFuse = () => {
  return import('../src/builder?test-list=' + counter++)
}

test('Should default to a nullable node, and non-nullable array', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields } = mod

  addQueryFields((t) => ({
    list: t.list({
      type: 'String',
      description: 'A paginated list of string-scalars',
      resolve: () => ({
        nodes: ['a', 'b', null],
        totalCount: 3,
      }),
    }),
  }))

  const schema = builder.toSchema()
  expect(printSchema(schema)).toMatchInlineSnapshot(`
    """"
    A date string, such as 2007-12-03, compliant with the \`full-date\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
    """
    scalar Date

    """
    The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
    """
    scalar JSON

    type Mutation {
      _version: String!
    }

    type Query {
      _version: String!

      """A paginated list of string-scalars"""
      list: QueryList
    }

    type QueryList {
      nodes: [String]!
      totalCount: Int
    }"
  `)

  const document = parse(`query { list { nodes totalCount } }`)
  const result = (await execute({
    document,
    schema,
    contextValue: {},
  })) as { data?: any; errors?: any }

  expect(result.data).toBeDefined()
  expect(result.data?.list?.nodes).toEqual(['a', 'b', null])
  expect(result.data?.list?.totalCount).toEqual(3)
})

test('Should allow for a non-nullable field', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields } = mod

  addQueryFields((t) => ({
    list: t.list({
      type: 'String',
      nullable: false,
      description: 'A paginated list of string-scalars',
      resolve: () => null,
    }),
  }))

  const schema = builder.toSchema()
  expect(printSchema(schema)).toMatchInlineSnapshot(`
    """"
    A date string, such as 2007-12-03, compliant with the \`full-date\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
    """
    scalar Date

    """
    The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
    """
    scalar JSON

    type Mutation {
      _version: String!
    }

    type Query {
      _version: String!

      """A paginated list of string-scalars"""
      list: QueryList!
    }

    type QueryList {
      nodes: [String]!
      totalCount: Int
    }"
  `)

  const document = parse(`query { list { nodes totalCount } }`)
  const result = (await execute({
    document,
    schema,
    contextValue: {},
  })) as { data?: any; errors?: any }

  expect(result.data).toBe(null)
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(1)
  expect(result.errors[0].message).toEqual(
    'Cannot return null for non-nullable field Query.list.',
  )
})

test('Should allow for a non-nullable node', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields } = mod

  addQueryFields((t) => ({
    list: t.list({
      type: 'String',
      nodeNullable: false,
      description: 'A paginated list of string-scalars',
      resolve: () => ({
        nodes: ['a', 'b', null],
        totalCount: 3,
      }),
    }),
  }))

  const schema = builder.toSchema()
  expect(printSchema(schema)).toMatchInlineSnapshot(`
    """"
    A date string, such as 2007-12-03, compliant with the \`full-date\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
    """
    scalar Date

    """
    The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
    """
    scalar JSON

    type Mutation {
      _version: String!
    }

    type Query {
      _version: String!

      """A paginated list of string-scalars"""
      list: QueryList
    }

    type QueryList {
      nodes: [String!]!
      totalCount: Int
    }"
  `)

  const document = parse(`query { list { nodes totalCount } }`)
  const result = (await execute({
    document,
    schema,
    contextValue: {},
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({
    list: null,
  })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(1)
  expect(result.errors[0].message).toEqual(
    'Cannot return null for non-nullable field QueryList.nodes.',
  )
})
