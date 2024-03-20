import { boolean, decimal, integer, json, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "../utils";
import { relations, sql } from "drizzle-orm";
import { categories } from "./categories";
import { subcategories } from "./subcategories";
import { users } from "./users";

export const furnishingEnum = pgEnum('furnishingStatus', ['furnished', 'unfurnished', 'partly'])

export const listings = pgTable('listing', {
    id: varchar('id').$defaultFn(createId).primaryKey(),
    listingName: text('listingName').notNull(),
    city: text('city').notNull(),
    neighbourhood: text('neighbourhood'),
    latitude: text('latitude').notNull(),
    longitude: text('longitude').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).default('0').notNull(),
    payFrequency: text('payFrequency').notNull(),
    hostId: varchar('hostId').notNull(),
    categoryId: varchar('categoryId').notNull(),
    subcategoryId: varchar('subcategoryId').references(
        () => subcategories.id,
        { onDelete: "cascade" }
    ),
    floorArea: decimal('floorArea', { precision: 10, scale: 2 }).default('0').notNull(),
    furnishingStatus: furnishingEnum('furnishingStatus').notNull(),
    bedrooms: integer('bedrooms').default(1).notNull(),
    baths: decimal('baths').default('1').notNull(),
    livingrooms: integer('livingrooms').default(1).notNull(),
    ammenities: json('ammenities').$type<string | null>().default(null),
    imageUrls: json('imageUrls').$type<string>().notNull(),
    year: integer('year').notNull(),
    available: boolean('available').default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
})

export const listingsRelations = relations(listings, ({ one }) => ({
    category: one(categories, {
        fields: [listings.categoryId],
        references: [categories.id]
    }),
    subcategory: one(subcategories, {
        fields: [listings.subcategoryId],
        references: [subcategories.id]
    }),
    host: one(users, {
        fields: [listings.hostId],
        references: [users.id]
    })
}))