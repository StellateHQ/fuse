import { Client } from '@urql/core'
export * from '@urql/core'

/** Function to cache an urql-client across React Server Components.
 *
 * @param makeClient - A function that creates an urql-client.
 * @returns an object containing a getClient method.
 *
 * @example
 * ```ts
 * import { cacheExchange, createClient, fetchExchange, gql } from '@urql/core';
 * import { registerUrql } from '@urql/next/rsc';
 * const makeClient = () => {
 *   return createClient({
 *     url: 'https://trygql.formidable.dev/graphql/basic-pokedex',
 *     exchanges: [cacheExchange, fetchExchange],
 *   });
 * };
 *
 * const { getClient } = registerUrql(makeClient);
 * ```
 */
declare function registerUrql(makeClient: () => Client): {
  getClient: () => Client
}

export { registerUrql }
