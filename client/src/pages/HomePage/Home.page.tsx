import React from "react";
import { SearchResultsTable } from "../../components/SearchResultTable.component";
import { TypeSearchResult } from "../../models/search-results.model";
import { fetchSearchResultsApi } from "../../apis/search-results.apis";
import { TextField } from "../../components/TextField.component";
import { useAppI18n } from "../../common/i18n/I18nProvider.context";
import { BackdropLoading } from "../../components/BackdropLoading.component";
import { useAppNavigate } from "../../common/routers/navigate.hook";

const DEBOUNCE_TIME = 500;

export function HomePage() {
  const { fm } = useAppI18n();
  const navigate = useAppNavigate();
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [text, setText] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);
  const [searchResults, setSearchResults] =
    React.useState<TypeSearchResult[]>();

  React.useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      fetchSearchResultsApi(text, page, limit)
        .then((res) => {
          setSearchResults(res.data?.data ?? []);
          setTotal(res.data.total ?? 0);
        })
        .catch((e) => {
          // TODO: Show error
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, page, limit]);

  const handleTextChange = React.useCallback((newText: string) => {
    setText(newText);
    setPage(0);
  }, []);

  const handleViewHtml = React.useCallback((searchResultId: string) => {
    navigate("viewHtml", { params: { searchResultId } });
  }, [navigate]);

  return (
    <>
      <div className="relative flex mt-8 mb-32 mx-8 md:mx-16 lg:mx-32 flex-col gap-3">
        <TextField
          className="w-full"
          name="keyword"
          label={fm("searchResult.searchByKeyword")}
          placeholder={fm("searchResult.searchByKeyword")}
          value={text}
          onChange={handleTextChange}
        />
        <div className="relative">
          <SearchResultsTable
            items={searchResults ?? []}
            total={total}
            page={page}
            onChangePage={setPage}
            limit={limit}
            onChangeLimit={setLimit}
            onViewHtml={handleViewHtml}
          />
          <BackdropLoading className="!absolute" shown={isLoading} />
        </div>
      </div>
    </>
  );
}
