import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import mData from "../assets/MOCK_DATA.json";
import { DateTime } from "luxon";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import {
  Box,
  Button,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function BasicTable() {
  const data = useMemo(() => mData, []);

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "DATE",
      accessorKey: "date",
      cell: (info) =>
        DateTime.fromSQL(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: "MAKE",
      accessorKey: "make",
    },
    {
      header: "MODEL",
      accessorFn: (row) => `${row.model} - ${row.model_year}`,
    },
    {
      header: "VIN",
      accessorKey: "vin",
    },
    {
      header: "COLOR",
      accessorKey: "color",
    },
    {
      header: "WORKING",
      accessorKey: "working",
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <Stack spacing={3} sx={{ padding: "20px" }}>
      <Stack justifyContent="center" sx={{ padding: "0px 20px" }}>
        <TextField
          fullWidth
          size="small"
          value={filtering}
          placeholder="Search....."
          onChange={(e) => setFiltering(e.target.value)}
        />
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </TableCell>
                  ))}
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="end"
        sx={{ padding: "20px" }}
      >
        <Button
          variant="outlined"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          <FirstPageIcon />
        </Button>
        <Button
          variant="outlined"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <SkipPreviousIcon />
        </Button>
        <Button
          variant="outlined"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <SkipNextIcon />
        </Button>
        <Button
          variant="outlined"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <LastPageIcon />
        </Button>
      </Stack>
    </Stack>
  );
}

export default BasicTable;
