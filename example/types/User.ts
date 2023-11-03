import { builder } from '../../dist/index.mjs'

interface UserType {
  id: string;
  name: string
}
const User = builder.objectRef<UserType>('User');

const UserNode = builder.node(User, {
  id: {
    resolve: (user) => user.id,
  },
  isTypeOf: (item) => {
    return item && (item as any).name;
  },
  fields: (t) => ({
    name: t.exposeString('name'),
  }),
  loadMany(ids) {
    return ids.map(id => users.find(x => x.id === id));
  },
  brandLoadedObjects: true,
});

const users = [
  { id: "0", name: 'Jovi' },
  { id: "1", name: 'Max' },
  { id: "2", name: 'Thomas' }
]

builder.queryField('users', (t) => t.connection({
  type: UserNode,
  resolve: async () => {
    return {
      edges: users.map(x => ({
        cursor: x.id,
        node: x
      })),
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: '0',
        endCursor: "" + (users.length - 1),
      }
    }
  }
}))

builder.queryField('user', (t) => t.field({
  nullable: true,
  type: UserNode,
  args: { id: t.arg.id() },
  resolve: async (_, args) => {
    return users.find(x => x.id === args.id);
  }
}))

builder.mutationField('updateUser', t => t.field({
  type: UserNode,
  args: {
    name: t.arg.string({ required: true })
  },
  resolve: (_, args) => {
    const user = { id: users.length + '', name: args.name }
    users.push(user)
    return user
  }
}))
