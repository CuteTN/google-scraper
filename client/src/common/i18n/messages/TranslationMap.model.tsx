export type TranslationMap = {
  languageName: string;
  languageImgSrc: string;
  common: {
    language: string;
    theme: string;
    msgThemeName: string;
    lightTheme: string;
    darkTheme: string;
    please: string;
    signIn: string;
    signUp: string;
    signOut: string;
    toContinue: string;
    username: string;
    password: string;
    createNewAccount: string;
    alreadyHaveAccount: string;
    ok: string;
    error: string;
  };
  errorMessages: {
    usernameIsRequired: string;
    passwordIsRequired: string;
  };
  searchResult: {
    keyword: string,
    adwordsCount: string,
    linksCount: string,
    resultsCount: string,
    pending: string,
    viewHtml: string,
    searchByKeyword: string,
    rowPerPage: string,
  }
};
