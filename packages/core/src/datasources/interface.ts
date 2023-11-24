export interface Datasource<T> {
  getOne(id: string | number, headers?: Record<string, string>): Promise<T>
  getMany?(
    ids: Array<string | number>,
    headers?: Record<string, string>,
  ): Promise<T[]>
  list<Result extends Record<string, unknown> | Array<T> = T[]>(
    params: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<Result>
  update(
    id: string | number,
    body: Partial<T>,
    headers?: Record<string, string>,
  ): Promise<T>
  create(body: Partial<T>, headers?: Record<string, string>): Promise<T>
  delete(
    id: string | number,
    headers?: Record<string, string>,
  ): Promise<T | void>
}
