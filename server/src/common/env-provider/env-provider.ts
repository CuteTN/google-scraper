import dotenv from "dotenv";
import { Logger } from "../logger/logger";

export class EnvProvider {
  private static isConfigured: boolean = false;

  public static getVar(name: string): any {
    if (!this.isConfigured) dotenv.config();

    const result = process.env[name];
    if (!result) Logger.warn(`The environment variable ${name} is undefined.`);

    return result;
  }
}
