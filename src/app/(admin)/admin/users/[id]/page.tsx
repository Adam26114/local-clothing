import { notFound } from 'next/navigation';

import { formatMmk } from '@/lib/currency';
import { orders, users } from '@/lib/mock-data';

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = users.find((item) => item._id === id);
  if (!user) {
    notFound();
  }

  const orderHistory = orders.filter((order) => order.customerInfo.email === user.email);
  const totalSpend = orderHistory.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-4 rounded border bg-white p-6">
      <h1 className="text-2xl font-semibold">{user.name}</h1>
      <p className="text-sm text-zinc-600">{user.email}</p>
      <p className="text-sm text-zinc-600">Role: {user.role}</p>
      <p className="text-sm text-zinc-600">Total Spend: {formatMmk(totalSpend)}</p>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Order History</h2>
        {orderHistory.length === 0 ? (
          <p className="text-sm text-zinc-600">No orders.</p>
        ) : (
          orderHistory.map((order) => (
            <div key={order._id} className="rounded border p-3 text-sm">
              <p>{order.orderNumber}</p>
              <p className="text-zinc-600">{order.status}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
