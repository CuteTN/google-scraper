import { RequestHandler, Router } from "express";
import { IController } from "./controller.interface";
import { GoogleScraper } from "../services/google-scraper.service";
import { Logger } from "../common/logger/logger";
import { authMiddleware } from "../middlewares/authentication.middleware";
import { SearchResultsRepository } from "../repositories/search-results.repo";
import { searchResultSelect } from "../models/search-results.model";

export class SearchResultsController implements IController {
  createRouter = () => {
    const router = Router();

    router.post("/scrape-single", authMiddleware, this.scrapeSingle);
    router.post("/search", authMiddleware, this.search);
    return router;
  };

  scrapeSingle: RequestHandler = async (req, res) => {
    let { keyword } = req.body as { keyword: string };
    keyword = keyword?.trim();
    if (!keyword) {
      return res.status(400).send({ message: "keyword is required." });
    }

    const existingSearchResult = await SearchResultsRepository.findByKeyword(
      keyword
    );
    if (existingSearchResult) {
      return res.status(200).send(existingSearchResult);
    }

    try {
      const html = await GoogleScraper.retrieveGoogleSearchHtml(keyword);
      const newSearchResult = GoogleScraper.extractDataFromHtml(keyword, html);
      await SearchResultsRepository.create(newSearchResult);

      return res.status(200).send(newSearchResult);
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };

  search: RequestHandler = async (req, res) => {
    let { text, page, limit } = req.body as {
      text?: string;
      page?: number;
      limit?: number;
    };

    text ??= "";
    page ??= 0;
    limit ??= 10;
    const offset = page * limit;

    try {
      const total = await SearchResultsRepository.countTotalKeywords(text);
      let searchResults: searchResultSelect[];
      if (offset >= total) searchResults = [];
      else
        searchResults = await SearchResultsRepository.search(text, page, limit);

      return res.status(200).send({ data: searchResults, total, page, limit });
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };
}
