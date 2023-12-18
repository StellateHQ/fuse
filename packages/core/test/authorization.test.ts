import { test, expect } from 'vitest'
import { execute, parse } from 'graphql'

let counter = 0
const importFuse = () => {
  return import('../src/builder?test-authorization=' + counter++)
}

test('Should correctly format an authentication error', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields, addAuthScopes } = mod
  addAuthScopes((ctx) => ({ isLoggedIn: !!ctx.user }))

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
