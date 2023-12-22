import { setTimeout as delay } from "timers/promises";
import { searchResultSelect } from "../models/search-results.model";
import { SearchResultsRepository } from "../repositories/search-results.repo";
import { randomInt } from "../common/utils/number.utils";
import { GoogleScraper } from "./google-scraper.service";
import { Logger } from "../common/logger/logger";

export class GoogleScrapingScheduler {
  private static readonly pendingSearchResultsQueue =
    [] as searchResultSelect[];
  private static readonly MODULO_CYCLE_SIZE = 10007;
  private static readonly MODULO_CYCLE_BASE = 37;
  private static readonly UNIT_FAIL_STREAK_DELAY = 17250;
  private static readonly FAIL_STREAK_THRESHOLD = 16;
  private static readonly RECHECK_DURATION = 30000;
  private static readonly fibonacciSequence = [1, 1];
  private static failsStreak = 0;
  private static moduloCycle = 1;
  private static isRunning = false;

  private static async loadAllPendingSearchResults() {
    const loadedPendingSearchResults =
      await SearchResultsRepository.getAllPendingSearchResults();
    this.pendingSearchResultsQueue.push(...loadedPendingSearchResults);
  }

  private static calculateFibonacci(nth: number) {
    while (nth >= this.fibonacciSequence.length)
      this.fibonacciSequence.push(
        this.fibonacciSequence[this.fibonacciSequence.length - 1] +
          this.fibonacciSequence[this.fibonacciSequence.length - 2]
      );

    return this.fibonacciSequence[nth];
  }

  private static calculateDelayTime(): number {
    const failStreakTime =
      this.calculateFibonacci(this.failsStreak) * this.UNIT_FAIL_STREAK_DELAY;
    const additionalTime = Math.floor(
      (randomInt(failStreakTime) + randomInt(failStreakTime)) / 2
    );
    this.moduloCycle =
      (this.moduloCycle * this.MODULO_CYCLE_BASE) % this.MODULO_CYCLE_SIZE;
    return failStreakTime + additionalTime + this.moduloCycle;
  }
  private static async scheduleNext() {
    const searchResult = this.pendingSearchResultsQueue.pop();
    if (!searchResult) return;

    const delayTime = this.calculateDelayTime();
    Logger.info(
      `Start scraping for: "${searchResult.keyword}" after ${(
        delayTime / 1000
      ).toFixed(2)}s`
    );
    await delay(delayTime);

    try {
      const html = await GoogleScraper.retrieveGoogleSearchHtml(
        searchResult.keyword
      );
      const scrapedSearchResult = GoogleScraper.extractDataFromHtml(
        searchResult.keyword,
        html
      );

      scrapedSearchResult.id = searchResult.id;
      await SearchResultsRepository.updateSearchResultById(scrapedSearchResult);

      if (this.failsStreak) --this.failsStreak;
      Logger.info(`Done scraping for: "${searchResult.keyword}"`);
    } catch (e) {
      Logger.error("Scrape search result failed: ", e);
      ++this.failsStreak;
      this.pendingSearchResultsQueue.unshift();
    }
  }

  /**
   * NOTE: Use iteration instead of recursion to avoid stack overflow errors
   */
  static async startScheduling() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.failsStreak = 0;

    while (true) {
      if (this.pendingSearchResultsQueue.length) await this.scheduleNext();
      else await delay(this.RECHECK_DURATION);

      if (this.failsStreak >= this.FAIL_STREAK_THRESHOLD) {
        Logger.error("Scrape Scheduler has stopped due to high fail streak.");
        this.isRunning = false;
        break;
      }
    }
  }

  static initializeAndStart() {
    this.loadAllPendingSearchResults().then(() => {
      this.startScheduling();
    });
  }

  static addPendingSearchResults(
    newPendingSearchResults: searchResultSelect[]
  ) {
    this.pendingSearchResultsQueue.unshift(...newPendingSearchResults);
  }
}
