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
  },
  errorMessages: {
    usernameIsRequired: "Username is required.",
    passwordIsRequired: "Password is required.",
  },
  searchResult: {
    keyword: "keyword",
    adwordsCount: "adwords count",
    linksCount: "links count",
    resultsCount: "result count",
    pending: "pending",
    viewHtml: "view HTML",
    searchByKeyword: "Search by keyword",
    rowPerPage: "Row per page"
  }
};
