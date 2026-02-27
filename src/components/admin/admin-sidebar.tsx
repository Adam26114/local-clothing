'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, PackageSearch, Settings, ShoppingBag, Users } from 'lucide-react';

import { cn } from '@/lib/utils';

const items = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/inventory', label: 'Inventory', icon: PackageSearch },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-white lg:block">
      <div className="border-b px-6 py-5">
        <p className="text-xs tracking-[0.16em] text-zinc-500">KHIT ADMIN</p>
        <h2 className="text-xl font-semibold">Control Panel</h2>
      </div>
      <nav className="space-y-1 p-3">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition',
                active ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
