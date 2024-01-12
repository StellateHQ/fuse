import { node, NotFoundError, addQueryFields } from 'fuse'
import { inArray, sql } from 'drizzle-orm'
import { db, users } from './db'

export const UserNode = node<typeof users.$inferInsert>({
  name: 'User',
  async load(ids) {
    const result = await db.select().from(users).where(inArray(users.id, ids))
    return ids.map(
      (id) =>
        result.find((x) => x.id === id)! ||
        new NotFoundError('Could not find user.'),
    )
  },
  fields: (t) => ({
    // we tell our node that it can find the name on a different property named mission_name and to
    // expose it as a string.
    name: t.exposeString('name'),
  }),
})

addQueryFields((t) => ({
  users: t.list({
    type: UserNode,
    nullable: false,
    args: {
      offset: t.arg.int(),
      limit: t.arg.int(),
    },
    resolve: async (_, args) => {
      const offset = args.offset || 0
      const limit = args.limit || 10
      const [totalCount, paginatedUsers] = await Promise.all([
        db
          .select({
            count: sql<number>`cast(count() as int)`,
          })
          .from(users),
        db.select().from(users).limit(limit).offset(offset),
      ])

      return {
        nodes: paginatedUsers,
        totalCount: totalCount[0].count,
      }
    },
  }),
}))
