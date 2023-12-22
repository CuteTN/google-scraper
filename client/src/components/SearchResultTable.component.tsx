import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import { TypeSearchResult } from "../models/search-results.model";
import { Paper } from "./Paper.component";
import { useAppI18n } from "../common/i18n/I18nProvider.context";
import { LaunchIcon, PendingIcon } from "./Icons.components";
import { Tooltip } from "./Tooltip.component";
import { TableFooter } from "@mui/material";

export function SearchResultsTable({
  items,
  page,
  limit,
  total,
  onChangePage,
  onChangeLimit,
  onViewHtml,
}: {
  items: TypeSearchResult[];
  page: number;
  limit: number;
  total: number;
  onChangePage: (newPage: number) => any;
  onChangeLimit: (newLimit: number) => any;
  onViewHtml: (id: string) => any;
}) {
  const { fm } = useAppI18n();

  /**
   * Filled up empty rows to avoid page jumping experience
   */
  const filledUpItems = React.useMemo<(TypeSearchResult | null)[]>(() => {
    const result: (TypeSearchResult | null)[] = [...items];
    while (result.length < limit) result.push(null);
    return result;
  }, [items, limit]);

  const handleChangePage = React.useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      onChangePage(newPage);
    },
    [onChangePage]
  );

  const handleChangeLimit = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChangeLimit(parseInt(event.target.value, 10));
      onChangePage(0);
    },
    [onChangePage, onChangeLimit]
  );

  const handleViewHtml = React.useCallback(
    (id?: string) => {
      if (id) onViewHtml?.(id);
    },
    [onViewHtml]
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{fm("searchResult.keyword")}</TableCell>
              <TableCell width={"20%"} align="right">
                {fm("searchResult.adwordsCount")}
              </TableCell>
              <TableCell width={"20%"} align="right">
                {fm("searchResult.linksCount")}
              </TableCell>
              <TableCell width={"20%"} align="right">
                {fm("searchResult.resultsCount")}
              </TableCell>
              <TableCell width={30} align="right">
                HTML
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filledUpItems.map((row, index) => (
              <TableRow
                key={row?.id ?? index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row === null ? "-" : row.keyword}
                </TableCell>
                <TableCell align="right">
                  {row === null ? "-" : row.adwordsCount}
                </TableCell>
                <TableCell align="right">
                  {row === null ? "-" : row.linksCount}
                </TableCell>
                <TableCell align="right">
                  {row === null ? "-" : row.resultsCount}
                </TableCell>
                <TableCell align="right">
                  {row?.pending ? (
                    <Tooltip
                      title={
                        row === null ? "" : fm("searchResult.thisDataIsPending")
                      }
                      placement="top"
                    >
                      <PendingIcon color="disabled" />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={row === null ? "" : fm("searchResult.viewHtml")}
                      placement="top"
                    >
                      <LaunchIcon
                        className={
                          row === null ? "cursor-default" : "cursor-pointer"
                        }
                        color={row === null ? "disabled" : "inherit"}
                        onClick={() => handleViewHtml(row?.id)}
                      />
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={5}
                count={total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={limit}
                onRowsPerPageChange={handleChangeLimit}
                labelRowsPerPage={fm("searchResult.rowPerPage")}
                rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
