import { test, expect } from 'vitest'
import { execute, parse } from 'graphql'

let counter = 0
const importFuse = () => {
  return import('../src/builder?test-errors=' + counter++)
}

test('Should correctly format an authentication error', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields, AuthenticationError } = mod

  addQueryFields((t) => ({
    authn: t.field({
      type: 'String',
      description: 'An authentication check',
      resolve: () => {
        throw new AuthenticationError('You are not authenticated')
      },
    }),
  }))

  const schema = builder.toSchema()

  const document = parse(`query { authn }`)
  const result = (await execute({
    document,
    schema,
    contextValue: {},
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({ authn: null })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(1)
  expect(result.errors[0].message).toEqual('You are not authenticated')
  expect(result.errors[0].extensions).toEqual({
    code: 'UNAUTHENTICATED',
  })
})

test('Should correctly format an authorization error', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields, ForbiddenError } = mod

  addQueryFields((t) => ({
    authz: t.field({
      type: 'String',
      description: 'An authorization check',
      resolve: () => {
        throw new ForbiddenError('You are not authorized')
      },
    }),
  }))

  const schema = builder.toSchema()

  const document = parse(`query { authz }`)
  const result = (await execute({
    document,
    schema,
    contextValue: {},
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({ authz: null })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(1)
  expect(result.errors[0].message).toEqual('You are not authorized')
  expect(result.errors[0].extensions).toEqual({
    code: 'FORBIDDEN',
  })
})

test('Should correctly format a not-found error', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields, NotFoundError } = mod

  addQueryFields((t) => ({
    notFound: t.field({
      type: 'String',
      description: 'An authorization check',
      resolve: () => {
        throw new NotFoundError('Entity cannot be found')
      },
    }),
  }))

  const schema = builder.toSchema()

  const document = parse(`query { notFound }`)
  const result = (await execute({
    document,
    schema,
    contextValue: {},
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({ notFound: null })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(1)
  expect(result.errors[0].message).toEqual('Entity cannot be found')
  expect(result.errors[0].extensions).toEqual({
    code: 'NOT_FOUND',
  })
})

test('Should correctly format an authorization error', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields, ForbiddenError } = mod

  addQueryFields((t) => ({
    authz: t.field({
      type: 'String',
      description: 'A not-found check',
      resolve: () => {
        throw new ForbiddenError('You are not authorized')
      },
    }),
  }))

  const schema = builder.toSchema()

  const document = parse(`query { authz }`)
  const result = (await execute({
    document,
    schema,
    contextValue: {},
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({ authz: null })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(1)
  expect(result.errors[0].message).toEqual('You are not authorized')
  expect(result.errors[0].extensions).toEqual({
    code: 'FORBIDDEN',
  })
})

test('Should correctly format a bad-request error', async () => {
  const mod = await importFuse()
  const { builder, addQueryFields, BadRequestError } = mod

  addQueryFields((t) => ({
    badRequest: t.field({
      type: 'String',
      description: 'A bad-request check',
      resolve: () => {
        throw new BadRequestError('Missing id')
      },
    }),
  }))

  const schema = builder.toSchema()

  const document = parse(`query { badRequest }`)
  const result = (await execute({
    document,
    schema,
    contextValue: {},
  })) as { data?: any; errors?: any }

  expect(result.data).toEqual({ badRequest: null })
  expect(result.errors).toBeDefined()
  expect(result.errors).toHaveLength(1)
  expect(result.errors[0].message).toEqual('Missing id')
  expect(result.errors[0].extensions).toEqual({
    code: 'BAD_REQUEST',
  })
})
