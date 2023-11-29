import { GraphQLError } from 'graphql'

export abstract class FuseError extends GraphQLError {
  abstract readonly name: string

  constructor(
    message: string,
    extensions: {
      code: string
      http?: {
        status: number
      }
    },
  ) {
    super(message, {
      extensions,
    })
  }
}

/** For use when user is not authenticated or unknown. */
export class AuthenticationError extends FuseError {
  name = 'UnauthenticatedError'
  constructor(message = 'Unauthenticated') {
    super(message, { code: 'UNAUTHENTICATED' })
  }
}

/** For use when a resource is not found or not accessible by an authenticated user. */
export class ForbiddenError extends FuseError {
  name = 'ForbiddenError'
  constructor(message = 'Forbidden') {
    super(message, { code: 'FORBIDDEN' })
  }
}

/** For use when a resource is not found. */
export class NotFoundError extends FuseError {
  name = 'NotFoundError'
  constructor(message = 'Not Found') {
    super(message, { code: 'NOT_FOUND' })
  }
}

/** For use when any input was invalid or when a resource does not exist but is assumed to exist. */
export class BadRequestError extends FuseError {
  name = 'BadRequestError'
  constructor(message = 'Bad Request') {
    super(message, { code: 'BAD_REQUEST' })
  }
}
