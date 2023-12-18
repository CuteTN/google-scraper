import { integer, pgTable, smallint, varchar } from "drizzle-orm/pg-core";

export const searchResultsModel = pgTable("app_search_result", {
  id: varchar("id", { length: 45 }).notNull().primaryKey(),
  keyword: varchar("keyword", { length: 200 }).notNull(),
  adwordsCount: smallint("adwords_count"),
  linksCount: smallint("links_count"),
  resultsCount: integer("results_count"),
  html: varchar("html"),
});