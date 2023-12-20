export type TypeSearchResult = {
  id: string;
  keyword: string;
  adwordsCount?: number;
  linksCount?: number;
  resultsCount?: number;
  html?: string;
  pending: boolean;
};