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

  async getOne(
    id: string,
    headers?: Record<string, string> | undefined,
  ): Promise<Shape> {
    const response = await fetch(`${this.baseUrl}/${this.path}/${id}`, {
      method: 'GET',
      headers: { ...(headers || {}) },
    })
    const textResult = await response.text()
    const result = tryParseJson(textResult)
    if (response.status > 299) {
      throw new Error(result)
    } else {
      return result
    }
  }

  async list<Result extends Record<string, unknown> | Array<Shape> = Shape[]>(
    params: Record<string, string | number>,
    headers?: Record<string, string> | undefined,
  ): Promise<Result> {
    const searchparams = Object.entries(params).reduce(
      (acc, [key, value], i) => `${acc}${i > 0 ? '&' : ''}${key}=${value}`,
      '?',
    )
    const response = await fetch(
      `${this.baseUrl}/${this.path}${
        Object.keys(params).length ? searchparams : ''
      }`,
      {
        method: 'GET',
        headers: { ...(headers || {}) },
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

  async create(
    body: Partial<Shape>,
    headers?: Record<string, string> | undefined,
  ): Promise<Shape> {
    const response = await fetch(`${this.baseUrl}/${this.path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { ...(headers || {}) },
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

  async delete(
    id: Partial<Shape>,
    headers?: Record<string, string> | undefined,
  ): Promise<void | Shape> {
    const response = await fetch(`${this.baseUrl}/${this.path}/${id}`, {
      method: 'DELETE',
      headers: { ...(headers || {}) },
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

  async update(
    id: string | number,
    body: Partial<Shape>,
    headers?: Record<string, string> | undefined,
  ): Promise<Shape> {
    const response = await fetch(`${this.baseUrl}/${this.path}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: { ...(headers || {}) },
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
