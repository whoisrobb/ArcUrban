import { index, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createId } from "../utils";
import { relations } from "drizzle-orm";
import { categories } from "./categories";

export const subcategories = pgTable('subcategory', {
    id: varchar('id').$defaultFn(() => createId()).primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    categoryId: varchar("categoryId", { length: 30 })
        .references(() => categories.id, { onDelete: "cascade" })
        .notNull(),
    },
    //     (table) => ({
    //     subcategoriesCategoryIdIdx: index(
    //         'ArcUrban_subcategories_category_id_idx'
    //     ).on(table.categoryId),
    // })
)

export const subcategoriesRelations = relations(subcategories, ({ one }) => ({
    category: one(categories, {
        fields: [subcategories.categoryId],
        references: [categories.id]
    })
}))

export type Subcategory = typeof subcategories.$inferSelect;
export type NewSubcategory = typeof subcategories.$inferInsert;