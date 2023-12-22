import { RequestHandler, Router } from "express";
import multer from "multer";
import { IController } from "./controller.interface";
import { GoogleScraper } from "../services/google-scraper.service";
import { Logger } from "../common/logger/logger";
import { authMiddleware } from "../middlewares/authentication.middleware";
import { SearchResultsRepository } from "../repositories/search-results.repo";
import {
  SearchResultInsert,
  searchResultSelect,
} from "../models/search-results.model";
import { parseCSVString } from "../common/utils/csv.utils";
import { validateKeyword } from "../common/utils/validate-keyword.utils";
import { randomUUID } from "crypto";
import { GoogleScrapingScheduler } from "../services/google-scraping-scheduler.service";

export class SearchResultsController implements IController {
  createRouter = () => {
    const router = Router();
    const upload = multer();

    router.post("/scrape-single", authMiddleware, this.scrapeSingle);
    router.post("/search", authMiddleware, this.search);
    router.get("/html/:searchResultId", authMiddleware, this.getHtml);
    router.get("/all-keywords", authMiddleware, this.getAllKeywords);
    router.get("/info/:keyword", authMiddleware, this.getInfoOfKeyword);
    router.post(
      "/upload-csv",
      authMiddleware,
      upload.single("file"),
      this.uploadCsvOfKeywords
    );
    return router;
  };

  scrapeSingle: RequestHandler = async (req, res) => {
    let { keyword } = req.body as { keyword: string };
    keyword = keyword?.trim();
    if (!keyword) {
      return res.status(400).send({ message: "keyword is required." });
    }
    if (keyword.length > 200) {
      return res
        .status(400)
        .send({ message: "The length of keyword could not exceed 200." });
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
      let searchResults: Omit<searchResultSelect, "html">[];
      if (offset >= total) searchResults = [];
      else
        searchResults = await SearchResultsRepository.search(
          text,
          offset,
          limit
        );

      return res.status(200).send({ data: searchResults, total, page, limit });
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };

  getHtml: RequestHandler = async (req, res) => {
    const { searchResultId } = req.params;
    if (!searchResultId) {
      return res.status(400).send({ message: "ID is required." });
    }

    try {
      const searchResult = await SearchResultsRepository.findById(
        searchResultId
      );
      if (!searchResult) {
        return res.status(404).send({
          message: "The search result with specified ID is not found.",
        });
      }

      return res.status(200).send({
        id: searchResult.id,
        keyword: searchResult.keyword,
        pending: searchResult.pending,
        html: searchResult.html,
      });
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };

  getAllKeywords: RequestHandler = async (_req, res) => {
    try {
      const keywords = await SearchResultsRepository.getAllKeywords();
      return res.status(200).send({
        keywords: keywords.map((row) => row.keyword),
      });
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };

  getInfoOfKeyword: RequestHandler = async (req, res) => {
    const { keyword } = req.params;
    if (!keyword) {
      return res.status(400).send({ message: "keyword is required." });
    }

    try {
      const searchResult = await SearchResultsRepository.findByKeyword(keyword);
      return res.status(200).send(searchResult);
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };

  uploadCsvOfKeywords: RequestHandler = async (req, res) => {
    try {
      const csvFile = req.file;
      if (!csvFile) {
        return res.status(400).send({ message: "A CSV file is required." });
      }
      const rawContent = csvFile?.buffer?.toString();
      if (rawContent === "") {
        return res.status(400).send({ message: "The provided CSV is empty." });
      }

      const keywords = await parseCSVString(rawContent);
      const validKeywords = [] as string[];
      for (let keyword of keywords) {
        keyword = keyword.trim();

        if (!validateKeyword(keyword)) continue;
        const existingSearchResult =
          await SearchResultsRepository.findByKeyword(keyword);
        if (existingSearchResult) continue;

        validKeywords.push(keyword);
      }

      const pendingSearchResults = validKeywords.map<searchResultSelect>(
        (keyword) => ({
          id: randomUUID(),
          keyword,
          pending: true,
          adwordsCount: null,
          linksCount: null,
          resultsCount: null,
          html: null,
        })
      );
      if (pendingSearchResults.length)
        await SearchResultsRepository.insertSearchResults(pendingSearchResults);

      GoogleScrapingScheduler.addPendingSearchResults(pendingSearchResults);
      return res.sendStatus(202);
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };
}
