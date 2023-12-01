import { test, expect } from 'vitest'
import { printSchema } from 'graphql'

test('Should output a schema', async () => {
  // @ts-ignore
  const mod = await import('../src/builder?test=1') // We bust the cache by adding the query-param, this is similar to the ESM-HMR spec ;)
  const { addQueryFields, builder } = mod
  addQueryFields((t) => ({
    hello: t.field({
      type: 'String',
      resolve: () => 'world',
    }),
  }))

  const schema = builder.toSchema()
  expect(printSchema(schema)).toMatchInlineSnapshot(`
    "\\"\\"\\"
    A date string, such as 2007-12-03, compliant with the \`full-date\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
    \\"\\"\\"
    scalar Date

    \\"\\"\\"
    The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
    \\"\\"\\"
    scalar JSON

    type Mutation {
      _version: String!
    }

    type Query {
      _version: String!
      hello: String
    }"
  `)
})

test('Should output a node', async () => {
  // @ts-ignore
  const mod = await import('../src/builder?test=2')
  const { node, builder } = mod

  // @ts-ignore
  node<{ id: string; mission_name: string }>({
    name: 'Test',
    load: (ids) =>
      Promise.resolve(ids.map((id) => ({ id, mission_name: 'test' }))),
    fields: (t) => ({
      name: t.exposeString('mission_name'),
    }),
  })

  const schema = builder.toSchema()
  expect(printSchema(schema)).toMatchInlineSnapshot(`
    "\\"\\"\\"
    A date string, such as 2007-12-03, compliant with the \`full-date\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
    \\"\\"\\"
    scalar Date

    \\"\\"\\"
    The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
    \\"\\"\\"
    scalar JSON

    type Mutation {
      _version: String!
    }

    interface Node {
      id: ID!
    }

    type Query {
      _version: String!
      node(id: ID!): Node
      nodes(ids: [ID!]!): [Node]!
    }

    type Test implements Node {
      id: ID!
      name: String
    }"
  `)
})

test('Should extend a node', async () => {
  // @ts-ignore
  const mod = await import('../src/builder?test=3')
  const { node, builder, addNodeFields, object } = mod

  const Obj = object({
    name: 'Location',
    fields: (t) => ({
      title: t.string(),
    }),
  })

  // @ts-ignore
  const TestNode = node<{ id: string; mission_name: string }>({
    name: 'Test',
    load: (ids) =>
      Promise.resolve(ids.map((id) => ({ id, mission_name: 'test' }))),
    fields: (t) => ({
      name: t.exposeString('mission_name'),
    }),
  })

  addNodeFields(TestNode, (t) => ({
    connect: t.simpleList({
      type: Obj,
    }),
  }))

  const schema = builder.toSchema()
  expect(printSchema(schema)).toMatchInlineSnapshot(`
    "\\"\\"\\"
    A date string, such as 2007-12-03, compliant with the \`full-date\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
    \\"\\"\\"
    scalar Date

    \\"\\"\\"
    The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
    \\"\\"\\"
    scalar JSON

    type Location {
      title: String
    }

    type Mutation {
      _version: String!
    }

    interface Node {
      id: ID!
    }

    type Query {
      _version: String!
      node(id: ID!): Node
      nodes(ids: [ID!]!): [Node]!
    }

    type Test implements Node {
      connect: TestConnectList
      id: ID!
      name: String
    }

    type TestConnectList {
      nodes: [Location]!
      totalCount: Int
    }"
  `)
})
