import { ProductEditor } from '@/components/admin/product-editor';

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <ProductEditor mode="edit" productId={params.id} />
    </div>
  );
}
