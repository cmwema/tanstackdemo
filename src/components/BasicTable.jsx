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
import { Avatar, Box, Button, Stack } from "@mui/material";

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
    // {
    //   header: "MODEL YEAR",
    //   accessorKey: "model year",
    // },
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
    <Stack spacing={3}>
      <Stack justifyContent="center" sx={{padding: "0px 20px"}}>
        <Box sx={{ width: "300px" }}>
          <input
            type="text"
            value={filtering}
            placeholder="Search....."
            onChange={(e) => setFiltering(e.target.value)}
          />
        </Box>
      </Stack>
      <div class="w3-container">
        <table class="w3-table-all w3-hoverable">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="end"
        sx={{ padding: "20px" }}
      >
        <Button
          sx={{ cursor: "pointer" }}
          onClick={() => table.setPageIndex(0)}
        >
          <FirstPageIcon />
        </Button>
        <Button
          disabled={!table.getCanPreviousPage()}
          sx={{ cursor: "pointer" }}
          onClick={() => table.previousPage()}
        >
          <SkipPreviousIcon />
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          sx={{ cursor: "pointer" }}
          onClick={() => table.nextPage()}
        >
          <SkipNextIcon />
        </Button>
        <Button
          sx={{ cursor: "pointer" }}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <LastPageIcon />
        </Button>
      </Stack>
    </Stack>
  );
}

export default BasicTable;
