import { randomUUID } from "crypto";
import { SearchResultInsert } from "../models/search-results.model";
import { HttpHelper } from "../common/http-helper/http-helper";
import { Logger } from "../common/logger/logger";
import { JSDOM } from "jsdom";

export class GoogleScraper {
  private static readonly BASE_GOOGLE_SEARCH_URL = "https://www.google.com/search?q=";
  private static readonly API_HEADERS = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 OPR/104.0.0.0",
  };

  static async retrieveGoogleSearchHtml(keyword: string): Promise<string> {
    if (!keyword) {
      throw new Error("Search keyword is required.");
    }

    const url =
      this.BASE_GOOGLE_SEARCH_URL +
      keyword
        .split(" ")
        .map((s) => s.trim())
        .join("+") +
      "&hl=en";

    try {
      return (
        await HttpHelper.get(url, undefined, { headers: this.API_HEADERS })
      ).data as string;
    } catch (e) {
      Logger.error(e);
      return "";
    }
  }

  /**
   * Strategy: Find the div with id="result-stats", in its inner HTML, find the first digit and grab until the next space character.
   */
  private static extractResultsCount(dom: JSDOM): number {
    const resultStatsDiv = dom.window.document.getElementById("result-stats");
    if (!resultStatsDiv) return 0;

    const innerHtml = resultStatsDiv.innerHTML;
    if (!innerHtml) return 0;

    let firstDigitIndex = 0;
    while (
      firstDigitIndex < innerHtml.length &&
      (innerHtml.charCodeAt(firstDigitIndex) < 48 ||
        innerHtml.charCodeAt(firstDigitIndex) > 57)
    ) {
      ++firstDigitIndex;
    }

    if (firstDigitIndex === innerHtml.length) return 0;
    let endIndex = innerHtml.indexOf(" ", firstDigitIndex);
    if (endIndex < 0) endIndex = innerHtml.length;

    const numAsString = innerHtml
      .substring(firstDigitIndex, endIndex)
      .split(",")
      .join("");
    return parseInt(numAsString);
  }

  /**
   * Strategy: Count all <a> tags in the dom
   */
  private static extractLinksCount(dom: JSDOM): number {
    return dom.window.document.getElementsByTagName("a").length;
  }

  /**
   * Strategy: Count all <h1> tags in the dom whose inner text is "Ads"
   * Note: This only works in English search result, i.e: query param hl=en must be included.
   */
  private static extractAdwordsCount(dom: JSDOM): number {
    const h1Elements = Array.from(
      dom.window.document.getElementsByTagName("h1")
    );
    return h1Elements.filter((element) => element.innerHTML === "Ads").length;
  }

  static extractDataFromHtml(
    keyword: string,
    html: string
  ): SearchResultInsert {
    let dom: JSDOM;
    try {
      dom = new JSDOM(html);
    } catch (e) {
      throw e;
    }

    const result: SearchResultInsert = {
      id: randomUUID(),
      keyword,
      html,
      adwordsCount: 0,
      linksCount: 0,
      resultsCount: 0,
    };

    result.resultsCount = this.extractResultsCount(dom);
    result.linksCount = this.extractLinksCount(dom);
    result.adwordsCount = this.extractAdwordsCount(dom);

    return result;
  }
}