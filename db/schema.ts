import { pgTable, varchar, integer, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    elo: integer('elo').default(1000),
    credits: integer('credits').default(0),
    dailyCredits: integer('daily_credits').default(3),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const decks = pgTable('decks', {
    id: uuid('id').primaryKey(),
    userId: uuid('userId').notNull().references(() => users.id),
    deckElo: integer('elo').default(1000),
    smileyKeys: varchar('smiley_keys', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})
