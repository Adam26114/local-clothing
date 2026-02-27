import { CategoryPageClient } from '@/components/store/pages/category-page-client';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <CategoryPageClient category={category} />;
}
