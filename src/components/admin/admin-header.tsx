import { logoutAction } from '@/app/(store)/auth/actions';
import { getSession } from '@/lib/auth/session';

export async function AdminHeader() {
  const session = await getSession();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <div>
        <p className="text-xs tracking-[0.14em] text-zinc-500">MYANMAR E-COMMERCE</p>
        <h1 className="text-lg font-semibold">Khit Admin</h1>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="rounded bg-zinc-100 px-3 py-1">{session.email ?? 'admin@khit.mm'}</span>
        <form action={logoutAction}>
          <button type="submit" className="text-zinc-600 hover:text-black">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
