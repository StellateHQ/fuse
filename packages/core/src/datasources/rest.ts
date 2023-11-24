import { Datasource } from './interface'

const tryParseJson = (string) => {
  try {
    return JSON.parse(string)
  } catch (e) {
    return string
  }
}

export class RestDatasource<Shape extends {}> implements Datasource<Shape> {
  constructor(
    private baseUrl: string,
    private path: string,
  ) {}

  async fetch<Result>(params: {
    path: string
    body?: Record<string, unknown>
    headers?: Record<string, string> | undefined
    method: string
  }): Promise<Result> {
    const url = `${this.baseUrl}/${this.path}${
      params.path ? `/${params.path}` : ''
    }`
    switch (params.method) {
      case 'GET': {
        const searchparams = Object.entries(params.body || {}).reduce(
          (acc, [key, value], i) => `${acc}${i > 0 ? '&' : ''}${key}=${value}`,
          '?',
        )
        const response = await fetch(
          `${url}${Object.keys(params).length ? searchparams : ''}`,
          {
            method: 'GET',
            headers: { ...(params.headers || {}) },
          },
        )

        const textResult = await response.text()
        const result = tryParseJson(textResult)

        if (response.status > 299) {
          throw new Error(result)
        } else if (typeof result === 'object') {
          return result
        } else {
          throw new Error('Unexpected result from API ' + typeof result)
        }
      }
      case 'DELETE': {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: { ...(params.headers || {}) },
        })

        const textResult = await response.text()
        const result = tryParseJson(textResult)

        if (response.status > 299) {
          throw new Error(result)
        } else if (typeof result === 'object') {
          return result
        } else {
          throw new Error('Unexpected result from API ' + typeof result)
        }
      }
      default: {
        const response = await fetch(url, {
          method: params.method,
          body: JSON.stringify(params.body),
          headers: { ...(params.headers || {}) },
        })

        const textResult = await response.text()
        const result = tryParseJson(textResult)

        if (response.status > 299) {
          throw new Error(result)
        } else if (typeof result === 'object') {
          return result
        } else {
          throw new Error('Unexpected result from API ' + typeof result)
        }
      }
    }
  }

  async getOne(
    id: string,
    headers?: Record<string, string> | undefined,
  ): Promise<Shape> {
    return this.fetch<Shape>({ path: id, method: 'GET', headers })
  }

  async list<Result extends Record<string, unknown> | Array<Shape> = Shape[]>(
    params: Record<string, string | number>,
    headers?: Record<string, string> | undefined,
  ): Promise<Result> {
    return this.fetch<Result>({
      path: '',
      method: 'GET',
      headers,
      body: params,
    })
  }

  async create(
    body: Partial<Shape>,
    headers?: Record<string, string> | undefined,
  ): Promise<Shape> {
    return this.fetch<Shape>({ path: '', method: 'POST', headers, body })
  }

  async delete(
    id: string | number,
    headers?: Record<string, string> | undefined,
  ): Promise<void | Shape> {
    return this.fetch<Shape | void>({
      path: '' + id,
      method: 'DELETE',
      headers,
    })
  }

  async update(
    id: string | number,
    body: Partial<Shape>,
    headers?: Record<string, string> | undefined,
  ): Promise<Shape> {
    return this.fetch<Shape>({ path: '' + id, method: 'POST', headers, body })
  }
}
