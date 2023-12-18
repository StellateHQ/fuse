export type Key = string | number

export interface Datasource<T extends {}> {
  getMany?(ids: Key[], ctx: any): Promise<Array<T>> | Array<T>
}

/**
 * A datasource is a way to fetch data from a remote source. It can be a REST API, a database, an
 * external third party service, etc. All that's needed is to extend the class and pass it to a node.
 *
 * @example
 * ```ts
 * class RestDatasource extends Datasource<T> {
 *   getMany(ids: Key[], ctx: any): Promise<Array<T>> | Array<T> {
 *     // getMany is optional, however using it has a performance benefit.
 *     // a node will be able to resolve all the ids in a single request rather
 *     // than n (being the amount of ids) requests.
 *   }
 *
 *   getOne(id: Key, ctx: any): Promise<T> | T {
 *     return fetch().then(x => x.json())
 *   }
 * }
 * ```
 */
export abstract class Datasource<T extends {}> {
  abstract getOne(id: Key, ctx: any): Promise<T> | T
}
