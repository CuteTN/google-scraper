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
};