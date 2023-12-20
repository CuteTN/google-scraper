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
import { LaunchIcon } from "./Icons.components";
import { Tooltip } from "./Tooltip.component";

export function SearchResultsTable({
  items,
  page,
  limit,
  total,
  onChangePage,
  onChangeLimit,
}: {
  items: TypeSearchResult[];
  page: number;
  limit: number;
  total: number;
  onChangePage: (newPage: number) => any;
  onChangeLimit: (newLimit: number) => any;
}) {
  const { fm } = useAppI18n();

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

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{fm("searchResult.keyword")}</TableCell>
              <TableCell align="right">
                {fm("searchResult.adwordsCount")}
              </TableCell>
              <TableCell align="right">
                {fm("searchResult.linksCount")}
              </TableCell>
              <TableCell align="right">
                {fm("searchResult.resultsCount")}
              </TableCell>
              <TableCell align="right">HTML</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.keyword}
                </TableCell>
                <TableCell align="right">{row.adwordsCount}</TableCell>
                <TableCell align="right">{row.linksCount}</TableCell>
                <TableCell align="right">{row.resultsCount}</TableCell>
                <TableCell align="right">
                  <Tooltip title={fm("searchResult.viewHtml")}>
                    <LaunchIcon className="cursor-pointer" />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeLimit}
        labelRowsPerPage={fm("searchResult.rowPerPage")}
        rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
      />
    </>
  );
}
