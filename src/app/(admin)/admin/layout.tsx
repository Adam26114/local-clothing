import { redirect } from 'next/navigation';

import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { getSession } from '@/lib/auth/session';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect('/auth/login?next=/admin');
  }

  if (session.role !== 'admin') {
    redirect('/account');
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-black">
      <div className="grid min-h-screen lg:grid-cols-[256px_1fr]">
        <AdminSidebar />
        <div className="flex min-h-screen flex-col">
          <AdminHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
