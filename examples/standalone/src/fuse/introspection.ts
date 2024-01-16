/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * You may import it to create a `graphql()` tag function with `gql.tada`
 * by importing it and passing it to `initGraphQLTada<>()`.
 *
 * @example
 * ```
 * import { initGraphQLTada } from 'gql.tada';
 * import type { introspection } from './introspection';
 *
 * export const graphql = initGraphQLTada<{
 *   introspection: typeof introspection;
 *   scalars: {
 *     DateTime: string;
 *     Json: any;
 *   };
 * }>();
 * ```
 */
const introspection = {
  __schema: {
    queryType: {
      name: 'Query',
    },
    mutationType: {
      name: 'Mutation',
    },
    subscriptionType: null,
    types: [
      {
        kind: 'SCALAR',
        name: 'Date',
      },
      {
        kind: 'SCALAR',
        name: 'JSON',
      },
      {
        kind: 'OBJECT',
        name: 'Launch',
        fields: [
          {
            name: 'details',
            type: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'ID',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'image',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'launchDate',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'rocket',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Rocket',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'site',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Site',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [
          {
            kind: 'INTERFACE',
            name: 'Node',
          },
        ],
      },
      {
        kind: 'SCALAR',
        name: 'String',
      },
      {
        kind: 'SCALAR',
        name: 'ID',
      },
      {
        kind: 'OBJECT',
        name: 'Location',
        fields: [
          {
            name: 'coordinates',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'NON_NULL',
                ofType: {
                  kind: 'SCALAR',
                  name: 'Float',
                  ofType: null,
                },
              },
            },
            args: [],
          },
          {
            name: 'latitude',
            type: {
              kind: 'SCALAR',
              name: 'Float',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'longitude',
            type: {
              kind: 'SCALAR',
              name: 'Float',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'name',
            type: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'region',
            type: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'SCALAR',
        name: 'Float',
      },
      {
        kind: 'OBJECT',
        name: 'Mutation',
        fields: [
          {
            name: '_version',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'sayHello',
            type: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null,
            },
            args: [
              {
                name: 'name',
                type: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'INTERFACE',
        name: 'Node',
        fields: [
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'ID',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'Launch',
          },
          {
            kind: 'OBJECT',
            name: 'Rocket',
          },
          {
            kind: 'OBJECT',
            name: 'Site',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'Query',
        fields: [
          {
            name: '_version',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'String',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'launch',
            type: {
              kind: 'OBJECT',
              name: 'Launch',
              ofType: null,
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'ID',
                    ofType: null,
                  },
                },
              },
            ],
          },
          {
            name: 'launches',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'QueryLaunchesList',
                ofType: null,
              },
            },
            args: [
              {
                name: 'limit',
                type: {
                  kind: 'SCALAR',
                  name: 'Int',
                  ofType: null,
                },
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Int',
                  ofType: null,
                },
              },
            ],
          },
          {
            name: 'node',
            type: {
              kind: 'INTERFACE',
              name: 'Node',
              ofType: null,
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'ID',
                    ofType: null,
                  },
                },
              },
            ],
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'INTERFACE',
                  name: 'Node',
                  ofType: null,
                },
              },
            },
            args: [
              {
                name: 'ids',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'LIST',
                    ofType: {
                      kind: 'NON_NULL',
                      ofType: {
                        kind: 'SCALAR',
                        name: 'ID',
                        ofType: null,
                      },
                    },
                  },
                },
              },
            ],
          },
          {
            name: 'rocket',
            type: {
              kind: 'OBJECT',
              name: 'Rocket',
              ofType: null,
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'ID',
                    ofType: null,
                  },
                },
              },
            ],
          },
          {
            name: 'site',
            type: {
              kind: 'OBJECT',
              name: 'Site',
              ofType: null,
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'ID',
                    ofType: null,
                  },
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'SCALAR',
        name: 'Int',
      },
      {
        kind: 'OBJECT',
        name: 'QueryLaunchesList',
        fields: [
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Launch',
                  ofType: null,
                },
              },
            },
            args: [],
          },
          {
            name: 'totalCount',
            type: {
              kind: 'SCALAR',
              name: 'Int',
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Rocket',
        fields: [
          {
            name: 'company',
            type: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'cost',
            type: {
              kind: 'SCALAR',
              name: 'Int',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'country',
            type: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'description',
            type: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'ID',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [
          {
            kind: 'INTERFACE',
            name: 'Node',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'Site',
        fields: [
          {
            name: 'details',
            type: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'ID',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'location',
            type: {
              kind: 'OBJECT',
              name: 'Location',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'name',
            type: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'status',
            type: {
              kind: 'ENUM',
              name: 'SiteStatus',
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [
          {
            kind: 'INTERFACE',
            name: 'Node',
          },
        ],
      },
      {
        kind: 'ENUM',
        name: 'SiteStatus',
        enumValues: [
          {
            name: 'ACTIVE',
          },
          {
            name: 'INACTIVE',
          },
          {
            name: 'UNKNOWN',
          },
        ],
      },
      {
        kind: 'SCALAR',
        name: 'Boolean',
      },
      {
        kind: 'SCALAR',
        name: 'Any',
      },
    ],
    directives: [],
  },
} as const

export { introspection }
