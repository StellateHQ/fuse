import { test, expect } from 'vitest'
import { execute, parse } from 'graphql'

let counter = 0
const importFuse = () => {
  return import('../src/builder?test-authorization=' + counter++)
}

test('Should correctly do top-level field authorization', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields, defineAuthScopes } = mod
  defineAuthScopes((ctx) => ({ isLoggedIn: !!ctx.user }))

  addQueryFields((t) => ({
    isLoggedIn: t.field({
      type: 'Boolean',
      description: 'An authentication check',
      authScopes: {
        isLoggedIn: true,
      },
      resolve: () => {
        return true
      },
    }),
  }))

  const schema = builder.toSchema()

  const document = parse(`query { isLoggedIn }`)
  let result = (await execute({
    document,
    schema,
    contextValue: {},
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({ isLoggedIn: null })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(1)
  expect(result.errors[0].message).toEqual('Not authorized')
  expect(result.errors[0].extensions).toEqual({
    code: 'FORBIDDEN',
  })

  result = (await execute({
    document,
    schema,
    contextValue: {
      user: true,
    },
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({ isLoggedIn: true })
})

test('Should correctly do type-level field authorization', async () => {
  const mod = await importFuse()
  const { builder, defineAuthScopes, node } = mod
  defineAuthScopes((ctx) => ({
    canAccessUser: (id) => {
      return ctx.allowedIds.includes(id)
    },
  }))

  node({
    name: 'User',
    authScopes: (parent, args) => ({ canAccessUser: parent.id || args.id }),
    load(ids) {
      return [{ id: ids[0], name: 'Test' }]
    },
    fields: (t) => ({
      name: t.exposeString('name'),
    }),
  })

  const schema = builder.toSchema()

  const document = parse(`query {
    node(id: "VXNlcjox") {
      ... on User { id name }
    }
  }`)
  let result = (await execute({
    document,
    schema,
    contextValue: {
      allowedIds: [],
    },
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({ node: null })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(2)
  expect(result.errors[0].message).toEqual('Not authorized')
  expect(result.errors[0].path).toEqual(['node', 'name'])
  expect(result.errors[0].extensions).toEqual({
    code: 'FORBIDDEN',
  })
  expect(result.errors[1].message).toEqual('Not authorized')
  expect(result.errors[1].path).toEqual(['node', 'id'])
  expect(result.errors[1].extensions).toEqual({
    code: 'FORBIDDEN',
  })

  const alternativeEntry = parse(`query {
    user(id: "VXNlcjox") {
      id name
    }
  }`)
  result = (await execute({
    document: alternativeEntry,
    schema,
    contextValue: {
      allowedIds: [],
    },
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({ user: null })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(2)
  expect(result.errors[0].message).toEqual('Not authorized')
  expect(result.errors[0].path).toEqual(['user', 'name'])
  expect(result.errors[0].extensions).toEqual({
    code: 'FORBIDDEN',
  })
  expect(result.errors[1].message).toEqual('Not authorized')
  expect(result.errors[1].path).toEqual(['user', 'id'])
  expect(result.errors[1].extensions).toEqual({
    code: 'FORBIDDEN',
  })

  result = (await execute({
    document,
    schema,
    contextValue: {
      allowedIds: ['1'],
    },
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({
    node: {
      id: 'VXNlcjox',
      name: 'Test',
    },
  })
})

test('Should correctly do nested field-level authorization', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields, defineAuthScopes, node } = mod
  defineAuthScopes((ctx) => ({
    canAccessUser: (id) => {
      return ctx.allowedIds.includes(id)
    },
    isAdmin: !!ctx.isAdmin,
  }))

  node({
    name: 'User',
    authScopes: (parent, args) => ({ canAccessUser: parent.id || args.id }),
    load(ids) {
      return [{ id: ids[0], name: 'Test', sensitiveAdminField: 'secret' }]
    },
    fields: (t) => ({
      name: t.exposeString('name'),
      sensitiveAdminField: t.exposeString('sensitiveAdminField', {
        authScopes: { isAdmin: true },
      }),
    }),
  })

  const schema = builder.toSchema()

  const document = parse(`query {
    node(id: "VXNlcjox") {
      ... on User { id name sensitiveAdminField }
    }
  }`)
  let result = (await execute({
    document,
    schema,
    contextValue: {
      allowedIds: ['1'],
    },
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({
    node: {
      id: 'VXNlcjox',
      name: 'Test',
      sensitiveAdminField: null,
    },
  })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(1)
  expect(result.errors[0].message).toEqual('Not authorized')
  expect(result.errors[0].path).toEqual(['node', 'sensitiveAdminField'])
  expect(result.errors[0].extensions).toEqual({
    code: 'FORBIDDEN',
  })

  result = (await execute({
    document,
    schema,
    contextValue: {
      allowedIds: ['1'],
      isAdmin: true,
    },
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({
    node: {
      id: 'VXNlcjox',
      name: 'Test',
      sensitiveAdminField: 'secret',
    },
  })
})
