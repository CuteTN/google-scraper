import { Request } from "express";

export type PaginationOptions = {
  page?: number;
  limit?: number;
};

type PaginatedData<Item> = {
  data: Item[];
  page: number;
  limit: number;
  total: number;
};

export class PaginationHelper {
  static getPaginationOptionFromRequest(
    req: Request
  ): PaginationOptions | undefined {
    let { page, limit } = (req.query ?? {}) as { page?: string, limit?: string };
    if (!page || !limit) return undefined;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    return { page: pageNum, limit: limitNum };
  }

  static paginate<Item>(
    data: Item[],
    options?: PaginationOptions
  ): PaginatedData<Item> {
    let { page, limit } = options ?? {};
    
    // NOTE: If pagination options is not provided, just return the whole array
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = data.length;
    }

    return {
      data: data.slice(page * limit, (page + 1) * limit),
      limit,
      page,
      total: data.length,
    };
  }
}
