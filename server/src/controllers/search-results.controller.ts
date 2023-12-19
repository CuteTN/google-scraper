import { RequestHandler, Router } from "express";
import { IController } from "./controller.interface";
import { GoogleScraper } from "../services/google-scraper.service";
import { Logger } from "../common/logger/logger";
import { authMiddleware } from "../middlewares/authentication.middleware";
import { SearchResultsRepository } from "../repositories/search-results.repo";

export class SearchResultsController implements IController {
  createRouter = () => {
    const router = Router();

    router.post("/scrape-single", authMiddleware, this.scrapeSingle);
    return router;
  };

  scrapeSingle: RequestHandler = async (req, res) => {
    let { keyword } = req.body as { keyword: string };
    keyword = keyword?.trim();
    if (!keyword) {
      return res.status(400).send({ message: "keyword is required." });
    }

    const existingSearchResult = await SearchResultsRepository.findByKeyword(keyword);
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
}
