import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { createYoga } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'

import { builder } from './builder'

export async function fetch(
  event: APIGatewayEvent,
  lambdaContext: Context,
): Promise<APIGatewayProxyResult> {
  let ctx
  import.meta.glob('/types/*.ts', { eager: true })
  const context = import.meta.glob('/_context.ts', { eager: true })
  if (context['/_context.ts']) {
    const mod = context['/_context.ts']
    if ((mod as any).getContext) {
      ctx = (mod as any).getContext
    }
  }

  const completedSchema = builder.toSchema({})

  const yoga = createYoga({
    schema: completedSchema,
    // We allow batching by default
    batching: true,
    context: ctx,
    plugins: [useDeferStream()],
  })

  const response = await yoga.fetch(
    event.path +
      '?' +
      new URLSearchParams(
        (event.queryStringParameters as Record<string, string>) || {},
      ).toString(),
    {
      method: event.httpMethod,
      headers: event.headers as HeadersInit,
      body: event.body
        ? Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8')
        : undefined,
    },
    {
      event,
      lambdaContext,
    },
  )

  const responseHeaders = Object.fromEntries(response.headers.entries())

  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: await response.text(),
    isBase64Encoded: false,
  }
}
