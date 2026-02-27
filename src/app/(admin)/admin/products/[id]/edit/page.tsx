import { ProductEditor } from '@/components/admin/product-editor';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <ProductEditor mode="edit" productId={id} />
    </div>
  );
}
