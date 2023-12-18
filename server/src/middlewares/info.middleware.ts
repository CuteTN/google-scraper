import { RequestHandler } from "express";
import { Logger } from "../common/logger/logger";

/**
 * logging API information 
 * @param req 
 * @param res 
 * @param next 
 */
export const infoMiddleware: RequestHandler = async (req, res, next) => {
  Logger.horizontalLine(req.url);
  next();
}