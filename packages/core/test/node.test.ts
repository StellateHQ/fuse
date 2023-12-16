import { test, expect } from 'vitest'
import { printSchema, execute, parse } from 'graphql'

let counter = 0
const importFuse = () => {
  return import('../src/builder?test-node=' + counter++)
}

test('Should resolve a node by id', async () => {
  const mod = await importFuse()
  const { node, builder, addQueryFields } = mod

  const data = [
    { id: '1', mission_name: 'test' },
    { id: '2', mission_name: 'test-2' },
    { id: '3', mission_name: 'test-3' },
  ]
  const TestNode = node({
    name: 'Test',
    load: (ids) => ids.map((id) => data.find((x) => x.id === id)),
    fields: (t) => ({
      name: t.exposeString('mission_name'),
    }),
  })

  addQueryFields((t) => ({
    tests: t.field({
      type: [TestNode],
      resolve: () => {
        const ids = data.map((x) => x.id)
        return ids
      },
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

    interface Node {
      id: ID!
    }

    type Query {
      _version: String!
      node(id: ID!): Node
      nodes(ids: [ID!]!): [Node]!
      test(id: ID!): Test
      tests: [Test!]
    }

    type Test implements Node {
      id: ID!
      name: String
    }"
  `)

  const result = await execute({
    schema,
    contextValue: {},
    document: parse(`
      query {
        tests {
          id
          name
        }
      }
    `),
  })

  expect(result.data).toBeDefined()
  expect(result.data?.tests).toEqual([
    { id: btoa('Test:1'), name: 'test' },
    { id: btoa('Test:2'), name: 'test-2' },
    { id: btoa('Test:3'), name: 'test-3' },
  ])
})
