import { eq, ilike, sql } from "drizzle-orm";
import { db } from "../models/dp.pool";
import {
  SearchResultInsert,
  searchResultSelect,
  searchResultsTable,
} from "../models/search-results.model";
import { usersTable } from "../models/users.model";

export class SearchResultsRepository {
  static async create(searchResult: SearchResultInsert) {
    return (await db.insert(searchResultsTable).values(searchResult))?.[0];
  }

  static async findById(id: string): Promise<searchResultSelect | undefined> {
    return (
      await db
        .select()
        .from(searchResultsTable)
        .where(eq(searchResultsTable.id, id))
    )[0];
  }

  static async findByKeyword(
    keyword: string
  ): Promise<searchResultSelect | undefined> {
    return (
      await db
        .select()
        .from(searchResultsTable)
        .where(eq(searchResultsTable.keyword, keyword))
    )[0];
  }

  static async getAllKeywords(): Promise<{ keyword: string }[]> {
    return await db
      .select({ keyword: searchResultsTable.keyword })
      .from(searchResultsTable);
  }

  static async countTotalKeywords(searchText: string) {
    return (
      await db
        .select({
          total: sql<number>`cast(count(${usersTable.id}) as int)`,
        })
        .from(searchResultsTable)
        .where(ilike(searchResultsTable.keyword, `%${searchText}%`))
    )[0].total;
  }

  static async search(searchText: string, offset: number, limit: number) {
    return await db
      .select({
        id: searchResultsTable.id,
        keyword: searchResultsTable.keyword,
        adwordsCount: searchResultsTable.adwordsCount,
        linksCount: searchResultsTable.linksCount,
        resultsCount: searchResultsTable.resultsCount,
        pending: searchResultsTable.pending,
      })
      .from(searchResultsTable)
      .where(ilike(searchResultsTable.keyword, `%${searchText}%`))
      .orderBy(searchResultsTable.keyword)
      .offset(offset)
      .limit(limit);
  }

  static async insertSearchResults(searchResults: SearchResultInsert[]) {
    return await db.insert(searchResultsTable).values(searchResults);
  }

  static async getAllPendingSearchResults() {
    return await db
      .select()
      .from(searchResultsTable)
      .where(eq(searchResultsTable.pending, true));
  }

  static async updateSearchResultById(searchResult: SearchResultInsert) {
    return await db
      .update(searchResultsTable)
      .set(searchResult)
      .where(eq(searchResultsTable.id, searchResult.id));
  }
}
