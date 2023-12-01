import { node, addQueryFields } from 'fuse'

type UserResource = {
  id: string
  name: string
  avatarUrl: string
}

// "Nodes" are the core abstraction of Fuse.js. Each node represents
// a resource/entity with multiple fields and has to define two things:
// 1. load(): How to fetch multiple of itself based on a list of keys
// 2. fields: What fields the exposed object type should have
export const UserNode = node<UserResource>({
  name: 'User',
  load: async (ids) => {
    return getUsers(ids)
  },
  fields: (t) => ({
    name: t.exposeString('name'),
    avatarUrl: t.exposeString('avatarUrl'),
  }),
})

// Adding a query that allows one to fetch a user by ID
addQueryFields((t) => ({
  user: t.field({
    type: UserNode,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (_, args) => args.id as string,
  }),
}))

// Fake function to fetch users. In real applications, this would
// talk to an underlying REST API/gRPC service/third-party API/…
async function getUsers(ids: string[]): Promise<UserResource[]> {
  return ids.map((id) => ({
    id,
    name: `Peter #${id}`,
    avatarUrl: `https://i.pravatar.cc/300?u=${id}`,
  }))
}
