import React from "react";
import { SearchResultsTable } from "../../components/SearchResultTable.component";
import { TypeSearchResult } from "../../models/search-results.model";
import {
  fetchSearchResultsApi,
  uploadCsvOfKeywordsApi,
} from "../../apis/search-results.apis";
import { TextField } from "../../components/TextField.component";
import { useAppI18n } from "../../common/i18n/I18nProvider.context";
import { BackdropLoading } from "../../components/BackdropLoading.component";
import { useAppNavigate } from "../../common/routers/navigate.hook";
import { Button } from "../../components/Button.component";
import { RefreshIcon, UploadIcon } from "../../components/Icons.components";
import { randomInt } from "../../utils/number.utils";

const DEBOUNCE_TIME = 300;

export function HomePage() {
  const { fm } = useAppI18n();
  const navigate = useAppNavigate();
  const uploadCsvInputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadCsvInputKey, setUploadCsvInputKey] = React.useState<number>(
    randomInt(1e6)
  );
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [text, setText] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);
  const [searchResults, setSearchResults] =
    React.useState<TypeSearchResult[]>();

  const fetchSearchResults = React.useCallback(() => {
    setIsLoading(true);
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
  }, [text, page, limit]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSearchResults();
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchSearchResults]);

  const handleTextChange = React.useCallback((newText: string) => {
    setText(newText);
    setPage(0);
  }, []);

  const handleViewHtml = React.useCallback(
    (searchResultId: string) => {
      navigate("viewHtml", { params: { searchResultId } });
    },
    [navigate]
  );

  const handleOpenUploadCsvDialog = React.useCallback(() => {
    uploadCsvInputRef.current?.click();
  }, []);

  const handleUploadCsv = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      // TODO: Show error
      if (!file) return;
      if (file.type !== "text/csv") return;
      uploadCsvOfKeywordsApi(file)
        .then(() => {
          fetchSearchResults();
        })
        .catch((e) => {
          // TODO: Show error
          console.error(e);
        });

      setUploadCsvInputKey((prev) => {
        let newInputKey: number;
        do {
          newInputKey = randomInt(1e6);
        } while (newInputKey === prev);

        return newInputKey;
      });
    },
    [fetchSearchResults]
  );

  return (
    <>
      <div className="relative flex mt-8 mb-32 mx-8 md:mx-16 lg:mx-32 flex-col gap-3">
        <div className="flex gap-5 whitespace-nowrap">
          <TextField
            className="w-full"
            name="keyword"
            label={fm("searchResult.searchByKeyword")}
            placeholder={fm("searchResult.searchByKeyword")}
            value={text}
            onChange={handleTextChange}
          />
          <Button
            variant="contained"
            startIcon={<RefreshIcon className="ml-4" />}
            onClick={fetchSearchResults}
          >
            <div className="text-lg mr-4">{fm("common.refresh")}</div>
          </Button>
          <Button
            variant="contained"
            startIcon={<UploadIcon className="ml-4" />}
            onClick={handleOpenUploadCsvDialog}
          >
            <div className="text-lg mr-4">{fm("searchResult.uploadCsv")}</div>
          </Button>
          <input
            key={uploadCsvInputKey}
            id={"upload-csv-input"}
            ref={uploadCsvInputRef}
            hidden
            type="file"
            accept=".csv"
            onChange={handleUploadCsv}
          />
        </div>
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
