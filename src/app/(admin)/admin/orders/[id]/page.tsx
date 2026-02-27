import { OrderDetailPageClient } from '@/components/admin/pages/order-detail-page-client';

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetailPageClient id={id} />;
}
