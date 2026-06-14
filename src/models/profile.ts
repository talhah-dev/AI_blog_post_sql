import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";

export const Profile = pgTable("profile", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    image: text("image"),
    bio: text("bio"),
    role: text("role").default("user"),
    isPublic: boolean("is_Public").default(true),
})