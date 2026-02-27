'use client';

import { ProductCard } from '@/components/store/product-card';
import { categories, products } from '@/lib/mock-data';

export function SubCategoryPageClient({
  category,
  subcategory,
}: {
  category: string;
  subcategory: string;
}) {
  const parent = categories.find((item) => item.slug === category && !item.parentId);
  const subcategoryEntity = categories.find(
    (item) => item.slug === subcategory && item.parentId === parent?._id
  );

  const filtered = subcategoryEntity
    ? products.filter(
        (product) => product.categoryId === subcategoryEntity._id && product.isPublished
      )
    : [];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold uppercase">
        {category} / {subcategory}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
