import React from "react";
import { useParams } from "react-router-dom";
import { fetchSearchResultHtmlByIdApi } from "../../apis/search-results.apis";
import { useAppI18n } from "../../common/i18n/I18nProvider.context";
import { useAppNavigate } from "../../common/routers/navigate.hook";
import { BackdropLoading } from "../../components/BackdropLoading.component";
import { Button } from "../../components/Button.component";
import { Fab } from "../../components/Fab.component";
import { DownloadIcon, HomeIcon } from "../../components/Icons.components";
import { Tooltip } from "../../components/Tooltip.component";
import { Typography } from "../../components/Typography.component";
import { TypeSearchResult } from "../../models/search-results.model";

export function ViewHtmlPage() {
  const urlParams = useParams();
  const searchResultId = urlParams?.searchResultId ?? "";
  const navigate = useAppNavigate();
  const { fm } = useAppI18n();
  const downloadHtmlAnchorRef = React.useRef<HTMLAnchorElement | null>(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [searchResult, setSearchResult] =
    React.useState<TypeSearchResult | null>(null);

  React.useEffect(() => {
    if (!searchResultId) {
      navigate("home");
    }
  }, [searchResultId, navigate]);

  const handleBackHome = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate("home");
    },
    [navigate]
  );

  React.useEffect(() => {
    setIsLoading(true);

    fetchSearchResultHtmlByIdApi(searchResultId)
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((e) => {
        // TODO: Show error
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchResultId]);

  const handleDownloadHtml = React.useCallback(() => {
    const content = searchResult?.html;
    if (!content) return;
    const element = downloadHtmlAnchorRef.current;
    if (!element) return;

    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${searchResult.keyword}-scaped-result.html`;
    element.click();
  }, [searchResult]);

  return (
    <div className="flex flex-col mt-5 mx-5 gap-3">
      <Button
        className="w-fit"
        variant="contained"
        color="primary"
        href="/"
        startIcon={<HomeIcon />}
        onClick={handleBackHome}
      >
        <Typography className="whitespace-nowrap" variant="body1">
          {fm("common.backHome")}
        </Typography>
      </Button>

      <div className="flex relative flex-col gap-3 min-h-screen">
        <div className="flex gap-3 align-middle">
          <Typography variant="h5">
            {fm("searchResult.htmlForGooglePageOfKeyword")}:&nbsp;
            <b>{searchResult?.keyword ?? "N/A"}</b>
          </Typography>
          {searchResult && (
            <Tooltip title={fm("common.download")} placement="top">
              <div>
                <Fab
                  className="ml-3"
                  size={"small"}
                  color="primary"
                  onClick={handleDownloadHtml}
                  disabled={searchResult?.pending}
                >
                  <DownloadIcon />
                </Fab>
              </div>
            </Tooltip>
          )}
        </div>
        <div className="max-w-[95%] break-all whitespace-break-spaces">
          {searchResult?.pending
            ? fm("searchResult.thisDataIsPending")
            : searchResult?.html ?? "N/A"}{" "}
        </div>
        <BackdropLoading className="!absolute" shown={isLoading} />
      </div>
      {/* Dummy a element to download HTML */}
      <a ref={downloadHtmlAnchorRef} className="hidden" href="dummy">
        Download HTMl
      </a>
    </div>
  );
}
