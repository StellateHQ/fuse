export interface Datasource<T> {
  get(id: string, headers?: Record<string, unknown>): Promise<T>
  list(limit: number, page: number): Promise<{ nodes: T[] }>
}
