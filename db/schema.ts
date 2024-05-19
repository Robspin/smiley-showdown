import { pgTable, varchar, integer, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    elo: integer('elo').default(1000),
    credits: integer('credits').default(0),
    dailyCredits: integer('daily_credits').default(3),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})
