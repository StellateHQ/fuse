/* eslint-disable */
// This is a generated file!

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Launch = Node & {
  __typename: 'Launch';
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  launchDate: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rocket: Rocket;
  site: Site;
};

export type LaunchFilter = {
  rocketId?: InputMaybe<Scalars['String']['input']>;
  siteId?: InputMaybe<Scalars['String']['input']>;
};

export type Location = {
  __typename: 'Location';
  coordinates?: Maybe<Array<Scalars['Float']['output']>>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename: 'Mutation';
  _version: Scalars['String']['output'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename: 'Query';
  _version: Scalars['String']['output'];
  launch?: Maybe<Launch>;
  launches: QueryLaunchesList;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  rocket?: Maybe<Rocket>;
  site?: Maybe<Site>;
  user?: Maybe<User>;
};


export type QueryLaunchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLaunchesArgs = {
  filter?: InputMaybe<LaunchFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryRocketArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySiteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type QueryLaunchesList = {
  __typename: 'QueryLaunchesList';
  nodes: Array<Maybe<Launch>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Rocket = Node & {
  __typename: 'Rocket';
  company?: Maybe<Scalars['String']['output']>;
  cost?: Maybe<Scalars['Int']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type Site = Node & {
  __typename: 'Site';
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<SiteStatus>;
};

export type SiteStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'UNKNOWN';

export type User = Node & {
  __typename: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Launches_SsrQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Launches_SsrQuery = { __typename: 'Query', launches: (
    { __typename: 'QueryLaunchesList', nodes: Array<(
      { __typename: 'Launch', id: string }
      & { ' $fragmentRefs'?: { 'LaunchFieldsFragment': LaunchFieldsFragment } }
    ) | null> }
    & { ' $fragmentRefs'?: { 'TotalCountFieldsFragment': TotalCountFieldsFragment } }
  ) };

export type Launches_RscQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Launches_RscQuery = { __typename: 'Query', launches: (
    { __typename: 'QueryLaunchesList', nodes: Array<(
      { __typename: 'Launch', id: string }
      & { ' $fragmentRefs'?: { 'LaunchFieldsFragment': LaunchFieldsFragment } }
    ) | null> }
    & { ' $fragmentRefs'?: { 'TotalCountFieldsFragment': TotalCountFieldsFragment } }
  ) };

export type LaunchDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LaunchDetailsQuery = { __typename: 'Query', node?: { __typename: 'Launch', id: string, name: string, details?: string | null, launchDate: string, image: string, site: (
      { __typename: 'Site' }
      & { ' $fragmentRefs'?: { 'LaunchSiteFieldsFragment': LaunchSiteFieldsFragment } }
    ), rocket: { __typename: 'Rocket', cost?: number | null, country?: string | null, company?: string | null, description?: string | null } } | { __typename: 'Rocket' } | { __typename: 'Site' } | { __typename: 'User' } | null };

export type LaunchFieldsFragment = { __typename: 'Launch', id: string, name: string, launchDate: string, image: string } & { ' $fragmentName'?: 'LaunchFieldsFragment' };

export type LaunchSiteFieldsFragment = { __typename: 'Site', id: string, name?: string | null, details?: string | null, status?: SiteStatus | null, location?: (
    { __typename: 'Location' }
    & { ' $fragmentRefs'?: { 'SiteLocationFieldsFragment': SiteLocationFieldsFragment } }
  ) | null } & { ' $fragmentName'?: 'LaunchSiteFieldsFragment' };

export type SiteLocationFieldsFragment = { __typename: 'Location', latitude?: number | null, longitude?: number | null, name?: string | null, region?: string | null } & { ' $fragmentName'?: 'SiteLocationFieldsFragment' };

export type TotalCountFieldsFragment = { __typename: 'QueryLaunchesList', totalCount?: number | null } & { ' $fragmentName'?: 'TotalCountFieldsFragment' };

export type PageLaunchesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PageLaunchesQuery = { __typename: 'Query', launches: { __typename: 'QueryLaunchesList', totalCount?: number | null, nodes: Array<{ __typename: 'Launch', id: string, name: string } | null> } };

export const LaunchFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaunchFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Launch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"launchDate"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]} as unknown as DocumentNode<LaunchFieldsFragment, unknown>;
export const SiteLocationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SiteLocationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}}]}}]} as unknown as DocumentNode<SiteLocationFieldsFragment, unknown>;
export const LaunchSiteFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaunchSiteFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Site"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SiteLocationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SiteLocationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}}]}}]} as unknown as DocumentNode<LaunchSiteFieldsFragment, unknown>;
export const TotalCountFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TotalCountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryLaunchesList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]} as unknown as DocumentNode<TotalCountFieldsFragment, unknown>;
export const Launches_SsrDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Launches_SSR"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"launches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LaunchFields"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TotalCountFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaunchFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Launch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"launchDate"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TotalCountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryLaunchesList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]} as unknown as DocumentNode<Launches_SsrQuery, Launches_SsrQueryVariables>;
export const Launches_RscDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Launches_RSC"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"launches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LaunchFields"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TotalCountFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaunchFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Launch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"launchDate"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TotalCountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryLaunchesList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]} as unknown as DocumentNode<Launches_RscQuery, Launches_RscQueryVariables>;
export const LaunchDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LaunchDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Launch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"launchDate"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LaunchSiteFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rocket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SiteLocationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"region"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaunchSiteFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Site"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SiteLocationFields"}}]}}]}}]} as unknown as DocumentNode<LaunchDetailsQuery, LaunchDetailsQueryVariables>;
export const PageLaunchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PageLaunches"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"launches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<PageLaunchesQuery, PageLaunchesQueryVariables>;