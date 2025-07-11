import { boolean, timestamp, integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const blogPosts = pgTable("blogposts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    poster: varchar({ length: 255 }).notNull(),
    pfpColor: varchar({ length: 255 }).notNull().default("0"),
    post: text().notNull(),
    datePosted: timestamp('timestamp2').notNull().defaultNow(),
    updated: boolean().default(false)
});

export const blogComments = pgTable("comments", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    blogId: integer().references(() => blogPosts.id),
    title: varchar({ length: 255 }).notNull(),
    commenter: varchar({ length: 255 }).notNull(),
    pfpColor: varchar({ length: 255 }).notNull().default("0"),
    comment: text().notNull(),
    datePosted: timestamp('timestamp2').notNull().defaultNow(),
    updated: boolean().default(false)
});