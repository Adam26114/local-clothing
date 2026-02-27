import Link from 'next/link';

import { loginAction } from '@/app/(store)/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  return (
    <div className="mx-auto max-w-md rounded border p-6">
      <h1 className="mb-1 text-2xl font-semibold">Sign In</h1>
      <p className="mb-6 text-sm text-zinc-600">Use email/password. Superadmin is env-based.</p>
      {searchParams?.error ? (
        <p className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
          Please fill in all required fields.
        </p>
      ) : null}
      <form className="space-y-4" action={loginAction}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-black text-white hover:bg-zinc-800">
          Sign In
        </Button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <Link href="/auth/forgot-password" className="text-zinc-600 hover:text-black">
          Forgot password?
        </Link>
        <Link href="/auth/register" className="text-zinc-600 hover:text-black">
          Create account
        </Link>
      </div>
    </div>
  );
}
