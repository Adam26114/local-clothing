import { formatMmk } from '@/lib/currency';
import { orders, products, users } from '@/lib/mock-data';

function sumRevenue() {
  return orders
    .filter((order) => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0);
}

export function DashboardKpis() {
  const revenue = sumRevenue();
  const pendingOrders = orders.filter((order) => order.status === 'pending').length;
  const activeProducts = products.filter((product) => product.isPublished).length;
  const activeAccounts = users.filter((user) => user.isActive).length;

  const cards = [
    {
      title: 'Total Revenue',
      value: formatMmk(revenue),
      helper: 'Trending up this month',
    },
    {
      title: 'Pending Orders',
      value: String(pendingOrders),
      helper: 'Needs admin action',
    },
    {
      title: 'Active Products',
      value: String(activeProducts),
      helper: 'Published in catalog',
    },
    {
      title: 'Active Accounts',
      value: String(activeAccounts),
      helper: 'Retention tracking',
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.title} className="rounded-lg border bg-white p-4">
          <p className="text-xs tracking-[0.1em] text-zinc-500 uppercase">{card.title}</p>
          <p className="mt-2 text-2xl font-semibold">{card.value}</p>
          <p className="mt-2 text-sm text-zinc-500">{card.helper}</p>
        </article>
      ))}
    </section>
  );
}
