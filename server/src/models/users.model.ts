import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("app_user", {
  id: varchar("id", { length: 45 }).notNull().primaryKey(),
  username: varchar("username", { length: 100 }).notNull(),
  hashedPassword: varchar("hashed_password").notNull(),
});

export type UserInsert = InferInsertModel<typeof usersTable>;
export type UserSelect = InferSelectModel<typeof usersTable>;