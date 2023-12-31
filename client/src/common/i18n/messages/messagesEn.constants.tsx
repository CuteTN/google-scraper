import { TranslationMap } from "./TranslationMap.model";

export const messagesEn: TranslationMap = {
  languageName: "English",
  languageImgSrc: "https://cdn.ipregistry.co/flags/noto/us.png",
  common: {
    language: "language",
    theme: "theme",
    lightTheme: "Light theme",
    darkTheme: "Dark theme",
    msgThemeName: "{name} theme",
    please: "please",
    signIn: "sign in",
    signUp: "sign up",
    signOut: "sign out",
    toContinue: "to continue",
    password: "password",
    username: "username",
    createNewAccount: "Create a new account",
    alreadyHaveAccount: "Already have an account",
    ok: "OK",
    error: "error",
    backHome: "back to home",
    nothingHere: "there's nothing here",
    copy: "copy",
    download: "download",
    refresh: "refresh",
  },
  errorMessages: {
    usernameIsRequired: "Username is required.",
    passwordIsRequired: "Password is required.",
  },
  searchResult: {
    keyword: "keyword",
    adwordsCount: "adwords count",
    linksCount: "links count",
    resultsCount: "results count",
    pending: "pending",
    viewHtml: "view HTML",
    searchByKeyword: "Search by keyword",
    rowPerPage: "Row per page",
    htmlForGooglePageOfKeyword:
      "The HTML of Google's search result page of keyword",
    uploadCsv: "upload CSV",
    thisDataIsPending: "This data is pending."
  },
};
