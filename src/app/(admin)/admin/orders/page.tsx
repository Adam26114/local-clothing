import { OrdersTable } from '@/components/admin/orders-table';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <OrdersTable />
    </div>
  );
}
