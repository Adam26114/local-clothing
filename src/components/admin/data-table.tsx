'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type AdminDataTableProps<TData, TValue> = {
  tableId: string;
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  searchPlaceholder?: string;
  defaultPageSize?: number;
  rowsPerPage?: number[];
  toolbar?: React.ReactNode;
  globalFilterDebounceMs?: number;
  onSelectedRowsChange?: (rows: TData[]) => void;
};

export function withRowSelection<TData, TValue>(
  columns: Array<ColumnDef<TData, TValue>>
): Array<ColumnDef<TData, TValue>> {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(Boolean(checked))}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(Boolean(checked))}
        />
      ),
      enableHiding: false,
      enableSorting: false,
    },
    ...columns,
  ];
}

export function AdminDataTable<TData, TValue>({
  tableId,
  columns,
  data,
  searchPlaceholder = 'Search...',
  defaultPageSize = 20,
  rowsPerPage = [10, 20, 50, 100],
  toolbar,
  globalFilterDebounceMs = 300,
  onSelectedRowsChange,
}: AdminDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  React.useEffect(() => {
    const raw = window.localStorage.getItem(`khit_columns_${tableId}`);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        setColumnVisibility(parsed as VisibilityState);
      } else {
        window.localStorage.removeItem(`khit_columns_${tableId}`);
      }
    } catch {
      window.localStorage.removeItem(`khit_columns_${tableId}`);
    }
  }, [tableId]);

  React.useEffect(() => {
    window.localStorage.setItem(`khit_columns_${tableId}`, JSON.stringify(columnVisibility));
  }, [tableId, columnVisibility]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setGlobalFilter(searchInput);
    }, globalFilterDebounceMs);

    return () => window.clearTimeout(timer);
  }, [globalFilterDebounceMs, searchInput]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
  });

  React.useEffect(() => {
    if (!onSelectedRowsChange) return;
    const selected = table.getFilteredSelectedRowModel().rows.map((row) => row.original);
    onSelectedRowsChange(selected);
  }, [onSelectedRowsChange, rowSelection, table, data]);

  return (
    <div className="space-y-3 rounded-lg border bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="pl-9"
            placeholder={searchPlaceholder}
          />
        </div>
        <div className="flex items-center gap-2">
          {toolbar}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns3 className="size-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <Filter className="size-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow data-state={row.getIsSelected() ? 'selected' : undefined} key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="py-10 text-center text-zinc-500">
                  No rows found. Try clearing filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600">
        <p>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </p>
        <div className="flex items-center gap-2">
          <span>Rows:</span>
          <select
            className="rounded border px-2 py-1 text-sm"
            value={table.getState().pagination.pageSize}
            onChange={(event) => table.setPageSize(Number(event.target.value))}
          >
            {rowsPerPage.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <p>
            Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
