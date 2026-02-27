import { SubCategoryPageClient } from '@/components/store/pages/subcategory-page-client';

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;
  return <SubCategoryPageClient category={category} subcategory={subcategory} />;
}
