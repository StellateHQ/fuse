/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query Launches_SSR($offset: Int) {\n    launches(limit: 10, offset: $offset) {\n      nodes {\n        id\n        ...LaunchFields\n      }\n      ...TotalCountFields\n    }\n  }\n':
    types.Launches_SsrDocument,
  '\n  query Launches_RSC($offset: Int) {\n    launches(limit: 10, offset: $offset) {\n      nodes {\n        id\n        ...LaunchFields\n      }\n      ...TotalCountFields\n    }\n  }\n':
    types.Launches_RscDocument,
  '\n  query LaunchDetails($id: ID!) {\n    node(id: $id) {\n      ... on Launch {\n        id\n        name\n        details\n        launchDate\n        image\n        site {\n          ...LaunchSiteFields\n        }\n        rocket {\n          cost\n          country\n          company\n          description\n        }\n      }\n    }\n  }\n':
    types.LaunchDetailsDocument,
  '\n  fragment LaunchFields on Launch {\n    id\n    name\n    launchDate\n    image\n  }\n':
    types.LaunchFieldsFragmentDoc,
  '\n  fragment LaunchSiteFields on Site {\n    id\n    name\n    details\n    status\n    location {\n      ...SiteLocationFields\n    }\n  }\n':
    types.LaunchSiteFieldsFragmentDoc,
  '\n  fragment SiteLocationFields on Location {\n    latitude\n    longitude\n    name\n    region\n  }\n':
    types.SiteLocationFieldsFragmentDoc,
  '\n  fragment TotalCountFields on QueryLaunchesList {\n    totalCount\n  }\n':
    types.TotalCountFieldsFragmentDoc,
  '\n  query PageLaunches($offset: Int) {\n    launches(limit: 10, offset: $offset) {\n      nodes {\n        id\n        name\n      }\n      totalCount\n    }\n  }\n':
    types.PageLaunchesDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Launches_SSR($offset: Int) {\n    launches(limit: 10, offset: $offset) {\n      nodes {\n        id\n        ...LaunchFields\n      }\n      ...TotalCountFields\n    }\n  }\n',
): (typeof documents)['\n  query Launches_SSR($offset: Int) {\n    launches(limit: 10, offset: $offset) {\n      nodes {\n        id\n        ...LaunchFields\n      }\n      ...TotalCountFields\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Launches_RSC($offset: Int) {\n    launches(limit: 10, offset: $offset) {\n      nodes {\n        id\n        ...LaunchFields\n      }\n      ...TotalCountFields\n    }\n  }\n',
): (typeof documents)['\n  query Launches_RSC($offset: Int) {\n    launches(limit: 10, offset: $offset) {\n      nodes {\n        id\n        ...LaunchFields\n      }\n      ...TotalCountFields\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query LaunchDetails($id: ID!) {\n    node(id: $id) {\n      ... on Launch {\n        id\n        name\n        details\n        launchDate\n        image\n        site {\n          ...LaunchSiteFields\n        }\n        rocket {\n          cost\n          country\n          company\n          description\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query LaunchDetails($id: ID!) {\n    node(id: $id) {\n      ... on Launch {\n        id\n        name\n        details\n        launchDate\n        image\n        site {\n          ...LaunchSiteFields\n        }\n        rocket {\n          cost\n          country\n          company\n          description\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment LaunchFields on Launch {\n    id\n    name\n    launchDate\n    image\n  }\n',
): (typeof documents)['\n  fragment LaunchFields on Launch {\n    id\n    name\n    launchDate\n    image\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment LaunchSiteFields on Site {\n    id\n    name\n    details\n    status\n    location {\n      ...SiteLocationFields\n    }\n  }\n',
): (typeof documents)['\n  fragment LaunchSiteFields on Site {\n    id\n    name\n    details\n    status\n    location {\n      ...SiteLocationFields\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment SiteLocationFields on Location {\n    latitude\n    longitude\n    name\n    region\n  }\n',
): (typeof documents)['\n  fragment SiteLocationFields on Location {\n    latitude\n    longitude\n    name\n    region\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TotalCountFields on QueryLaunchesList {\n    totalCount\n  }\n',
): (typeof documents)['\n  fragment TotalCountFields on QueryLaunchesList {\n    totalCount\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PageLaunches($offset: Int) {\n    launches(limit: 10, offset: $offset) {\n      nodes {\n        id\n        name\n      }\n      totalCount\n    }\n  }\n',
): (typeof documents)['\n  query PageLaunches($offset: Int) {\n    launches(limit: 10, offset: $offset) {\n      nodes {\n        id\n        name\n      }\n      totalCount\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
