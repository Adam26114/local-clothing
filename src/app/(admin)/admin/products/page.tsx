import { ProductsTable } from '@/components/admin/products-table';

export default function AdminProductsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Products</h1>
      <ProductsTable />
    </div>
  );
}
