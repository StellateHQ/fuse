import { node } from 'fuse'

type UserSource = {
  id: string
  name: string
  avatarUrl: string
}

// "Nodes" are the core abstraction of Fuse.js. Each node represents
// a resource/entity with multiple fields and has to define two things:
// 1. load(): How to fetch from the underlying data source
// 2. fields: What fields should be exposed and added for clients
export const UserNode = node<UserSource>({
  name: 'User',
  load: async (ids) => getUsers(ids),
  fields: (t) => ({
    name: t.exposeString('name'),
    avatarUrl: t.exposeString('avatarUrl'),
    firstName: t.string({
      resolve: (user) => user.name.split(' ')[0],
    }),
  }),
})

// Fake function to fetch users. In real applications, this would
// talk to an underlying REST API/gRPC service/third-party API/…
async function getUsers(ids: string[]): Promise<UserSource[]> {
  return ids.map((id) => ({
    id,
    name: `Peter #${id}`,
    avatarUrl: `https://i.pravatar.cc/300?u=${id}`,
  }))
}
