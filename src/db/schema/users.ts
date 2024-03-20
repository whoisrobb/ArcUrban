import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { listings } from "./listings";

export const users = pgTable('user', {
    id: varchar('id').notNull(),
    firstName: varchar('firstName'),
    lastName: varchar('lastName'),
    username: varchar('username'),
    bio: text('bio').notNull().default(''),
    email: varchar('email').notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
    listings: many(listings)
}))