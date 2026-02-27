'use client';

import { ProductCard } from '@/components/store/product-card';
import { categories, products } from '@/lib/mock-data';

export default function SubCategoryPage({
  params,
}: {
  params: { category: string; subcategory: string };
}) {
  const parent = categories.find((item) => item.slug === params.category && !item.parentId);
  const subcategory = categories.find(
    (item) => item.slug === params.subcategory && item.parentId === parent?._id
  );

  const filtered = subcategory
    ? products.filter((product) => product.categoryId === subcategory._id && product.isPublished)
    : [];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold uppercase">
        {params.category} / {params.subcategory}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
