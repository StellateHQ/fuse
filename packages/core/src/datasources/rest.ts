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

  async getOne(id: string): Promise<Shape> {
    const response = await fetch(`${this.baseUrl}/${this.path}/${id}`)
    const textResult = await response.text()
    const result = tryParseJson(textResult)
    if (response.status > 299) {
      throw new Error(result)
    } else {
      return result
    }
  }
  async list(
    params: Record<string, string | number>,
  ): Promise<{ nodes: Shape[] }> {
    const searchparams = Object.entries(params).reduce(
      (acc, [key, value], i) => `${acc}${i > 0 ? '&' : ''}${key}=${value}`,
      '?',
    )
    const response = await fetch(
      `${this.baseUrl}/${this.path}${
        Object.keys(params).length ? searchparams : ''
      }`,
    )
    const textResult = await response.text()
    const result = tryParseJson(textResult)

    if (response.status > 299) {
      throw new Error(result)
    } else if (typeof result === 'object') {
      return { nodes: result as Shape[] }
    } else {
      throw new Error('Unexpected result from API ' + typeof result)
    }
  }
}
