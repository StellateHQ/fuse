export interface Datasource<T> {
  getOne(id: string | number, headers?: Record<string, unknown>): Promise<T>
  getMany?(
    ids: Array<string | number>,
    headers?: Record<string, unknown>,
  ): Promise<T[]>
  list(params: Record<string, unknown>): Promise<{ nodes: T[] }>
}
