import { ProductEditor } from '@/components/admin/product-editor';

export default function NewProductPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Add Product</h1>
      <ProductEditor mode="create" />
    </div>
  );
}
