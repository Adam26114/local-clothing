import { ProductDetailPageClient } from '@/components/store/pages/product-detail-page-client';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailPageClient slug={slug} />;
}
