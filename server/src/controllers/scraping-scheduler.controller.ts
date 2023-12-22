import { RequestHandler, Router } from "express";
import { IController } from "./controller.interface";
import { authMiddleware } from "../middlewares/authentication.middleware";
import { Logger } from "../common/logger/logger";
import { GoogleScrapingScheduler } from "../services/google-scraping-scheduler.service";

export class ScrapingSchedulerController implements IController {
  createRouter = () => {
    const router = Router();

    router.post("/restart", authMiddleware, this.restartScrapingScheduler);
    return router;
  };

  restartScrapingScheduler: RequestHandler = async (_req, res) => {
    try {
      if (GoogleScrapingScheduler.isRunning)
        res
          .status(202)
          .send({ message: "The scheduler has already been running." });
      else {
        GoogleScrapingScheduler.startScheduling();
        res.status(202).send({ message: "The scheduler has started." });
      }
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };
}
