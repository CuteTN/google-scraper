import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Logger } from "./src/common/logger/logger";
import { infoMiddleware } from "./src/middlewares/info.middleware";
import { UsersController } from "./src/controllers/users.controller";
import { EnvProvider } from "./src/common/env-provider/env-provider";

const app: Express = express();
const port = EnvProvider.getVar("PORT");

var jsonParser = bodyParser.json();
app.use(jsonParser, cors(), infoMiddleware);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hi! I'm Quản Tiến Nghĩa. Welcome to my Google scraper server.");
});

app.use("/v1/users", new UsersController().createRouter());

app.listen(port, () => {
  Logger.info(`️[server]: The Server is running at http://localhost:${port}`);
});
