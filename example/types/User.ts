import { InferResolvers, g } from 'garph'
import { NodeInterface } from './Node'

const UserNode = g.node('User', {
  id: g.id(),
  name: g.string(),
}).implements(NodeInterface)

const UserEdge = g.edge('UserEdge', g.ref(UserNode))
const UserConnection = g.connection('UserConnection', g.ref(UserEdge))

const queryType = g.type('Query', {
  user: g.ref(UserNode).optional().args({ id: g.string() }).description("Return a given user for a given id"),
  users: g.ref(UserConnection).args({ ...g.pageInfoArgs }).description("Return a list of users"),
})

const users = [
  { id: "0", name: 'Jovi' },
  { id: "1", name: 'Max' },
  { id: "2", name: 'Thomas' }
]

export const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    user: (_, args) => {
      const user = users.find(x => x.id === args.id);

      return user;
    },
    users: (_, args) => {
      return {
        edges: users.map(x => ({
          cursor: x.id,
          node: x
        })),
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '1',
          endCursor: '1',
        }
      }
    }
  }
}
