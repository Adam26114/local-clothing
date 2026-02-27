import Link from 'next/link';

import { registerAction } from '@/app/(store)/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md rounded border p-6">
      <h1 className="mb-1 text-2xl font-semibold">Create Account</h1>
      <p className="mb-6 text-sm text-zinc-600">Email + password registration.</p>
      <form className="space-y-4" action={registerAction}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-black text-white hover:bg-zinc-800">
          Register
        </Button>
      </form>
      <p className="mt-4 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
