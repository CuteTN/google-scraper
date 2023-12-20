import { db } from "../models/dp.pool";
import { eq, ilike, or, sql } from "drizzle-orm";
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
      .select()
      .from(searchResultsTable)
      .where(ilike(searchResultsTable.keyword, `%${searchText}%`))
      .orderBy(searchResultsTable.keyword)
      .offset(offset)
      .limit(limit);
  }
}
