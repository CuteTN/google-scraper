import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { Logger } from "./src/common/logger/logger";
import { infoMiddleware } from "./src/common/middlewares/info-middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var jsonParser = bodyParser.json()
app.use(jsonParser, cors(), infoMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hi! I'm Quản Tiến Nghĩa. Welcome to my Google scraper server.");
});

app.get("/v1/test-endpoint", (req,res) => {
  res.status(200).send({ ok: "very ok" })
});

app.listen(port, () => {
  Logger.info(
    `️[server]: The Dog-Express-TS server is running at http://localhost:${port}`
  );
});
