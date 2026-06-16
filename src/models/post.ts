import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { Profile } from "./profile";

export const Post = pgTable("post", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    image: text("image").notNull(),
    profileId: integer("profile_id").notNull().references(() => Profile.id),
    isPublished: text("is_published").default("published").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
