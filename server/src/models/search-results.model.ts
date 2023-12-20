import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { bigint, boolean, pgTable, smallint, varchar } from "drizzle-orm/pg-core";

export const searchResultsTable = pgTable("app_search_result", {
  id: varchar("id", { length: 45 }).notNull().primaryKey(),
  keyword: varchar("keyword", { length: 200 }).notNull(),
  adwordsCount: smallint("adwords_count"),
  linksCount: smallint("links_count"),
  resultsCount: bigint("results_count", { mode: "number" }),
  html: varchar("html"),
  pending: boolean("pending").notNull().default(true),
});

export type SearchResultInsert = InferInsertModel<typeof searchResultsTable>;
export type searchResultSelect = InferSelectModel<typeof searchResultsTable>;
