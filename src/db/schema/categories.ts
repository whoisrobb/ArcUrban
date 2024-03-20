import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createId } from "../utils";
import { relations } from "drizzle-orm";
import { listings } from "./listings";
import { subcategories } from "./subcategories";

export const categories = pgTable('category', {
    id: varchar('id').$defaultFn(() => createId()).primaryKey(),
    title: text('title').notNull()
})

export const categoriesRelations = relations(categories, ({ many }) => ({
    listings: many(listings),
    subcategories: many(subcategories)
}))