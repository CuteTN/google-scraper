import React from "react";
import { TranslationKeys } from "./messages/TranslationKey.model";
import { TranslationMap } from "./messages/TranslationMap.model";
import { flattenObject } from "../utils/objects.utils";
import { FormatMessageFunction } from "./messages/FormatMessage.model";

const LOCAL_STORAGE_LANGUAGE_ITEM_KEY = "google-scraper-language";
const DEFAULT_LANGUAGE_ID = "en";

const appI18nContext = React.createContext<{
  languageId: string;
  allLanguages: { [id: string]: TranslationMap };
  selectLanguage: (languageId?: string) => void;
  flattenMessages: Record<string, string>;
}>(undefined as any);

export function AppI18nProvider({
  children,
  allLanguages,
}: {
  children: any;
  allLanguages: { [id: string]: TranslationMap };
}) {
  const [selectedLanguageId, setSelectedLanguageId] = React.useState<string>(
    () =>
      localStorage.getItem(LOCAL_STORAGE_LANGUAGE_ITEM_KEY) ||
      DEFAULT_LANGUAGE_ID
  );

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_ITEM_KEY, selectedLanguageId);
  }, [selectedLanguageId]);

  const selectLanguage = React.useCallback(
    (languageId?: string) => {
      if (languageId && allLanguages[languageId]) {
        setSelectedLanguageId(languageId);
      } else {
        setSelectedLanguageId(DEFAULT_LANGUAGE_ID);
      }
    },
    [setSelectedLanguageId, allLanguages]
  );

  const flattenMessages = React.useMemo(() => {
    const rawMessages =
      allLanguages[selectedLanguageId] || allLanguages[DEFAULT_LANGUAGE_ID];
    return flattenObject(rawMessages) as Record<string, string>;
  }, [selectedLanguageId, allLanguages]);

  const contextValue = React.useMemo(
    () => ({
      languageId: selectedLanguageId,
      selectLanguage: selectLanguage,
      flattenMessages,
      allLanguages,
    }),
    [selectedLanguageId, flattenMessages, selectLanguage, allLanguages]
  );

  return (
    <appI18nContext.Provider value={contextValue}>
      {children}
    </appI18nContext.Provider>
  );
}

export function useAppI18n() {
  const i18nContext = React.useContext(appI18nContext);

  /** Format message */
  const fm = React.useCallback<FormatMessageFunction>(
    (id: TranslationKeys) => {
      return i18nContext.flattenMessages[id];
    },
    [i18nContext.flattenMessages]
  );

  return React.useMemo(
    () => ({
      fm,
      ...i18nContext,
    }),
    [fm, i18nContext]
  );
}
