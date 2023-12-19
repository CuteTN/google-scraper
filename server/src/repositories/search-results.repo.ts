import { db } from "../models/dp.pool";
import { eq } from "drizzle-orm";
import {
  SearchResultInsert,
  searchResultSelect,
  searchResultsTable,
} from "../models/search-results.model";

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
}
