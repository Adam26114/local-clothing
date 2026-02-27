'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';

import { AdminDataTable, withRowSelection } from '@/components/admin/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { categories, products } from '@/lib/mock-data';
import { Product } from '@/lib/types';

function totalStock(product: Product): number {
  return product.colorVariants.reduce((sum, variant) => {
    return sum + Object.values(variant.stock).reduce((stockSum, value) => stockSum + (value ?? 0), 0);
  }, 0);
}

export function ProductsTable() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'notFeatured'>('all');

  const data = useMemo(() => {
    return products.filter((product) => {
      const activeMatch =
        activeFilter === 'all' ||
        (activeFilter === 'active' ? product.isPublished : !product.isPublished);
      const featuredMatch =
        featuredFilter === 'all' ||
        (featuredFilter === 'featured' ? product.isFeatured : !product.isFeatured);
      return activeMatch && featuredMatch;
    });
  }, [activeFilter, featuredFilter]);

  const columns: Array<ColumnDef<Product>> = [
    {
      id: 'thumbnail',
      header: 'Thumbnail',
      cell: () => <div className="size-10 rounded bg-zinc-100" />,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <Link href={`/admin/products/${row.original._id}/edit`} className="font-medium hover:underline">
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
      cell: ({ row }) => row.original.sku ?? '-',
    },
    {
      id: 'category',
      header: 'Category',
      cell: ({ row }) =>
        categories.find((category) => category._id === row.original.categoryId)?.name ?? 'Unknown',
    },
    {
      accessorKey: 'basePrice',
      header: 'Base Price',
      cell: ({ row }) => `Ks ${row.original.basePrice ?? 0}`,
    },
    {
      id: 'stockTotal',
      header: 'Stock Total',
      cell: ({ row }) => totalStock(row.original),
    },
    {
      id: 'active',
      header: 'Active',
      cell: ({ row }) => (
        <Badge variant={row.original.isPublished ? 'default' : 'secondary'}>
          {row.original.isPublished ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href={`/admin/products/${row.original._id}/edit`}>Update</Link>
          </Button>
          <Button size="sm" variant="outline">
            Duplicate
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <select
          className="rounded border bg-white px-3 py-1 text-sm"
          value={activeFilter}
          onChange={(event) => setActiveFilter(event.target.value as 'all' | 'active' | 'inactive')}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          className="rounded border bg-white px-3 py-1 text-sm"
          value={featuredFilter}
          onChange={(event) =>
            setFeaturedFilter(event.target.value as 'all' | 'featured' | 'notFeatured')
          }
        >
          <option value="all">All Featured</option>
          <option value="featured">Featured</option>
          <option value="notFeatured">Not Featured</option>
        </select>
      </div>
      <AdminDataTable
        tableId="products"
        columns={withRowSelection(columns)}
        data={data}
        searchPlaceholder="Search by name, SKU, description"
        toolbar={
          <Button asChild size="sm" className="bg-black text-white hover:bg-zinc-800">
            <Link href="/admin/products/new">Add Product</Link>
          </Button>
        }
      />
    </div>
  );
}
