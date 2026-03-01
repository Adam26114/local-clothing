import { DashboardKpis } from '@/components/admin/dashboard-kpis';
import { OrdersTable } from '@/components/admin/orders-table';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardKpis />
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <OrdersTable />
      </section>
    </div>
  );
}
