/**
 * This class abstracts away the logging logics
 */
export class Logger {
  /**
   * This will only log the content if the environment variable ENABLED_DEBUG_LOG is set to `true` to avoid log spamming on a remote server
   * @param contents
   */
  static log(...contents: any[]) {
    if (process.env.ENABLED_DEBUG_LOG == "true") {
      console.log("[LOG]", ...contents);
    }
  }

  static info(...contents: any[]) {
    console.info("[INFO]", ...contents);
  }

  static warn(...contents: any[]) {
    console.warn("[WARN]", ...contents);
  }

  static error(...contents: any[]) {
    console.error("[ERROR]", ...contents);
  }

  static horizontalLine(title: string) {
    const titleWithLine = `[ ${title} ] `.padEnd(50, "-");
    console.info(titleWithLine);
  }
}
