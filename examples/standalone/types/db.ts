import { drizzle } from 'drizzle-orm/postgres-js'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 256 }),
})

export const db = drizzle({})
