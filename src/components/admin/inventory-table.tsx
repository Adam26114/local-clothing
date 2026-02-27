'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';

import { AdminDataTable, withRowSelection } from '@/components/admin/data-table';
import { products } from '@/lib/mock-data';
import { SizeKey } from '@/lib/types';

type InventoryRow = {
  productId: string;
  productName: string;
  variantId: string;
  colorName: string;
  size: SizeKey;
  stock: number;
};

function buildRows(): InventoryRow[] {
  const rows: InventoryRow[] = [];
  for (const product of products) {
    for (const variant of product.colorVariants) {
      for (const size of variant.selectedSizes) {
        rows.push({
          productId: product._id,
          productName: product.name,
          variantId: variant.id,
          colorName: variant.colorName,
          size,
          stock: variant.stock[size] ?? 0,
        });
      }
    }
  }
  return rows;
}

export function InventoryTable() {
  const [rows, setRows] = useState(buildRows());
  const [lowOnly, setLowOnly] = useState(false);
  const [outOnly, setOutOnly] = useState(false);

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      if (outOnly) return row.stock === 0;
      if (lowOnly) return row.stock < 5;
      return true;
    });
  }, [rows, lowOnly, outOnly]);

  const columns: Array<ColumnDef<InventoryRow>> = [
    { accessorKey: 'productName', header: 'Product' },
    { accessorKey: 'colorName', header: 'Variant (Color)' },
    { accessorKey: 'size', header: 'Size' },
    {
      accessorKey: 'stock',
      header: 'Stock Quantity',
      cell: ({ row }) => (
        <input
          type="number"
          min={0}
          className="w-20 rounded border px-2 py-1 text-sm"
          value={row.original.stock}
          onChange={(event) => {
            const value = Number(event.target.value);
            setRows((prev) =>
              prev.map((entry) =>
                entry.productId === row.original.productId &&
                entry.variantId === row.original.variantId &&
                entry.size === row.original.size
                  ? { ...entry, stock: Number.isFinite(value) ? Math.max(value, 0) : 0 }
                  : entry
              )
            );
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-3 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={lowOnly}
            onChange={(event) => {
              setLowOnly(event.target.checked);
              if (event.target.checked) setOutOnly(false);
            }}
          />
          Low stock (&lt; 5)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={outOnly}
            onChange={(event) => {
              setOutOnly(event.target.checked);
              if (event.target.checked) setLowOnly(false);
            }}
          />
          Out of stock (= 0)
        </label>
      </div>
      <AdminDataTable
        tableId="inventory"
        columns={withRowSelection(columns)}
        data={filtered}
        searchPlaceholder="Search product or color"
        defaultPageSize={50}
      />
    </div>
  );
}
