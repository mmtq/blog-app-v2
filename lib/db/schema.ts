import { relations } from 'drizzle-orm'
import {boolean, pgTable, serial, text, timestamp, varchar} from 'drizzle-orm/pg-core'
import { on } from 'events'
import { title } from 'process'

export const users = pgTable('user',{
    id : varchar('id', {length:255}).primaryKey(),
    name : varchar('name', {length:255}).notNull(),
    email : varchar('email', {length:255}).notNull().unique(),
    emailVerified : boolean('email_verified').default(false),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull()
})

export const sessions = pgTable('session',{
    id : varchar('id', {length:255}).primaryKey(),
    userId : varchar('user_id', {length:255})
            .references(()=>users.id)
            .notNull(),
    token : varchar('token',{length:255}),
    expiresAt : timestamp('expires_at').notNull(),
    ipAddress : varchar('ip_address', {length:255}),
    userAgent : text('user_agent'),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull()
})

export const accounts = pgTable('account', {
    id : varchar('id', {length:255}).primaryKey(),
    userId : varchar('user_id', {length:255})
            .references(()=>users.id)
            .notNull(),
    accountId: varchar('account_id', {length:255}).notNull(),
    providerId: varchar('provider_id', {length:255}).notNull(),
    password: text('password'),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull()
})

export const posts = pgTable('post', {
    id : serial('id').primaryKey(),
    title: varchar('title', {length:255}).notNull(),
    description : varchar('description', {length:255}),
    content: text('content').notNull(),
    slug : varchar('slug', {length:255}).notNull().unique(),
    authorId : varchar('author_id', {length:255})
            .references(()=>users.id)
            .notNull(),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull()
})

export const userRelations = relations(users, ({ many }) => ({
    sessions: many(sessions),
    accounts: many(sessions),
    posts: many(posts)
}) )

export const sessionRelations = relations(sessions, ({one})=>({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id]
    })
}))

export const accoutRelations = relations(accounts, ({one})=>({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id]
    })
}))

export const postRelations = relations(posts, ({one})=>({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id]
    })
}))

export const schema = {
    users,
    accounts,
    sessions,
    posts
}