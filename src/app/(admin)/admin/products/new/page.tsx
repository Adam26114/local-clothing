import { DataSourceNotice } from '@/components/shared/data-source-notice';
import { ProductEditor } from '@/components/admin/product-editor';
import { getServerDataRepositories } from '@/lib/data/repositories';

export default async function NewProductPage() {
  const { repositories, selection } = getServerDataRepositories();
  const categories = await repositories.categories.list({ activeOnly: false });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Add Product</h1>
      <DataSourceNotice selection={selection} />
      <ProductEditor mode="create" categories={categories} />
    </div>
  );
}
